import { profile } from '../data/portfolio';
import { useReveal } from '../hooks/useReveal';

interface HeroProps {
  onAsk: () => void;
}

export default function Hero({ onAsk }: HeroProps) {
  const ref = useReveal();

  return (
    <section className="hero" id="top" aria-label="Introduction">
      <div className="wrap hero-grid">
        <div ref={ref} className="reveal">
          <p className="hero-kicker">
            <span className="dot" aria-hidden="true" /> Experiment dossier · Nº 001 · Open for review
          </p>
          <h1>
            Building intelligent systems. <em>Engineering them for reliability.</em>
          </h1>
          <p className="hero-summary">{profile.summary}</p>
          <div className="hero-ctas">
            <button type="button" className="btn" onClick={onAsk}>
              Ask Kandi
              <span aria-hidden="true">→</span>
            </button>
            <a className="btn btn-ghost" href="#projects">
              See the experiments
            </a>
            <a className="btn btn-ghost" href="#schedule">
              Schedule a call
            </a>
          </div>
          <p className="scroll-cue" aria-hidden="true">
            Scroll · the notebook continues
          </p>
        </div>

        <aside aria-label="Profile specimen card">
          <div className="specimen">
            <div className="specimen-head">
              <span>Specimen R-001</span>
              <span>Lab notebook</span>
            </div>
            <dl>
              <div>
                <dt>Name</dt>
                <dd>{profile.name}</dd>
              </div>
              <div>
                <dt>Role</dt>
                <dd>{profile.title}</dd>
              </div>
              <div>
                <dt>Focus</dt>
                <dd>Backends · AI evaluation · Agentic systems</dd>
              </div>
              <div>
                <dt>Currently</dt>
                <dd>AI evaluation · independent contract + freelancing</dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </section>
  );
}
