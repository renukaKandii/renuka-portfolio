/**
 * ─────────────────────────────────────────────────────────────────────────
 *  PORTFOLIO DATA — the single editable source of truth for this site.
 *
 *  Everything on the page renders from this file: profile, experience,
 *  projects, skills, certifications, education, contact links,
 *  scheduling config, and the Ask Kandi knowledge base.
 *
 *  To update the site, edit this file and redeploy. No code changes needed
 *  for content updates.
 *
 *  ⚠  HONESTY RULE: only list things you can verify. Ask Kandi answers
 *     ONLY from the `askRenukaKnowledge` base below, in first person as
 *     Renuka. If a fact isn't here, the assistant says so honestly.
 * ─────────────────────────────────────────────────────────────────────────
 */

/* ── Types ─────────────────────────────────────────────────────────────── */

export interface SocialLink {
  label: string;
  url: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  /** Short field-note framing used by the timeline UI */
  fieldNote: string;
  highlights: string[];
  tags: string[];
  /** Optional sanitized story from the role (no proprietary details) */
  anecdote?: { title: string; body: string };
}

export interface DiagramNode {
  id: string;
  label: string;
  detail?: string;
}

export interface DiagramEdge {
  from: string;
  to: string;
  label?: string;
}

export interface DiagramSpec {
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  caption?: string;
}

export interface Project {
  id: string;
  title: string;
  /** Short category line shown under the title */
  category: string;
  /** One-sentence engineering headline */
  headline: string;
  /** Concise first-person explanation of what I built and why */
  description: string;
  /** Three or four meaningful technical contributions (first person) */
  contributions: string[];
  /** Concise description of the actual outcome, honestly labeled */
  outcome: string;
  /** 'complete' = built & tested · 'in-progress' = currently being built */
  status: 'complete' | 'in-progress';
  /** Human status badge: Published · Working experiment · Paused demo · In progress · Internal work */
  statusDisplay: string;
  /** Explains what "in progress" means right now */
  statusNote?: string;
  tags: ProjectTag[];
  tech: string[];
  links: SocialLink[];
  /** Shown when links are intentionally absent, e.g. "links coming soon" */
  linksNote?: string;
  /** Honest note about a link's live status (e.g. a paused demo). Rendered under the links. */
  demoNote?: string;
  /** Interactive architecture / workflow diagram */
  diagram?: DiagramSpec;
  /** Suggested "Ask me about this project" questions */
  askQuestions: string[];
}

export type ProjectTag = 'Agentic AI' | 'AI Evaluation' | 'Backend' | 'LLM Systems' | 'Tooling';

export interface SkillGroup {
  name: string;
  blurb: string;
  items: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  /** Date the credential was issued, as shown by the issuer */
  issued?: string;
  /** Expiry date, if the issuer sets one */
  expires?: string;
  /** Public verification URL (Credly, DeepLearning.AI, etc.) */
  url?: string;
}

export interface EducationEntry {
  school: string;
  degree: string;
  period: string;
  detail: string;
}

export interface KnowledgeEntry {
  id: string;
  /** Questions/phrases that should match this entry */
  triggers: string[];
  /** Short label shown on the suggestion chip */
  label: string;
  /** Concise, conversational answer IN FIRST PERSON as Renuka. Plain text. */
  answer: string;
  /** Clickable references: { label, target } — target is a section anchor
   *  like "#projects" / "#project-promptly", or a verified external URL. */
  references: { label: string; target: string }[];
}

export interface SchedulingConfig {
  /** 'calendly' | 'google' | null — leave null until a real link exists */
  provider: 'calendly' | 'google' | null;
  /** Fallback booking URL used when a per-meeting URL is empty. */
  url: string;
  /** TODO: paste your real 15-min Calendly link here once you have it. */
  introUrl: string;
  /** Per-meeting booking URL for the Technical / project discussion card. */
  technicalUrl: string;
}

/* ── Profile ───────────────────────────────────────────────────────────── */

export const profile = {
  name: 'Naga Renuka Kandi',
  firstName: 'Renuka',
  title: 'AI Engineer · Agentic AI · LLM Evaluation · Software Engineer',
  email: 'nagarenukakandi@gmail.com',
  linkedin: 'https://www.linkedin.com/in/naga-renuka-kandi',
  github: 'https://github.com/renukaKandii/',
  resumeFile: '/NagaRenuka_Kandi_Resume.pdf',
  summary:
    'Software and AI engineer working across agentic workflows, LLM evaluation, backend development and cloud reliability. Experience spanning Microsoft, Handshake AI, JPMorgan Chase and LinkedIn.',
  /** The hero line */
  thesis: 'Building intelligent systems. Engineering them for reliability.',
};

/* ── Experience — told as field notes ──────────────────────────────────── */

