import { useState } from 'react';
import { experience } from '../data/portfolio';
import { useReveal } from '../hooks/useReveal';

/**
 * Experience as interactive field notes: a dossier with one entry open at
 * a time. Tabs on desktop, horizontal scroll tabs on mobile.
 */
export default function Experience() {
  const [activeId, setActiveId] = useState(experience[0].id);
  const ref = useReveal();
  const active = experience.find((e) => e.id === activeId) ?? experience[0];

  return (
    <section className="block" id="experience" aria-label="Experience">
      <div className="wrap">
        <div ref={ref} className="reveal">
          <p className="dossier-label">Dossier 02 · Field notes</p>
          <h2 className="section-title">The work behind the systems.</h2>
          <p className="section-lede">
            Each role logged as a field entry — observations, builds, lessons.
          </p>
        </div>

        <div className="notes-layout reveal" ref={useReveal<HTMLDivElement>()}>
          <div
            className="notes-tabs"
            role="tablist"
            aria-label="Experience entries"
            aria-orientation="vertical"
          >
            {experience.map((e, i) => (
              <button
                key={e.id}
                role="tab"
                aria-selected={e.id === activeId}
                aria-controls={`note-panel-${e.id}`}
                id={`note-tab-${e.id}`}
                className="note-tab"
                onClick={() => setActiveId(e.id)}
              >
                <span className="tab-co">
                  {String(i + 1).padStart(2, '0')} · {e.company}
                </span>
                <span className="tab-period">{e.period}</span>
              </button>
            ))}
          </div>

          <div
            className="note-detail"
            role="tabpanel"
            id={`note-panel-${active.id}`}
            aria-labelledby={`note-tab-${active.id}`}
            key={active.id}
          >
            <h3 className="role">{active.role}</h3>
            <p className="meta">
              {active.company} · {active.period} · {active.location}
            </p>
            <ul>
              {active.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            {active.anecdote && (
              <aside className="anecdote" aria-label="Field story">
                <p className="anecdote-title">{active.anecdote.title}</p>
                <p>{active.anecdote.body}</p>
              </aside>
            )}
            <div className="tag-row" aria-label="Tags">
              {active.tags.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
