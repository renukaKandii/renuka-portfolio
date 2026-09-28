/**
 * Ask Kandi — answer engine.
 *
 * Architecture (upgrade path):
 *   AskBackend          — interface every answer source implements.
 *   LocalKnowledgeBackend (this file)
 *                       — ships today. Pure client-side matching over the
 *                         curated knowledge base in src/data/portfolio.ts.
 *                         Zero cost, zero keys, works fully offline after
 *                         the page loads. It is HONEST: it never claims to
 *                         be a live LLM.
 *   LlmBackend (backends/llmBackend.ts — documented stub)
 *                       — future: a serverless /api/ask route that does
 *                         retrieval over the same knowledge base and calls
 *                         an LLM with the API key kept server-side, plus
 *                         rate limiting. Swap the backend in one line in
 *                         src/components/AskRenuka.tsx.
 *
 * The matcher: normalize the question, score each knowledge entry by
 * trigger-phrase hits (longer phrases weigh more), pick the winner above
 * a threshold, otherwise return the honest fallback.
 */

import {
  askFallbackAnswer,
  askRenukaKnowledge,
  type KnowledgeEntry,
} from '../data/portfolio';

export interface AskReference {
  label: string;
  /** Section anchor ("#projects") or project anchor ("#project-promptly") */
  target: string;
}

export interface AskAnswer {
  entryId: string | null;
  /** Plain-text answer, safe to render */
  text: string;
  references: AskReference[];
  /** true when this came from a live LLM instead of the local KB */
  fromLlm: boolean;
}

export interface AskBackend {
  readonly name: string;
  /** Short honest label for the UI, e.g. "verified portfolio answers" */
  readonly label: string;
  answer(question: string): Promise<AskAnswer>;
}

/* ── Local knowledge backend (ships today) ─────────────────────────────── */

function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[^a-z0-9\s']/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Short triggers (hi, hey, rag) must match whole words, not substrings. */
function triggerHit(question: string, trigger: string): boolean {
  if (trigger.length <= 3) {
    const escaped = trigger.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`\\b${escaped}\\b`).test(question);
  }
  return question.includes(trigger);
}

/** Score = sum over matched triggers, weighted by phrase length. */
function scoreEntry(question: string, entry: KnowledgeEntry): number {
  let score = 0;
  for (const raw of entry.triggers) {
    const trigger = normalize(raw);
    if (!trigger) continue;
    if (triggerHit(question, trigger)) {
      // Longer, more specific phrases count more than single words.
      score += 1 + trigger.split(' ').length * 2;
    }
  }
  return score;
}

export class LocalKnowledgeBackend implements AskBackend {
  readonly name = 'local';
  readonly label = 'Answers from the approved portfolio';

  async answer(question: string): Promise<AskAnswer> {
    const q = normalize(question);
    if (!q) {
      return { entryId: null, text: askFallbackAnswer, references: [], fromLlm: false };
    }

    let best: KnowledgeEntry | null = null;
    let bestScore = 0;
    for (const entry of askRenukaKnowledge) {
      const s = scoreEntry(q, entry);
      if (s > bestScore) {
        bestScore = s;
        best = entry;
      }
    }

    // Threshold: a single short-word hit isn't enough to claim an answer.
    if (!best || bestScore < 3) {
      return {
        entryId: null,
        text: askFallbackAnswer,
        references: [{ label: 'Contact Renuka', target: '#contact' }],
        fromLlm: false,
      };
    }

    return {
      entryId: best.id,
      text: best.answer,
      references: best.references,
      fromLlm: false,
    };
  }
}

/* ── Future LLM backend (documented adapter, not wired up) ───────────────
 *
 * To upgrade Ask Kandi to a real retrieval LLM later:
 *
 *  1. Create api/ask.ts (Vercel serverless function). It must:
 *     - Read the question from the POST body.
 *     - Retrieve the top-k entries from askRenukaKnowledge (same scoring
 *       as above, or embeddings) and inject them as the ONLY context.
 *     - Call your LLM provider with the key from process.env.LLM_API_KEY
 *       (never expose the key to the browser).
 *     - System prompt: "Answer only from the provided portfolio context.
 *       If the answer is not in the context, say so honestly. Never invent
 *       metrics, links, certifications, or experience."
 *     - Rate limit: e.g. 10 requests / minute / IP (Vercel KV or
 *       in-memory + Upstash). Return 429 when exceeded.
 *  2. Implement LlmBackend below (sketch):
 *
 *     export class LlmBackend implements AskBackend {
 *       readonly name = 'llm';
 *       readonly label = 'AI answers grounded in the approved portfolio';
 *       async answer(question: string): Promise<AskAnswer> {
 *         const res = await fetch('/api/ask', {
 *           method: 'POST',
 *           headers: { 'Content-Type': 'application/json' },
 *           body: JSON.stringify({ question }),
 *         });
 *         if (res.status === 429) throw new Error('rate-limited');
 *         if (!res.ok) throw new Error('ask-failed');
 *         const data = await res.json();
 *         return { entryId: data.entryId ?? null, text: data.text,
 *                  references: data.references ?? [], fromLlm: true };
 *       }
 *     }
 *
 *  3. In src/components/AskRenuka.tsx, replace
 *       const backend = new LocalKnowledgeBackend();
 *     with a LlmBackend (with try/catch falling back to local on failure).
 *  4. Document LLM_API_KEY in README (already stubbed) and set it in the
 *     Vercel dashboard — never commit it.
 *
 * The UI already renders `fromLlm` honestly and never claims the local
 * backend is a live model.
 */
