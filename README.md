# THE INTELLIGENCE LAB — Renuka Kandi's Portfolio

An interactive AI engineering laboratory: experiment-dossier projects, field-note
experience, a skills apparatus, the **Ask Kandi**
assistant (answering in first person from a curated knowledge base), scheduling,
and contact.

**You own this completely.** Standard Vite + React + TypeScript, no proprietary
services, no lock-in. Clone it, run it, edit it, deploy it anywhere.

---

## 1. Local setup

Prerequisites: **Node.js 18+** and npm.

```bash
git clone <your-repo-url>
cd portfolio
npm install
npm run dev      # local dev server with hot reload
```

Other scripts:

```bash
npm run build    # typecheck + production build → dist/
npm run preview  # serve the production build locally
npm run typecheck
```

## 2. Editing your content — the data file

**Everything on the site lives in one file: `src/data/portfolio.ts`.**
Profile, experience, projects (with diagrams), skills, certifications, education,
scheduling config, and the Ask Kandi knowledge base are all here.

- **Update text** → edit the file, save, redeploy. No code changes needed.
- **Add a project** → append to the `projects` array (copy an existing entry's
  shape: `hypothesis` / `method` / `result`, `tags`, `tech`, `links`, optional
  `diagram` and `statusNote`).
- **Teach Ask Kandi something new** → add a `KnowledgeEntry` to
  `askRenukaKnowledge`: `triggers` (phrases that match), `label`, `answer`
  (**write it in first person, as you**), and `references` (section anchors like
  `"#projects"` / `"#project-promptly"`, or verified URLs).
- **Fill in placeholder links** → search the file for `TODO` / `coming soon`:
  Devil's Advocate repo + demo URLs, promptLY's Chrome Web Store listing,
  ModelTrove's repo link, and the n8n workflow link.

⚠ Honesty rule: Ask Kandi answers **only** from this file. If a fact isn't
here, it says so — never improvise.

## 3. Running in Cursor or VS Code

1. Open the project folder in Cursor / VS Code.
2. Install the recommended extensions when prompted (ESLint / Prettier configs
   are standard; the project has no exotic setup).
3. Run `npm install`, then `npm run dev` in the integrated terminal.
4. Edit `src/data/portfolio.ts` for content; components live in
   `src/components/`, styles in `src/styles/global.css` (design tokens in
   `:root`).

## 4. GitHub repository setup

```bash
cd portfolio
git init
git add .
git commit -m "Initial portfolio"
gh repo create renuka-portfolio --public --source=. --push
# …or create the repo on github.com and:
git remote add origin https://github.com/<you>/renuka-portfolio.git
git branch -M main
git push -u origin main
```

`node_modules/` and `dist/` are git-ignored.

## 5. Deploying to Vercel

**Option A — via the dashboard (easiest):**

1. Go to [vercel.com/new](https://vercel.com/new) and import your GitHub repo.
2. Vercel auto-detects **Vite** — leave build command `npm run build` and output
   directory `dist/` as-is.
3. Click **Deploy**. Every push to `main` redeploys automatically.

**Option B — via CLI:**

```bash
npm i -g vercel
vercel          # link + preview deploy
vercel --prod   # production deploy
```

## 6. Connecting a custom domain

1. In the Vercel dashboard: **Project → Settings → Domains → Add**.
2. Enter your domain (e.g. `renukakandi.dev`) and follow the DNS instructions
   Vercel shows (an `A` record or `CNAME`, depending on apex vs subdomain).
3. Wait for DNS to propagate; Vercel provisions HTTPS automatically.

## 7. Connecting booking links (Schedule a Call)

The scheduling section currently shows a polished **placeholder** — no fake
availability. To go live with separate 15-min and 30-min Calendly events:

1. Create two [Calendly](https://calendly.com) events (15-min intro + 30-min
   technical) and copy each public booking URL.
2. In `src/data/portfolio.ts`, set:
   ```ts
   export const scheduling = {
     provider: 'calendly',
     url: 'https://calendly.com/your-handle',
     introUrl: 'https://calendly.com/your-handle/intro-15min',
     technicalUrl: 'https://calendly.com/your-handle/technical-30min',
   };
   ```
3. Redeploy. Each meeting-type card becomes a live booking button that opens
   its real scheduling page (styled to match the site). Availability, timezone
   conversion, confirmations, and meeting links are handled by the provider —
   this site never sees your private calendar.

## 8. Environment variables (optional future AI backend)

Ask Kandi currently runs on a **local knowledge backend**: client-side matching
over the curated knowledge base. Zero cost, zero keys, works offline, and the UI
labels it honestly — it never claims to be a live LLM.

To upgrade later to a server-side LLM/RAG assistant (documented adapter in
`src/lib/askRenuka.ts`):

1. Create a Vercel serverless function at `api/ask.ts` that retrieves from the
   knowledge base, calls your LLM provider, and rate-limits (10 req/min/IP).
2. **Never put the API key in the browser.** Set it in
   **Vercel → Project → Settings → Environment Variables**:
   ```
   LLM_API_KEY=sk-...   # server only — never commit this
   ```
3. Swap `new LocalKnowledgeBackend()` for the `LlmBackend` adapter in
   `src/components/AskRenuka.tsx` (one line; falls back to local on failure).
4. Redeploy.

## 9. Project structure

```
portfolio/
├── index.html                  # title, meta, fonts, SEO tags
├── public/
│   ├── favicon.svg
│   └── NagaRenuka_Kandi_Resume.pdf   # downloadable résumé
├── src/
│   ├── main.tsx                # React entry
│   ├── App.tsx                 # section composition
│   ├── data/portfolio.ts       # ← ALL editable content lives here
│   ├── lib/askRenuka.ts        # Ask Kandi engine + LLM upgrade stub
│   ├── hooks/useReveal.ts      # scroll-reveal helper
│   ├── styles/global.css       # design tokens + all styles
│   └── components/             # Nav, Hero, Experience, Projects,
│                               # Skills, Credentials,
│                               # AskRenuka, ScheduleCall, Contact, Footer
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## 10. Accessibility & performance notes

- Semantic landmarks, skip link, focus-visible styles, keyboard-operable
  dialogs/filters, `prefers-reduced-motion` support, alt/aria labeling.
- No heavy dependencies (React + Vite only); fonts via Google Fonts with
  `display=swap`; images are SVG.

---

Built as an exportable, owner-operated site. If you can run
`npm install && npm run dev`, you can run this — no Muse required.