export const experience: ExperienceEntry[] = [
  {
    id: 'handshake-current',
    company: 'Handshake AI',
    role: 'AI Evaluation Engineer — Independent Contract',
    period: 'Aug 2026 – Present',
    location: 'Remote · Contract',
    fieldNote:
      'My current bench work: I’m testing how clearly coding assistants communicate — not just whether their code runs.',
    highlights: [
      'Evaluating the communication quality of AI coding assistants, including Codex',
      'Assessing how effectively agents communicate technical information, explain their actions, and respond to developer requests',
      'Identifying communication-quality issues and providing structured feedback using defined evaluation criteria',
    ],
    tags: ['AI Evaluation', 'LLM Systems', 'Contract'],
  },
  {
    id: 'linkedin',
    company: 'LinkedIn',
    role: 'AI Trainer & Evaluation Engineer',
    period: 'Jun 2026 – Present',
    location: 'Remote · Freelancing',
    fieldNote:
      'Lab work: grading AI coding agents the way production systems deserve — methodically, adversarially, and with a rubric.',
    highlights: [
      'Evaluating AI coding-agent responses to real developer tasks',
      'Applying structured evaluation rubrics covering response correctness, readability, actionability, and adherence to user requests',
      'Reviewing other evaluators’ annotations for rubric consistency and reasoning quality',
      'Hunting failure patterns and edge cases across prompts, tasks, and scenarios',
    ],
    tags: ['AI Evaluation', 'LLM Systems', 'Rubric Design'],
  },
  {
    id: 'microsoft',
    company: 'Microsoft',
    role: 'Software Engineer, AI & Platform Reliability',
    period: 'Dec 2025 – Jun 2026',
    location: 'United States',
    fieldNote:
      'Platform reliability inside the Azure ecosystem: a Python-based agentic diagnostic workflow supporting OneLake/Fabric root-cause investigation.',
    highlights: [
      'Built and tested a Python-based agentic diagnostic workflow connecting incident information, KQL telemetry, and diagnostic tools to support root-cause investigation across Azure OneLake/Fabric',
      'Replaced a repetitive manual reliability process — weekly dashboard reviews, telemetry queries, incident correlation, and written investigation summaries (about eight hours) — with a structured assisted workflow',
      'Implemented diagnostic skill design, tool selection, multi-step execution, and structured data processing across Kusto and Snowflake sources',
      'Validated workflow outputs against actual platform behavior and known incidents; produced AI-assisted root-cause drafts and reliability summaries for engineer review',
      'Contributed to backend services, engineering automation, and reliability dashboards',
    ],
    tags: ['Agentic AI', 'Azure', 'Python', 'Telemetry'],
  },
  {
    id: 'handshake',
    company: 'Handshake AI',
    role: 'Software Engineer, AI Evaluation & Automation',
    period: 'May 2025 – Dec 2025',
    location: 'United States',
    fieldNote:
      'Where my evaluation obsession started: I graded AI-written code at scale, against ground truth, across 100+ production codebases.',
    highlights: [
      'Evaluated LLM-generated responses and AI coding outputs across 100+ production codebases and 50+ open-source repositories',
      'Compared 5+ LLMs against a six-dimension rubric: instruction following, truthfulness, verbosity, writing quality, correctness, and overall quality',
      'Assessed correctness, completeness, and edge-case handling against reference (golden) solutions',
      'Analyzed multi-step model and agent behavior to identify failure patterns',
      'Built Docker-based reproducible validation environments with automated fail-to-pass and regression tests',
      'Reviewed code across Python, TypeScript/JavaScript, and Java; documented evaluation outcomes and the reasoning behind failures',
    ],
    tags: ['AI Evaluation', 'Automation', 'Docker'],
  },
  {
    id: 'jpmorgan',
    company: 'JPMorgan Chase & Co.',
    role: 'Software Engineer I',
    period: 'Feb 2022 – Aug 2023',
    location: 'India',
    fieldNote:
      'The backend foundation: high-availability financial services, where a slow query is a business problem and a missed test is an incident.',
    highlights: [
      'Built Python and SQL data pipelines for React compliance dashboards serving 200+ internal stakeholders — 30% query speedup via indexing and data-access redesign',
      'Designed C# ASP.NET REST services with optimized SQL Server data layers — 35% page-load reduction across finance operations dashboards',
      'Scaled Cypress automated test coverage from 45% to 80% — caught 30+ pre-release defects and cut post-deployment incidents by 25%',
      'Automated Jenkins CI/CD pipelines with testing gates — 20% faster release cycles',
      'Supported AWS-hosted high-availability financial services (EC2, S3), triaging API failures and validating hotfixes',
    ],
    tags: ['Backend', 'Python', 'C#', 'AWS'],
  },
];

/* ── Projects — told as experiments ────────────────────────────────────── */

