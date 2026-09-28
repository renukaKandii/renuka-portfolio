import { skillGroups } from '../data/portfolio';
import { useReveal } from '../hooks/useReveal';

/**
 * Skills as lab apparatus: instruments on the bench, not progress bars.
 * Tools I reach for — shown as such.
 */
export default function Skills() {
  const ref = useReveal();

  return (
    <section className="block" id="skills" aria-label="Skills">
      <div className="wrap">
        <div ref={ref} className="reveal">
          <p className="dossier-label">Dossier 04 · Apparatus</p>
          <h2 className="section-title">The engineering toolkit.</h2>
          <p className="section-lede">
            Technologies used across AI development, evaluation, backend engineering and cloud
            reliability.
          </p>
        </div>

        <div className="apparatus">
          {skillGroups.map((group, i) => (
            <div key={group.name} className="instrument reveal" ref={useReveal<HTMLDivElement>()}>
              <span className="inst-no">INSTR. {String(i + 1).padStart(2, '0')}</span>
              <h3>{group.name}</h3>
              <div className="chips">
                {group.items.map((item) => (
                  <span key={item} className="chip">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
