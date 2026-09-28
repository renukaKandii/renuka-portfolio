import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import {
  LocalKnowledgeBackend,
  type AskAnswer,
  type AskReference,
} from '../lib/askRenuka';
import { PROJECT_SELECT_EVENT } from './Projects';
import { useReveal } from '../hooks/useReveal';

/**
 * Ask Kandi — signature assistant.
 *
 * Architecture: LocalKnowledgeBackend (client-side matcher over the curated
 * knowledge base) ships today — zero cost, zero keys, works offline after
 * load, and never claims to be a live model. A server-side LLM/RAG backend
 * can replace it later (see src/lib/askRenuka.ts) without touching this UI:
 * keep the same { text, references, fromLlm } contract.
 */

const backend = new LocalKnowledgeBackend();

/** Suggestion chips anywhere dispatch this; the provider asks it. */
export const ASK_PRESET_EVENT = 'ask-renuka:preset';
/** Project cards dispatch this to open the assistant instead. */
export const ASK_OPEN_EVENT = 'ask-renuka:open';
/** Carries drawer starter questions: string[] to override, null to reset. */
export const ASK_STARTERS_EVENT = 'ask-kandi:starters';

/** Default drawer starters: one per core topic. */
export const DEFAULT_DRAWER_STARTERS = [
  'What did you build at Microsoft?',
  'Tell me about your agentic AI experience',
  'What is your experience with AI evaluation?',
  'Show me your projects',
  'Do you require sponsorship?',
  'How can we connect?',
];

interface ChatMessage {
  id: number;
  role: 'user' | 'assistant';
  text: string;
  references: AskReference[];
  fromLlm: boolean;
  streaming?: boolean;
}

let msgId = 0;
const nextId = () => ++msgId;

/** Concise welcome — the only message present before a conversation starts. */
const WELCOME: ChatMessage = {
  id: nextId(),
  role: 'assistant',
  text: 'Hey there! 👋 I\u2019m virtual Kandi. Want to know more about me? Ask away — projects, experience, or anything I\u2019ve built!',
  references: [],
  fromLlm: false,
};

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/** Scroll a reference target into view or open it. Project anchors select the carousel item first. */
export function goToReference(target: string) {
  if (/^https?:\/\//.test(target)) {
    window.open(target, '_blank', 'noopener,noreferrer');
    return;
  }
  if (target.startsWith('#project-')) {
    window.dispatchEvent(
      new CustomEvent<string>(PROJECT_SELECT_EVENT, { detail: target.replace(/^#/, '') }),
    );
    window.setTimeout(() => {
      document
        .querySelector('#projects')
        ?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
    }, 80);
    return;
  }
  const el = document.querySelector(target);
  if (el) {
    el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
  }
}

/* ── Shared conversation state (persists while navigating) ─────────────── */

interface AskContextValue {
  messages: ChatMessage[];
  busy: boolean;
  ask: (question: string) => void;
  /** Starter questions for the floating drawer (project context overrides). */
  drawerStarters: string[];
}

const AskContext = createContext<AskContextValue | null>(null);

export function useAsk(): AskContextValue {
  const ctx = useContext(AskContext);
  if (!ctx) throw new Error('useAsk must be used inside <AskProvider>');
  return ctx;
}

export function AskProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [busy, setBusy] = useState(false);
  const [drawerStarters, setDrawerStarters] = useState<string[]>(DEFAULT_DRAWER_STARTERS);
  const busyRef = useRef(false);
  busyRef.current = busy;
  const streamTimer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (streamTimer.current) window.clearInterval(streamTimer.current);
    },
    [],
  );

  const typeOut = useCallback((full: string, answer: AskAnswer) => {
    const id = nextId();
    if (prefersReducedMotion()) {
      setMessages((m) => [
        ...m,
        { id, role: 'assistant', text: full, references: answer.references, fromLlm: answer.fromLlm },
      ]);
      setBusy(false);
      return;
    }
    const step = Math.max(1, Math.ceil(full.length / 90));
    let shown = 0;
    setMessages((m) => [
      ...m,
      { id, role: 'assistant', text: '', references: [], fromLlm: answer.fromLlm, streaming: true },
    ]);
    streamTimer.current = window.setInterval(() => {
      shown += step;
      const done = shown >= full.length;
      const text = full.slice(0, shown);
      setMessages((m) =>
        m.map((msg) =>
          msg.id === id
            ? { ...msg, text, streaming: !done, references: done ? answer.references : [] }
            : msg,
        ),
      );
      if (done) {
        if (streamTimer.current) window.clearInterval(streamTimer.current);
        setBusy(false);
      }
    }, 18);
  }, []);

  const ask = useCallback(
    (question: string) => {
      const q = question.trim();
      if (!q || busyRef.current) return;
      setBusy(true);
      setMessages((m) => [
        ...m,
        { id: nextId(), role: 'user', text: q, references: [], fromLlm: false },
      ]);
      backend
        .answer(q)
        .then((answer) => typeOut(answer.text, answer))
        .catch(() => {
          setBusy(false);
          setMessages((m) => [
            ...m,
            {
              id: nextId(),
              role: 'assistant',
              text: 'Something glitched on my end — try one of the suggested questions, or reach me through the contact section.',
              references: [{ label: 'Contact', target: '#contact' }],
              fromLlm: false,
            },
          ]);
        });
    },
    [typeOut],
  );

  useEffect(() => {
    const onPreset = (e: Event) => {
      const q = (e as CustomEvent<string>).detail;
      if (typeof q === 'string') ask(q);
    };
    const onStarters = (e: Event) => {
      const list = (e as CustomEvent<string[] | null>).detail;
      setDrawerStarters(Array.isArray(list) && list.length > 0 ? list : DEFAULT_DRAWER_STARTERS);
    };
    window.addEventListener(ASK_PRESET_EVENT, onPreset);
    window.addEventListener(ASK_STARTERS_EVENT, onStarters);
    return () => {
      window.removeEventListener(ASK_PRESET_EVENT, onPreset);
      window.removeEventListener(ASK_STARTERS_EVENT, onStarters);
    };
  }, [ask]);

  return <AskContext.Provider value={{ messages, busy, ask, drawerStarters }}>{children}</AskContext.Provider>;
}