export const projects: Project[] = [
  {
    id: 'agentic-reliability',
    title: 'Agentic AI for Platform Reliability',
    category: 'Agentic AI · Platform reliability',
    headline: 'From eight hours of manual investigation to a prompt-driven diagnostic workflow.',
    description:
      'A Python-based agentic diagnostic workflow connecting incident context, telemetry and diagnostic tools to support root-cause investigations across Azure OneLake and Fabric.',
    contributions: [
      'Connected incident information and telemetry tools through diagnostic skills.',
      'Worked on multi-step execution, tool selection and structured data processing.',
      'Integrated KQL/Kusto and Snowflake data sources.',
      'Validated diagnostic outputs against platform behavior and known incidents.',
      'Generated AI-assisted RCA drafts and reliability investigation summaries.',
    ],
    outcome:
      'A sanitized, engineer-in-the-loop workflow that makes recurring reliability investigations faster and more consistent. It supports investigation and summarizes evidence — it does not independently resolve incidents, guarantee correct root causes, or perform autonomous production remediation.',
    status: 'complete',
    statusDisplay: 'Internal work · sanitized architecture',
    tags: ['Agentic AI', 'AI Evaluation', 'Backend'],
    tech: ['Python', 'KQL', 'Kusto', 'Snowflake', 'Azure OneLake', 'Fabric', 'Azure Monitor'],
    links: [],
    linksNote: 'Internal platform work — shown here as a sanitized architecture; no public repo or confidential implementation details.',
    diagram: {
      nodes: [
        {
          id: 'request',
          label: 'Investigation request',
          detail: 'Incident context and scope — what needs investigating and why.',
        },
        {
          id: 'workflow',
          label: 'Python agentic workflow',
          detail: 'Selects diagnostic skills and tools, then runs the investigation in structured steps.',
        },
        {
          id: 'tools',
          label: 'Incident & telemetry tools',
          detail: 'KQL telemetry, Kusto and Snowflake sources, monitors, and diagnostic checks.',
        },
        {
          id: 'validation',
          label: 'Structured results + validation',
          detail: 'Processed evidence organized for review and checked against known platform behavior.',
        },
        {
          id: 'rca',
          label: 'AI-assisted RCA + reliability summary',
          detail: 'Draft findings and summary for engineer review — assistance, not autonomous remediation.',
        },
      ],
      edges: [
        { from: 'request', to: 'workflow', label: 'scope' },
        { from: 'workflow', to: 'tools', label: 'select + run' },
        { from: 'tools', to: 'validation', label: 'structure + check' },
        { from: 'validation', to: 'rca', label: 'draft for review' },
      ],
      caption:
        'Select any stage to see what it does. Engineers stay in the loop: the workflow assists investigation — it does not resolve incidents on its own.',
    },
    askQuestions: [
      'How did you connect diagnostic tools?',
      'What manual process did this replace?',
      'How did you validate diagnostic results?',
    ],
  },
  {
    id: 'devils-advocate',
    title: "Devil's Advocate Agent",
    category: 'Agentic AI · Multi-agent reasoning',
    headline: 'What if an AI challenged its own reasoning instead of simply agreeing?',
    description:
      'I built a multi-agent reasoning system in Python where four specialized agents debate a question from different perspectives.',
    contributions: [
      'Designed Researcher, Devil’s Advocate, Defense and Judge roles.',
      'Implemented iterative multi-agent reasoning loops.',
      'Ran the system on Llama 3.3 70B through Groq.',
      'Built a Gradio interface for exploring the deliberation.',
    ],
    outcome:
      'A working experiment in structured disagreement: the system examines a question from opposing sides and challenges its own reasoning. It explores multi-agent reasoning — it does not guarantee factual accuracy.',
    status: 'complete',
    statusDisplay: 'Working experiment · demo paused',
    demoNote:
      'Hosted demo paused — this was a learning experiment and the hosted inference runs on a paid API. The architecture is documented above; the code path below stays available.',
    tags: ['Agentic AI', 'LLM Systems'],
    tech: ['Python', 'Groq API', 'Llama 3.3 70B', 'Gradio'],
    links: [
      {
        label: 'Live demo — Hugging Face Space (paused)',
        url: 'https://huggingface.co/spaces/nagarenukakandi/devils-advocate',
      },
    ],
    diagram: {
      nodes: [
        { id: 'stance', label: 'Your stance', detail: 'The claim under examination — the starting point I give the system.' },
        { id: 'researcher', label: 'Researcher', detail: 'Retrieves counter-evidence so the debate starts from facts, not vibes.' },
        { id: 'advocate', label: 'Devil’s Advocate', detail: 'Attacks the stance and looks for holes in the reasoning.' },
        { id: 'defense', label: 'Defense', detail: 'Reinforces the stance with the strongest supporting reasoning.' },
        { id: 'judge', label: 'Judge', detail: 'Evaluates both sides and only rules when the reasoning holds up.' },
      ],
      edges: [
        { from: 'stance', to: 'researcher' },
        { from: 'researcher', to: 'advocate', label: 'evidence' },
        { from: 'advocate', to: 'defense', label: 'challenge' },
        { from: 'defense', to: 'judge', label: 'rebuttal' },
        { from: 'judge', to: 'researcher', label: 'iterate until convinced' },
      ],
      caption: 'Four specialized roles deliberate in a loop; the Judge only rules when the reasoning holds up.',
    },
    askQuestions: [
      'Why did you use multiple agents?',
      'How does the Judge work?',
      'What are the limitations of this approach?',
    ],
  },
  {
    id: 'research-sphere',
    title: 'Research Sphere',
    category: 'LLM systems · Cited research',
    headline: 'Research answers that arrive with their receipts.',
    description:
      'I built a Streamlit research assistant on Perplexity’s Sonar API that returns grounded answers with APA-style citations, plus a follow-up path for going deeper.',
    contributions: [
      'Built a Streamlit web app on the Sonar API for real-time, citation-backed answers.',
      'Rendered APA-style citations inline so every claim stays traceable.',
      'Added a curiosity path of follow-up questions that deepen the exploration.',
      'Kept retrieval inside Sonar rather than claiming a from-scratch RAG pipeline.',
    ],
    outcome:
      'A focused research companion I built for the Perplexity Sonar API hackathon. The hosted demo is paused because the API key expired and it’s a paid API — the code stays on GitHub.',
    status: 'complete',
    statusDisplay: 'Working experiment · demo paused',
    tags: ['LLM Systems', 'Tooling'],
    tech: ['Python', 'Streamlit', 'Perplexity Sonar API'],
    links: [{ label: 'GitHub repository', url: 'https://github.com/renukaKandii/research-sphere' }],
    demoNote:
      'The hosted demo is paused — the Sonar API key expired and it’s a paid API. The code is on GitHub.',
    diagram: {
      nodes: [
        { id: 'q', label: 'Your question', detail: 'Any research topic I want to explore.' },
        { id: 'sonar', label: 'Sonar API', detail: 'Retrieval plus generation, handled inside Sonar.' },
        { id: 'cited', label: 'Cited answer', detail: 'Grounded answer with APA-style sources inline.' },
        { id: 'follow', label: 'Curiosity path', detail: 'Follow-up questions that go deeper without losing the thread.' },
      ],
      edges: [
        { from: 'q', to: 'sonar' },
        { from: 'sonar', to: 'cited', label: 'grounded' },
        { from: 'cited', to: 'follow', label: 'go deeper' },
      ],
      caption: 'Retrieval happens inside the Sonar API; the app keeps every claim attached to a source.',
    },
    askQuestions: [
      'How does Research Sphere stay grounded?',
      'What is the curiosity path?',
      'Why is the demo paused?',
    ],
  },
  {
    id: 'promptly',
    title: 'promptLY',
    category: 'LLM systems · On-device AI',
    headline: 'A useful AI writing assistant that doesn’t need the cloud at all.',
    description:
      'I built promptLY, a privacy-first Chrome extension that runs entirely on-device with Gemini Nano — rewrite, summarize, translate, proofread, and more, with nothing leaving the machine.',
    contributions: [
      'Built a Chrome extension powered by Gemini Nano for fully on-device inference.',
      'Designed prompt flows and presets with a side-panel UI.',
      'Added context-menu integration, custom instructions, and local history.',
      'Kept everything in local storage — no servers, no subscriptions.',
    ],
    outcome:
      'A published assistant that works offline and keeps your words yours: select text, right-click, transform. It’s live on the Chrome Web Store with the repo on GitHub.',
    status: 'complete',
    statusDisplay: 'Published',
    tags: ['LLM Systems', 'Tooling'],
    tech: ['JavaScript', 'Gemini Nano', 'Chrome Extensions API'],
    links: [
      {
        label: 'Chrome Web Store',
        url: 'https://chromewebstore.google.com/detail/promptly/biijfhjfjpdjlofggklcphihafpnkojo',
      },
      { label: 'GitHub repository', url: 'https://github.com/renukaKandii/promptLY' },
    ],
    diagram: {
      nodes: [
        { id: 'select', label: 'Select text', detail: 'Right-click any text and send it to promptLY.' },
        { id: 'nano', label: 'Gemini Nano', detail: 'On-device inference inside Chrome — nothing uploaded.' },
        { id: 'out', label: 'Transformed text', detail: 'Rewrite, summarize, translate, proofread, humanize.' },
      ],
      edges: [
        { from: 'select', to: 'nano', label: 'stays on device' },
        { from: 'nano', to: 'out' },
      ],
      caption: 'No servers, no subscriptions, no data leaving your machine — the model lives in Chrome.',
    },
    askQuestions: [
      'How does promptLY keep data private?',
      'What can promptLY help me write?',
      'Where can I install promptLY?',
    ],
  },
  {
    id: 'optiprompt',
    title: 'OptiPrompt',
    category: 'LLM systems · Prompt tooling',
    headline: 'The model isn’t the problem — the way I was asking was.',
    description:
      'Built at SharkHack 2025, a 24-hour AI hackathon, after burning half the ideation phase fighting badly written prompts. It improves prompts with few-shot learning and explains each fix.',
    contributions: [
      'Built the app at SharkHack 2025 at Simmons University in 24 hours.',
      'Engineered few-shot prompt-enhancement flows on the Gemini 2.0 Flash API.',
      'Rendered side-by-side original vs optimized prompts with plain-language explanations.',
      'Designed for fewer redundant LLM calls — less compute, more sustainable AI.',
    ],
    outcome:
      'My team won Best Use of Gemini at SharkHack 2025. The demo is paused because the API key expired and it’s a paid API — the code stays on GitHub.',
    status: 'complete',
    statusDisplay: 'Working experiment · demo paused',
    demoNote:
      'Demo paused — the Gemini API key expired and it’s a paid API. The code is on GitHub.',
    tags: ['LLM Systems', 'Tooling'],
    tech: ['Python', 'Streamlit', 'Gemini 2.0 Flash API'],
    links: [
      {
        label: 'Live demo — Streamlit (paused)',
        url: 'https://projects2025-v5eecvz3nbxnmc3agtdjmb.streamlit.app',
      },
      { label: 'GitHub repository', url: 'https://github.com/renukaKandii/projects2025' },
    ],
    diagram: {
      nodes: [
        { id: 'raw', label: 'Raw prompt', detail: 'What I typed before I knew better.' },
        { id: 'enhance', label: 'Few-shot enhancement', detail: 'Gemini 2.0 Flash improves the structure.' },
        { id: 'compare', label: 'Side-by-side', detail: 'Original vs optimized, shown together.' },
        { id: 'why', label: 'Explanation', detail: 'Plain-language reasons why the new version works better.' },
      ],
      edges: [
        { from: 'raw', to: 'enhance' },
        { from: 'enhance', to: 'compare', label: 'optimized' },
        { from: 'compare', to: 'why' },
      ],
      caption:
        'The prompt is the bottleneck: structure it well, and the same model does better work with fewer calls.',
    },
    askQuestions: [
      'What does OptiPrompt improve?',
      'How did you build it at a hackathon?',
      'Why is the demo paused?',
    ],
  },
  {
    id: 'modeltrove',
    title: 'ModelTrove',
    category: 'LLM systems · Model comparison',
    headline: 'Choosing a model shouldn’t require reading forty launch blogs.',
    description:
      'An in-progress neutral, evidence-backed comparison app — capabilities, pricing, context windows, and benchmarks from primary sources, shown as tables instead of arbitrary scores.',
    contributions: [
      'Researching model capabilities, pricing, context windows, and benchmarks from primary sources.',
      'Designing neutral comparisons — evidence tables, not arbitrary match scores.',
      'Evaluating which AI API to build on: economical, but still useful in practice.',
    ],
    outcome:
      'In progress and launching soon. The current focus is picking the most economical API that stays genuinely useful — the comparison engine follows once that call is made.',
    status: 'in-progress',
    statusDisplay: 'In progress',
    tags: ['LLM Systems', 'Tooling'],
    tech: ['TypeScript', 'React', 'REST APIs'],
    links: [],
    linksNote: 'Launching soon — repository link will appear here.',
    diagram: {
      nodes: [
        { id: 'models', label: 'Models & tools', detail: 'The candidates I’m tracking.' },
        { id: 'evidence', label: 'Evidence', detail: 'Pricing, context windows, benchmarks, and docs.' },
        { id: 'compare', label: 'Neutral comparison', detail: 'Evidence tables instead of match scores.' },
      ],
      edges: [
        { from: 'models', to: 'evidence', label: 'research' },
        { from: 'evidence', to: 'compare', label: 'verify' },
      ],
      caption: 'A two-stage pipeline: discover what’s claimed, then verify it against sources.',
    },
    askQuestions: [
      'What is ModelTrove?',
      'How will it compare models?',
      'When will it launch?',
    ],
  },
  {
    id: 'n8n-automation',
    title: 'Job-Email Automation',
    category: 'Backend · Automation',
    headline: 'The most boring part of job hunting — triaging recruiter email — is automatable.',
    description:
      'An in-progress n8n workflow that classifies incoming recruiter mail with AI, extracts structured fields, validates them, and logs everything to Google Sheets for tracking.',
    contributions: [
      'Ingesting incoming mail and classifying it: recruiter outreach, interview invite, rejection, or noise.',
      'Extracting structured fields — company, role, required action — then validating before routing.',
      'Routing and logging everything to Google Sheets for a single tracking surface.',
      'Keeping it deterministic: AI only where judgment is needed, rules everywhere else.',
    ],
    outcome:
      'In progress and still being tuned. API and integration automation (not a computer-use agent): deterministic steps, AI only where judgment is needed.',
    status: 'in-progress',
    statusDisplay: 'In progress',
    tags: ['Backend', 'Tooling'],
    tech: ['n8n', 'LLM APIs', 'Google Sheets API', 'Webhooks'],
    links: [],
    linksNote: 'Workflow link will appear here once it’s finished.',
    diagram: {
      nodes: [
        { id: 'inbox', label: 'Incoming email', detail: 'Recruiter mail as it arrives.' },
        { id: 'classify', label: 'AI classification', detail: 'Outreach, invite, rejection, or noise.' },
        { id: 'extract', label: 'Extraction', detail: 'Company, role, and required action.' },
        { id: 'route', label: 'Validate & route', detail: 'Only clean rows move on.' },
        { id: 'sheets', label: 'Google Sheets', detail: 'A single tracking surface.' },
      ],
      edges: [
        { from: 'inbox', to: 'classify' },
        { from: 'classify', to: 'extract' },
        { from: 'extract', to: 'route' },
        { from: 'route', to: 'sheets' },
      ],
      caption: 'AI classifies and extracts; deterministic steps validate and route. Judgment where it matters, rules everywhere else.',
    },
    askQuestions: [
      'How does the email automation work?',
      'Where does the AI help vs deterministic steps?',
      'When will the workflow be finished?',
    ],
  },
];

