import { certifications, education } from '../data/portfolio';
import { useReveal } from '../hooks/useReveal';

/** Education + certifications as compact horizontal groups. */
export default function Credentials() {
  const ref = useReveal();

  return (
    <section className="block" id="credentials" aria-label="Education and certifications">
      <div className="wrap">
        <div ref={ref} className="reveal">
          <p className="dossier-label">Dossier 05 · Peer review</p>
          <h2 className="section-title">My education and certifications.</h2>
          <p className="section-lede">
            Degrees and certifications, listed exactly as earned. Verification links included
            where available.
          </p>
        </div>

        <div className="creds-group">
          <h3>Education</h3>
          <div className="edu-row">
            {education.map((e) => (
              <div key={e.school} className="cred-card reveal" ref={useReveal<HTMLDivElement>()}>
                <p className="cred-name">{e.degree}</p>
                <p className="cred-sub">
                  {e.school} · {e.period}
                  {e.detail ? ` · ${e.detail}` : ''}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="creds-group">
          <h3>Certifications</h3>
          <div className="cert-row">
            {certifications.map((c) => (
              <div key={c.name} className="cred-card reveal" ref={useReveal<HTMLDivElement>()}>
                <p className="cred-name">{c.name}</p>
                <p className="cred-sub">{c.issuer}</p>
                {(c.issued || c.expires || c.url) && (
                  <p className="cred-dates">
                    {c.issued && <>Issued {c.issued}</>}
                    {c.issued && c.expires && ' · '}
                    {c.expires && <>Expires {c.expires}</>}
                    {c.url && (
                      <>
                        {' · '}
                        <a href={c.url} target="_blank" rel="noreferrer">
                          Verify ↗
                        </a>
                      </>
                    )}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