/** Ask from anywhere (project cards, hero chips): opens the panel + asks. */
export function askQuestionEverywhere(question: string | null, starters?: string[]) {
  window.dispatchEvent(new CustomEvent(ASK_OPEN_EVENT));
  if (starters) {
    window.dispatchEvent(new CustomEvent<string[]>(ASK_STARTERS_EVENT, { detail: starters }));
  }
  if (question) {
    window.setTimeout(() => {
      window.dispatchEvent(new CustomEvent<string>(ASK_PRESET_EVENT, { detail: question }));
    }, 60);
  }
}

/* ── Chat console (shared history) ─────────────────────────────────────── */

interface ConsoleProps {
  onNavigate?: () => void;
  autoFocus?: boolean;
  idPrefix: string;
  /** Starter questions render only in the floating drawer, before the first message. */
  showStarters?: boolean;
}

function ChatConsole({ onNavigate, autoFocus, idPrefix, showStarters }: ConsoleProps) {
  const { messages, busy, ask, drawerStarters } = useAsk();
  const [input, setInput] = useState('');
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  useEffect(() => {
    const body = bodyRef.current;
    if (body) body.scrollTop = body.scrollHeight;
  }, [messages]);

  const handleReference = (target: string) => {
    onNavigate?.();
    window.setTimeout(() => goToReference(target), 60);
  };

  const inputId = `${idPrefix}-ask-input`;

  return (
    <div className="console" role="log" aria-label="Ask Kandi conversation" aria-live="polite">
      <div className="console-head">
        <span className="avatar" aria-hidden="true">
          K
        </span>
        <span>Ask Kandi</span>
        <span className="console-sub">Portfolio assistant</span>
      </div>

      <div className="console-body" ref={bodyRef}>
        {messages.map((msg) => (
          <div key={msg.id} className={`msg ${msg.role}`}>
            <span>
              {msg.text}
              {msg.streaming && <span className="typing-caret" aria-hidden="true" />}
            </span>
            {msg.role === 'assistant' && !msg.streaming && msg.references.length > 0 && (
              <span className="refs">
                {msg.references.map((r) => (
                  <button
                    key={r.target + r.label}
                    type="button"
                    onClick={() => handleReference(r.target)}
                  >
                    {r.label} →
                  </button>
                ))}
              </span>
            )}
          </div>
        ))}
      </div>

      {showStarters && messages.length <= 1 && (
        <div className="console-starters" aria-label="Starter questions">
          {drawerStarters.map((q) => (
            <button key={q} type="button" onClick={() => ask(q)} disabled={busy}>
              {q}
            </button>
          ))}
        </div>
      )}

      <form
        className="console-form"
        onSubmit={(e) => {
          e.preventDefault();
          ask(input);
          setInput('');
        }}
      >
        <label htmlFor={inputId} style={{ position: 'absolute', left: -9999 }}>
          Ask Kandi a question
        </label>
        <input
          id={inputId}
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. What did you build at Microsoft?"
          autoComplete="off"
          disabled={busy}
        />
        <button type="submit" disabled={busy || !input.trim()}>
          Ask
        </button>
      </form>
    </div>
  );
}

/** Suggested questions beside the section chat — each asks the shared assistant. */
const SECTION_SUGGESTIONS = [
  'What did you build at Microsoft?',
  'Tell me about your agentic AI experience',
  'What projects have you worked on?',
  "What's your experience with AI evaluation?",
  'What technologies do you work with?',
  'How can we connect?',
];

/** Inline section version: suggestions left, working chat right. Shared history. */
export default function AskRenuka() {
  const ref = useReveal();
  const { ask } = useAsk();

  return (
    <section className="block ask-section" id="ask-renuka" aria-label="Ask Kandi">
      <div className="wrap">
        <div ref={ref} className="reveal">
          <p className="dossier-label">Dossier 06 · Ask Kandi</p>
        </div>

        <div className="ask-grid">
          <div className="ask-copy reveal" ref={useReveal<HTMLDivElement>()}>
            <h2 className="section-title">Have a question? Ask Kandi.</h2>
            <p className="section-lede">
              Explore the projects, experience and engineering decisions behind the work.
            </p>
            <div className="ask-suggest" aria-label="Suggested questions">
              {SECTION_SUGGESTIONS.map((q) => (
                <button key={q} type="button" onClick={() => ask(q)}>
                  {q}
                </button>
              ))}
            </div>
          </div>
          <div className="reveal" ref={useReveal<HTMLDivElement>()}>
            <ChatConsole idPrefix="section" />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Floating launcher, visible on every section. */
export function AskLauncher({ onOpen }: { onOpen: () => void }) {
  return (
    <button type="button" className="ask-launcher" onClick={onOpen} aria-label="Open Ask Kandi">
      <span className="avatar" aria-hidden="true">
        K
      </span>
      Ask Kandi
    </button>
  );
}

/** Compact chat drawer, opened from the floating launcher. Shares history with the section. */
export function AskRenukaOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="ask-overlay"
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Ask Kandi"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div className="ask-drawer">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Ask Kandi"
          className="ask-drawer-close"
        >
          ✕ Close
        </button>
        <ChatConsole onNavigate={onClose} autoFocus idPrefix="overlay" showStarters />
      </div>
    </div>
  );
}