export const projectTagFilters: Array<'All' | ProjectTag> = [
  'All',
  'Agentic AI',
  'AI Evaluation',
  'Backend',
  'LLM Systems',
  'Tooling',
];

/* ── Skills — the apparatus (no skill bars, ever) ─────────────────────── */

export const skillGroups: SkillGroup[] = [
  {
    name: 'AI',
    blurb: 'Model work, then proof: agents, evaluation, retrieval, and output validation.',
    items: [
      'Agentic AI',
      'LLM evaluation',
      'Prompt engineering',
      'RAG',
      'Retrieval',
      'Multi-step workflows',
      'Model-output validation',
      'AI automation',
    ],
  },
  {
    name: 'Languages',
    blurb: 'Python as home base, with working fluency across typed, query, and shell languages.',
    items: ['Python', 'TypeScript', 'JavaScript', 'C#', 'SQL', 'KQL', 'Bash'],
  },
  {
    name: 'Backend',
    blurb: 'Services designed to stay up, and APIs designed to make sense.',
    items: ['REST APIs', 'FastAPI', 'Flask', '.NET', 'Distributed systems'],
  },
  {
    name: 'Cloud',
    blurb: 'Production platforms and the observability to watch them.',
    items: ['Microsoft Azure', 'OneLake', 'Fabric', 'Azure Monitor', 'AWS'],
  },
  {
    name: 'Engineering',
    blurb: 'Shipping safely: containers, CI/CD, testing, and observability.',
    items: [
      'Docker',
      'Kubernetes',
      'GitHub Actions',
      'Jenkins',
      'CI/CD',
      'pytest',
      'Cypress',
      'Observability',
      'Debugging',
    ],
  },
  {
    name: 'Data',
    blurb: 'Storage, movement, and queries tuned to be fast.',
    items: ['SQL Server', 'PostgreSQL', 'Snowflake', 'DynamoDB', 'Redis'],
  },
];

