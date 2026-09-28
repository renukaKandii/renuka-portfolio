import { useEffect, useRef, useState } from 'react';
import { projects, type DiagramSpec } from '../data/portfolio';
import { useReveal } from '../hooks/useReveal';

/** Project deep-links (e.g. "#project-promptly") select that project in the carousel. */
export const PROJECT_SELECT_EVENT = 'projects:select';

/** Renders a project's diagram as an interactive, accessible flow. */
function ProjectDiagram({ diagram, projectId }: { diagram: DiagramSpec; projectId: string }) {
  const nodeById = new Map(diagram.nodes.map((n) => [n.id, n]));

  const orderedIds: string[] = [];
  if (diagram.edges.length > 0) {
    orderedIds.push(diagram.edges[0].from);
    for (const e of diagram.edges) {
      if (!orderedIds.includes(e.to)) orderedIds.push(e.to);
      if (!orderedIds.includes(e.from)) orderedIds.push(e.from);
    }
  } else {
    for (const n of diagram.nodes) orderedIds.push(n.id);
  }
  const edgeLabel = (from: string, to: string) =>
    diagram.edges.find((e) => e.from === from && e.to === to)?.label;

  const [selectedId, setSelectedId] = useState<string>(orderedIds[0] ?? diagram.nodes[0]?.id ?? '');
  useEffect(() => {
    setSelectedId(orderedIds[0] ?? diagram.nodes[0]?.id ?? '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);
  const selected = nodeById.get(selectedId);

  return (
    <figure className="exp-diagram" aria-label="Interactive architecture diagram">
      <div className="diagram-flow" role="group" aria-label="Diagram stages">
        {orderedIds.map((id, i) => {
          const node = nodeById.get(id);
          if (!node) return null;
          const isSelected = id === selectedId;
          return (
            <span key={id} style={{ display: 'contents' }}>
              {i > 0 && (
                <span className="diagram-arrow" aria-hidden="true">
                  →
                  {edgeLabel(orderedIds[i - 1], id) && (
                    <span className="da-label">{edgeLabel(orderedIds[i - 1], id)}</span>
                  )}
                </span>
              )}
              <button
                type="button"
                className={`diagram-node${isSelected ? ' is-selected' : ''}`}
                aria-pressed={isSelected}
                onClick={() => setSelectedId(id)}
              >
                <span className="dn-step">
                  Stage {i + 1} · {isSelected ? 'selected' : 'select'}
                </span>
                <span className="dn-label">{node.label}</span>
              </button>
            </span>
          );
        })}
        <span className="sr-only">End of diagram.</span>
      </div>
      {selected && (
        <div className="diagram-detail" aria-live="polite">
          <p className="diagram-detail-title">{selected.label}</p>
          {selected.detail && <p className="diagram-detail-body">{selected.detail}</p>}
        </div>
      )}
      <span className="sr-only">
        {diagram.edges
          .map((e) => {
            const a = nodeById.get(e.from)?.label ?? e.from;
            const b = nodeById.get(e.to)?.label ?? e.to;
            return `${a} leads to ${b}${e.label ? ` (${e.label})` : ''}`;
          })
          .join('. ')}
        .
      </span>
      {diagram.caption && <figcaption className="diagram-caption">{diagram.caption}</figcaption>}
    </figure>
  );
}

interface ProjectsProps {
  /** Open the floating assistant; optional project-specific starter questions. */
  onAskQuestion: (question: string | null, starters?: string[]) => void;
}

/**
 * Experiments as a one-at-a-time sliding carousel: category filters up
 * top, a wide two-column card (details left, diagram right), side arrows,
 * counter, and a name strip. Changing category resets to the first match
 * so the counter and navigation stay accurate.
 */
export default function Projects({ onAskQuestion }: ProjectsProps) {
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);
  const ref = useReveal();

  const safeIndex = Math.min(index, projects.length - 1);
  const current = projects[safeIndex];

  const go = (dir: 1 | -1) => {
    setIndex((i) => (i + dir + projects.length) % projects.length);
  };

  // Deep-link support: "#project-<id>" slides to that project.
  useEffect(() => {
    const onSelect = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (typeof id !== 'string') return;
      const at = projects.findIndex((p) => `project-${p.id}` === id || p.id === id);
      if (at !== -1) setIndex(at);
    };
    window.addEventListener(PROJECT_SELECT_EVENT, onSelect);
    return () => window.removeEventListener(PROJECT_SELECT_EVENT, onSelect);
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) < 40) return;
    go(dx < 0 ? 1 : -1);
  };

  return (
    <section
      className="block"
      id="projects"
      aria-label="Projects"
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(1);
        if (e.key === 'ArrowLeft') go(-1);
      }}
    >
      <div className="wrap">
        <div ref={ref} className="reveal">
          <p className="dossier-label">Dossier 03 · Experiments</p>
          <h2 className="section-title">Built, tested and documented.</h2>
          <p className="section-lede">
            Explore engineering projects, AI experiments and the technical decisions behind them.
          </p>
        </div>

        <div
          className="carousel"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          aria-roledescription="carousel"
          aria-label="Project experiments"
        >
          <div className="carousel-stage">
            <button
              type="button"
              className="carousel-side"
              onClick={() => go(-1)}
              aria-label="Previous project"
            >
              <span aria-hidden="true">‹</span>
            </button>

            <article
              key={current.id}
              id={`project-${current.id}`}
                  className="experiment carousel-slide"
                  aria-label={current.title}
                  aria-roledescription="slide"
                  aria-rowindex={safeIndex + 1}
                >
                  <div className="exp-no">
                    <span>
                      Experiment {String(projects.findIndex((p) => p.id === current.id) + 1).padStart(2, '0')}
                    </span>
                    <span>{current.tags.join(' · ')}</span>
                  </div>
                  <span className={`exp-status ${current.status}`}>{current.statusDisplay}</span>
                  <h3>{current.title}</h3>
                  <p className="tagline">{current.category}</p>
                  <p className="exp-headline">“{current.headline}”</p>

                  <div className="exp-cols">
                    <div className="exp-main">
                      <p className="exp-description">{current.description}</p>
                      <div className="exp-block">
                        <span className="k">Contributions</span>
                        <ul className="v">
                          {current.contributions.map((m) => (
                            <li key={m}>{m}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="exp-side">
                      {current.diagram && (
                        <ProjectDiagram diagram={current.diagram} projectId={current.id} />
                      )}
                      <div className="tech-badges" aria-label="Technologies used">
                        {current.tech.map((t) => (
                          <span key={t}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="exp-foot">
                    <div className="exp-block">
                      <span className="k">Outcome</span>
                      <span className="v">{current.outcome}</span>
                    </div>
                    {current.links.length > 0 ? (
                      <div className="exp-links">
                        {current.links.map((l) => (
                          <a key={l.url} href={l.url} target="_blank" rel="noreferrer">
                            {l.label} <span aria-hidden="true">↗</span>
                          </a>
                        ))}
                      </div>
                    ) : (
                      current.linksNote && <p className="exp-links-note">{current.linksNote}</p>
                    )}
                    {current.demoNote && <p className="exp-links-note">{current.demoNote}</p>}
                    <button
                      type="button"
                      className="btn btn-ghost"
                      onClick={() => onAskQuestion(null, current.askQuestions)}
                    >
                      Ask about this project <span aria-hidden="true">→</span>
                    </button>
                  </div>
                </article>

              <button
                type="button"
                className="carousel-side"
                onClick={() => go(1)}
                aria-label="Next project"
              >
                <span aria-hidden="true">›</span>
              </button>
            </div>

            <p className="carousel-count" aria-live="polite">
              Project {safeIndex + 1} of {projects.length}
            </p>

            <div className="carousel-strip" role="tablist" aria-label="All projects">
              {projects.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  role="tab"
                  aria-selected={i === safeIndex}
                  className={`strip-item${i === safeIndex ? ' is-active' : ''}`}
                  onClick={() => setIndex(i)}
                  title={p.title}
                >
                  {p.title}
                </button>
              ))}
            </div>
          </div>
      </div>
    </section>
  );
}