/* ── Certifications & education ────────────────────────────────────────── */

export const certifications: Certification[] = [
  {
    name: 'Agentic AI Certification',
    issuer: 'DeepLearning.AI (Andrew Ng)',
    year: '2026',
    issued: 'April 3, 2026',
    url: 'https://www.deeplearning.ai/certificates/d43e6cd4-2f08-45d8-a088-31b2acbf93cd',
  },
  {
    name: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services',
    year: '2025',
    issued: 'June 24, 2025',
    expires: 'June 24, 2028',
    url: 'https://www.credly.com/badges/20c705ae-dfe2-400e-b17d-b76c6bcbb30d/public_url',
  },
  {
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    year: '2023',
    issued: 'June 19, 2023',
    expires: 'June 24, 2028',
    url: 'https://www.credly.com/badges/eb3dcf9f-e4b2-444e-b5a0-e3769702a4ea/public_url',
  },
];

export const education: EducationEntry[] = [
  {
    school: 'Northeastern University, Boston, MA',
    degree: 'M.S. in Analytics — Machine Learning concentration',
    period: '2023 – 2025',
    detail: 'GPA 3.91 / 4.0',
  },
  {
    school: 'VNR VJIET, Hyderabad',
    degree: 'B.E. in Electrical and Electronics Engineering',
    period: '2018 – 2022',
    detail: '',
  },
];

/* ── Scheduling — connect your real booking link here ──────────────────── */

export const scheduling: SchedulingConfig = {
  provider: 'calendly',
  // Fallback booking URL (used only when a per-meeting URL is empty).
  url: 'https://calendly.com/nagarenukakandi/new-meeting',
  // 15-minute introductory call — live.
  introUrl: 'https://calendly.com/nagarenukakandi/new-meeting',
  // No separate 30-min event — both cards book the 15-minute session.
  technicalUrl: 'https://calendly.com/nagarenukakandi/new-meeting',
};

export const meetingTypes = [
  {
    id: 'intro',
    name: 'Introductory call',
    duration: '15 min',
    description: 'A quick hello — my background, what I’m looking for, and whether there’s a fit.',
    urlKey: 'introUrl' as const,
  },
  {
    id: 'technical',
    name: 'Technical / project discussion',
    duration: '15 min',
    description: 'A focused discussion on systems I’ve built, my evaluation work, or a specific project.',
    urlKey: 'technicalUrl' as const,
  },
];

/* ── Ask Kandi — curated knowledge base ────────────────────────────────
 * The assistant answers ONLY from these entries, IN FIRST PERSON as Renuka.
 * Each entry lists trigger phrases, a suggestion label, a verified answer,
 * and clickable references (section anchors like "#projects" / "#schedule"
 * or verified external URLs). To teach Ask Kandi something new, add an
 * entry here — no code changes. If a question matches nothing, the honest
 * fallback below is used.
 * ─────────────────────────────────────────────────────────────────────── */

export const askRenukaKnowledge: KnowledgeEntry[] = [
  {
    id: 'hello',
    label: 'Hello!',
    triggers: ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good evening', 'namaste'],
    answer:
      'Hello! Ask about Microsoft work, agentic AI experience, projects, evaluation, tools, or connecting.',
    references: [{ label: 'My experience', target: '#experience' }],
  },
  {
    id: 'who-is',
    label: 'Who are you?',
    triggers: [
      'who is renuka',
      'who are you',
      'about renuka',
      'about you',
      'your background',
      'tell me about yourself',
      'introduce yourself',
      'overview',
      'summary',
    ],
    answer:
      'I’m Renuka — an AI and software engineer working across agentic AI workflows, LLM evaluation, Python engineering, backend development, and cloud reliability. I’ve worked with Microsoft, Handshake AI, and JPMorgan Chase, plus AI evaluation work with LinkedIn.',
    references: [
      { label: 'My experience', target: '#experience' },
      { label: 'My projects', target: '#projects' },
    ],
  },
  {
    id: 'microsoft',
    label: 'What did you build at Microsoft?',
    triggers: [
      'microsoft',
      'azure',
      'onelake',
      'fabric',
      'what did you build at microsoft',
      'what did you work on at microsoft',
      'microsoft work',
      'your microsoft',
      'platform reliability',
      'reliability',
      'diagnostic workflow',
      'diagnostic',
      'connect diagnostic tools',
      'how did you connect',
      'rca',
      'root cause',
      'manual process',
      'what manual process',
      'eight hours',
      '8 hours',
      'validate diagnostic',
      'how did you validate',
      'kql',
      'kusto',
      'snowflake',
    ],
    answer:
      'At Microsoft (Dec 2025 – Jun 2026) I was a Software Engineer on AI & Platform Reliability. I built and tested a Python-based agentic diagnostic workflow for Azure OneLake/Fabric that connects incident information, KQL telemetry, and diagnostic tools to support root-cause investigation. It replaces a repetitive manual process — weekly reliability dashboard reviews, telemetry queries, incident correlation, and written investigation summaries, about eight hours of work — with a structured assisted workflow. My hands-on work included diagnostic skill design, tool selection, Kusto and Snowflake integrations, structured data processing, output validation against real platform behavior, and AI-assisted root-cause drafts with reliability summaries for engineer review. To be clear: it supports engineers during investigations — it does not independently resolve incidents, guarantee correct root causes, or perform autonomous production remediation.',
    references: [
      { label: 'Agentic AI for Platform Reliability', target: '#project-agentic-reliability' },
      { label: 'See my Microsoft field note', target: '#experience' },
    ],
  },
  {
    id: 'agentic-ai',
    label: 'Do you have agentic AI experience?',
    triggers: [
      'agentic',
      'agent',
      'agents',
      'multi-agent',
      'autonomous',
      'agentic ai experience',
      'llama',
      'groq',
      'platform reliability',
      'diagnostic workflow',
    ],
    answer:
      'Yes — hands-on. At Microsoft I built and tested a Python-based agentic diagnostic workflow for Azure OneLake/Fabric investigations: diagnostic skill design, tool selection, multi-step execution across Kusto and Snowflake sources, structured data processing, output validation, and AI-assisted root-cause drafts for engineer review. It replaces about eight hours of repetitive manual reliability work with a structured assisted workflow — and it stays engineer-in-the-loop rather than resolving incidents or remediating production on its own. Separately, I built the Devil’s Advocate Agent, a four-role multi-agent reasoning system (Researcher, Devil’s Advocate, Defense, Judge) running iterative loops on Llama 3.3 70B via the Groq API. I also hold a 2026 Agentic AI Certification from DeepLearning.AI.',
    references: [
      { label: 'Agentic AI for Platform Reliability', target: '#project-agentic-reliability' },
      { label: 'Devil’s Advocate experiment', target: '#project-devils-advocate' },
      { label: 'My certifications', target: '#credentials' },
    ],
  },
  {
    id: 'devils-advocate',
    label: "Tell me about Devil's Advocate",
    triggers: [
      "devil's advocate",
      'devils advocate',
      'devil advocate',
      'counter-evidence',
      'deliberation',
      'debate',
      'why did you use multiple agents',
      'why multiple agents',
      'how does the judge work',
      'judge work',
      'limitations of this approach',
      'what are the limitations',
    ],
    answer:
      'I built Devil’s Advocate to explore a question I had: what if an AI challenged its own reasoning instead of simply agreeing? I designed four roles — a Researcher that retrieves counter-evidence, a Devil’s Advocate that attacks the stance, a Defense that reinforces it, and a Judge that evaluates both sides and only rules when the reasoning holds up. I run iterative loops on Llama 3.3 70B via Groq with a Gradio interface. I use multiple agents because structured disagreement surfaces holes single-pass answers miss. The Judge works by weighing both sides’ reasoning rather than voting. Limitations I’m upfront about: it explores multi-agent reasoning and does not guarantee factual accuracy. The hosted demo is paused because inference runs on a paid API — the architecture is documented on this page and the demo link is labeled paused.',
    references: [
      { label: 'Devil’s Advocate experiment', target: '#project-devils-advocate' },
      {
        label: 'Live demo (paused)',
        target: 'https://huggingface.co/spaces/nagarenukakandi/devils-advocate',
      },
    ],
  },
  {
    id: 'research-sphere',
    label: 'What is Research Sphere?',
    triggers: ['research sphere', 'research-sphere', 'sonar', 'perplexity', 'rag', 'retrieval'],
    answer:
      'Research Sphere is a research assistant I built for the Perplexity Sonar API hackathon. It’s a Streamlit app: you ask a research question, it returns grounded answers with APA-style citations, and a “curiosity path” of follow-up questions lets you go deeper without losing the thread. It’s powered by Sonar’s retrieval rather than a from-scratch RAG pipeline — I’m honest about that distinction.',
    references: [{ label: 'Research Sphere experiment', target: '#project-research-sphere' }],
  },
  {
    id: 'promptly',
    label: 'Have you built a browser-based AI app?',
    triggers: [
      'promptly',
      'chrome extension',
      'browser',
      'writing assistant',
      'gemini nano',
      'on-device',
      'privacy',
    ],
    answer:
      'Yes — promptLY, my privacy-first AI writing assistant. It’s a Chrome extension that runs entirely on-device using Gemini Nano: rewrite, summarize, translate, proofread, reply to emails, humanize text — through a side panel and context menu, with everything in local storage. No cloud, no subscriptions, no data leaving your machine. It’s published on the Chrome Web Store, and the repo is on my GitHub.',
    references: [
      { label: 'promptLY experiment', target: '#project-promptly' },
      {
        label: 'Chrome Web Store',
        target: 'https://chromewebstore.google.com/detail/promptly/biijfhjfjpdjlofggklcphihafpnkojo',
      },
      { label: 'My GitHub', target: 'https://github.com/renukaKandii/' },
    ],
  },
  {
    id: 'optiprompt',
    label: 'What is OptiPrompt?',
    triggers: [
      'optiprompt',
      'opti prompt',
      'prompt optimizer',
      'prompt engineering',
      'sharkhack',
      'hackathon',
      'best use of gemini',
    ],
    answer:
      'At SharkHack 2025 — a 24-hour AI hackathon at Simmons University — I built OptiPrompt, after I burned half the ideation phase fighting ChatGPT with badly written prompts. It’s a Streamlit app on the Gemini 2.0 Flash API: it improves your prompt with few-shot learning, shows the original and optimized versions side by side, and explains why the new one is better — which means fewer redundant calls and less wasted compute. We won Best Use of Gemini for it. The demo is paused (expired API key), but the code is on GitHub.',
    references: [
      { label: 'OptiPrompt experiment', target: '#project-optiprompt' },
      {
        label: 'Live demo (paused)',
        target: 'https://projects2025-v5eecvz3nbxnmc3agtdjmb.streamlit.app',
      },
      { label: 'GitHub repository', target: 'https://github.com/renukaKandii/projects2025' },
    ],
  },
  {
    id: 'modeltrove',
    label: 'What is ModelTrove?',
    triggers: ['modeltrove', 'model comparison', 'compare models', 'current project', 'working on now'],
    answer:
      'ModelTrove is what I’m building right now — it’s still in progress and launching soon. It’s an AI model and tool comparison app: capabilities, pricing, context windows, benchmarks, all from primary sources, presented as neutral evidence tables instead of arbitrary match scores. My current focus is deciding which AI API to build it on — the most economical one that stays genuinely useful.',
    references: [{ label: 'ModelTrove experiment', target: '#project-modeltrove' }],
  },
  {
    id: 'n8n',
    label: 'What is the n8n automation?',
    triggers: ['n8n', 'email automation', 'job email', 'workflow automation', 'google sheets'],
    answer:
      'It’s a personal automation I’m building (still in progress): incoming recruiter email goes through AI classification, then I extract structured fields — company, role, required action — validate and route them, and log everything to Google Sheets for tracking. It’s API and integration automation, not a computer-use agent: deterministic steps, with AI only where judgment is actually needed.',
    references: [{ label: 'Automation experiment', target: '#project-n8n-automation' }],
  },
  {
    id: 'ai-evaluation',
    label: 'What is your experience with AI evaluation?',
    triggers: [
      'ai evaluation',
      'llm evaluation',
      'evaluation',
      'eval',
      'rubric',
      'hallucination',
      'testing ai',
      'annotation',
      'codex',
      'communication quality',
    ],
    answer:
      'Evaluation is my current specialty. I’m currently an AI Evaluation Engineer on an independent contract with Handshake AI (Aug 2026 – Present), where I evaluate the communication quality of AI coding assistants including Codex — how effectively agents communicate technical information, explain their actions, and respond to developer requests. At LinkedIn (Jun 2026 – present, freelancing) I’m an AI Trainer & Evaluation Engineer: I evaluate AI coding-agent responses to real developer tasks against structured rubrics — correctness, readability, actionability, adherence to the request — and I review other evaluators’ annotations for consistency and reasoning quality. Earlier at Handshake AI (May 2025 – Dec 2025), I evaluated outputs across 100+ production codebases, compared 5+ LLMs on a six-dimension rubric, and ran Docker-based fail-to-pass and regression suites against golden solutions.',
    references: [{ label: 'My experience', target: '#experience' }],
  },
  {
    id: 'computer-use',
    label: 'Have you evaluated computer-use agents?',
    triggers: ['computer-use', 'computer use', 'osworld', 'gui agent', 'operator', 'screen agent'],
    answer:
      'Adjacent experience, honestly labeled: I’ve tested multi-step diagnostic workflows and evaluated agent outputs and action sequences at Microsoft, which involves the same muscles — tool selection, execution traces, output validation. I haven’t professionally implemented named benchmarks like OSWorld, and I won’t claim otherwise.',
    references: [{ label: 'My Microsoft work', target: '#experience' }],
  },
  {
    id: 'technologies',
    label: 'What technologies do you use?',
    triggers: [
      'technologies',
      'tech stack',
      'stack',
      'languages',
      'tools',
      'what do you use',
      'skills',
      'proficient',
      'programming',
    ],
    answer:
      'Python is my home base — it runs through my AI evaluation, automation, and backend work. I also work in TypeScript, JavaScript, C#, SQL, KQL, and Bash. Backend-wise: REST APIs, FastAPI, Flask, .NET, microservices, distributed systems. Cloud: Azure (OneLake, Fabric, Monitor) and AWS. Plus Docker, Kubernetes, GitHub Actions, Jenkins, and data stores from SQL Server and PostgreSQL to Snowflake, DynamoDB, and Redis.',
    references: [{ label: 'My skills', target: '#skills' }],
  },
  {
    id: 'backend-proof',
    label: 'Which projects show your backend skills?',
    triggers: [
      'backend',
      'back-end',
      'demonstrate',
      'which projects',
      'engineering skills',
      'distributed',
      'microservices',
      'pipelines',
      'api',
    ],
    answer:
      'Backend engineering runs through my work: at JPMorgan I built Python/SQL pipelines for compliance dashboards and C# ASP.NET REST services; at Microsoft I built Python diagnostic workflows on Azure OneLake/Fabric with structured data processing. Project-wise, promptLY is backend thinking applied to the edge — a fully on-device LLM system with local storage and zero cloud dependency — and my n8n workflow is pure API and integration automation.',
    references: [
      { label: 'promptLY experiment', target: '#project-promptly' },
      { label: 'My experience', target: '#experience' },
    ],
  },
  {
    id: 'handshake',
    label: 'What did you do at Handshake AI?',
    triggers: ['handshake', 'independent contract', 'current handshake', 'codex evaluation'],
    answer:
      'I’ve had two Handshake AI engagements. Currently (Aug 2026 – Present) I’m an AI Evaluation Engineer on an independent contract evaluating communication quality of AI coding assistants including Codex — how clearly agents explain actions and respond to developers, with structured feedback against defined criteria. Earlier (May 2025 – Dec 2025) I was a Software Engineer in AI Evaluation & Automation: I evaluated LLM and coding outputs across 100+ production codebases and 50+ open-source repos against golden solutions, compared 5+ LLMs on a six-dimension rubric, analyzed multi-step agent behavior for failure patterns, and built Docker-based reproducible validation with automated fail-to-pass and regression tests.',
    references: [{ label: 'My experience', target: '#experience' }],
  },
  {
    id: 'jpmorgan',
    label: 'What did you do at JPMorgan Chase?',
    triggers: ['jpmorgan', 'jpmc', 'chase', 'bank', 'finance'],
    answer:
      'At JPMorgan Chase (Feb 2022 – Aug 2023) I was a Software Engineer I on financial services systems: Python/SQL pipelines feeding React compliance dashboards for 200+ stakeholders (30% query speedup via indexing), C# ASP.NET REST services (35% faster page loads), Cypress coverage grown from 45% to 80% catching 30+ pre-release defects, Jenkins CI/CD with 20% faster releases — all on high-availability AWS infrastructure.',
    references: [{ label: 'My experience', target: '#experience' }],
  },
  {
    id: 'education',
    label: 'What is your education?',
    triggers: ['education', 'degree', 'university', 'college', 'northeastern', 'masters', 'gpa', 'studied', 'school'],
    answer:
      'I have an M.S. in Analytics (Machine Learning concentration) from Northeastern University in Boston (2023 – 2025, GPA 3.91/4.0), and a B.E. in Electrical and Electronics Engineering from VNR VJIET in Hyderabad (2018 – 2022).',
    references: [{ label: 'Credentials', target: '#credentials' }],
  },
  {
    id: 'certifications',
    label: 'What certifications do you hold?',
    triggers: ['certification', 'certified', 'certificate', 'deeplearning', 'credential', 'credly', 'aws certified'],
    answer:
      'I hold three certifications, all earned: the Agentic AI Certification from DeepLearning.AI (Andrew Ng, issued April 3, 2026), AWS Certified Solutions Architect – Associate (issued June 24, 2025, expires June 24, 2028), and AWS Certified Cloud Practitioner (issued June 19, 2023, expires June 24, 2028). I only list credentials I’ve earned — verification links are on my credentials section.',
    references: [
      { label: 'Credentials', target: '#credentials' },
      {
        label: 'Agentic AI certificate',
        target: 'https://www.deeplearning.ai/certificates/d43e6cd4-2f08-45d8-a088-31b2acbf93cd',
      },
      {
        label: 'AWS Architect – Associate (Credly)',
        target: 'https://www.credly.com/badges/20c705ae-dfe2-400e-b17d-b76c6bcbb30d/public_url',
      },
      {
        label: 'AWS Cloud Practitioner (Credly)',
        target: 'https://www.credly.com/badges/eb3dcf9f-e4b2-444e-b5a0-e3769702a4ea/public_url',
      },
    ],
  },
  {
    id: 'code',
    label: 'Where can I see your code?',
    triggers: ['code', 'github', 'repository', 'repos', 'open source', 'source code'],
    answer:
      'My GitHub is github.com/renukaKandii — you’ll find promptLY (the on-device AI Chrome extension) and Research Sphere (the Sonar-powered research app) there, plus earlier work. The Devil’s Advocate demo is linked too — it’s currently paused because the inference API is a paid service — and ModelTrove’s links are coming soon.',
    references: [
      { label: 'My GitHub', target: 'https://github.com/renukaKandii/' },
      {
        label: 'Devil’s Advocate demo (paused)',
        target: 'https://huggingface.co/spaces/nagarenukakandi/devils-advocate',
      },
    ],
  },
  {
    id: 'schedule',
    label: 'Can I schedule a conversation?',
    triggers: ['schedule', 'call', 'meeting', 'book', 'calendar', 'chat with you', 'talk', 'conversation', 'intro call', 'calendly'],
    answer:
      'Yes — I’d like that. I offer 15-minute calls — a quick hello or a focused technical/project discussion. Head to my scheduling section: it detects your timezone automatically, and the buttons open my real Calendly booking page.',
    references: [{ label: 'Schedule a call', target: '#schedule' }],
  },
  {
    id: 'contact',
    label: 'How can we connect?',
    triggers: ['contact', 'email', 'reach you', 'linkedin', 'hire you', 'get in touch', 'connect with you', 'how can we connect'],
    answer:
      'Email me at nagarenukakandi@gmail.com — that’s the fastest way. I’m also on LinkedIn, and my GitHub is github.com/renukaKandii. If you’d rather talk live, my scheduling section has 15-minute booking options.',
    references: [
      { label: 'Schedule a call', target: '#schedule' },
      { label: 'Contact', target: '#contact' },
    ],
  },
  {
    id: 'projects-overview',
    label: 'Show me your projects',
    triggers: ['show me your projects', 'your projects', 'projects have you worked on', 'what projects', 'list projects', 'all projects', 'portfolio projects', 'experiments'],
    answer:
      'I keep seven experiments in my lab notebook: Agentic AI for Platform Reliability (my Microsoft diagnostic workflow), Devil’s Advocate (multi-agent debate), Research Sphere (cited research answers), promptLY (published on-device writing assistant), OptiPrompt (hackathon prompt optimizer), ModelTrove (in-progress model comparison), and a Job-Email Automation workflow (in progress). Open the experiments section and flip through them one at a time — each has its architecture diagram and an “Ask me about this project” option.',
    references: [{ label: 'My projects', target: '#projects' }],
  },
  {
    id: 'sponsorship',
    label: 'Do you require sponsorship?',
    triggers: [
      'sponsorship',
      'sponsor',
      'visa',
      'stem opt',
      'stem-opt',
      'stemopt',
      'opt',
      'work authorization',
      'authorized to work',
      'require sponsorship',
      'need sponsorship',
    ],
    answer:
      'I’m currently on STEM OPT and can work in the U.S. for 2 years without sponsorship — after that, I would need it. If you’re hiring, email me and we can talk specifics.',
    references: [{ label: 'Contact', target: '#contact' }],
  },
  {
    id: 'availability',
    label: 'Are you open to work?',
    triggers: [
      'w2',
      'w-2',
      'full-time',
      'full time',
      'fulltime',
      'open to work',
      'open to contracts',
      'availability',
      'looking for work',
      'job search',
      'contract roles',
    ],
    answer:
      'Yes — I’m open to W2 contracts and full-time roles. If you’re a recruiter or engineering manager with something interesting, email me or book a 15-minute call and let’s talk.',
    references: [
      { label: 'Schedule a call', target: '#schedule' },
      { label: 'Contact', target: '#contact' },
    ],
  },
  {
    id: 'experience-years',
    label: 'How many years of experience do you have?',
    triggers: [
      'years of experience',
      'how many years',
      'how much experience',
      'yoe',
      'experience length',
      'years experience',
    ],
    answer:
      'Roughly three years in industry: a year and a half as a Software Engineer at JPMorgan Chase (Feb 2022 – Aug 2023), and AI evaluation plus platform reliability work from May 2025 to now across Handshake AI, Microsoft, LinkedIn, and a current independent contract — with an M.S. in Analytics (2023–2025) in between.',
    references: [{ label: 'My experience', target: '#experience' }],
  },
];

/** Shown when a question matches nothing in the knowledge base. Honest, first person. */
export const askFallbackAnswer =
  'No published details on that. Try one of the suggested questions, or email nagarenukakandi@gmail.com.';

/** Suggested questions shown as chips in the Ask Kandi UI. */
export const askSuggestions: string[] = [
  'What did you build at Microsoft?',
  'Tell me about your agentic AI experience',
  'Show me your projects',
  'What is your experience with AI evaluation?',
  'What technologies do you work with?',
  'Do you require sponsorship?',
  'How can we connect?',
];
