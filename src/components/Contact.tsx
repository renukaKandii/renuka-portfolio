import { profile } from '../data/portfolio';
import { useReveal } from '../hooks/useReveal';

export default function Contact() {
  const ref = useReveal();

  const cards = [
    {
      k: 'Email',
      v: profile.email,
      hint: 'Fastest way to reach me',
      href: `mailto:${profile.email}`,
    },
    {
      k: 'LinkedIn',
      v: 'naga-renuka-kandi',
      hint: 'Professional profile & DMs',
      href: profile.linkedin,
    },
    {
      k: 'GitHub',
      v: 'renukaKandii',
      hint: 'Code & experiments',
      href: profile.github,
    },
  ];

  return (
    <section className="block" id="contact" aria-label="Contact">
      <div className="wrap">
        <div ref={ref} className="reveal">
          <p className="dossier-label">Dossier 08 · Correspondence</p>
          <h2 className="section-title">The notebook is open. Let&apos;s talk.</h2>
          <p className="section-lede">
            Open to conversations about engineering opportunities, AI projects and interesting
            technical challenges. Whether it&apos;s a role, a collaboration or simply an idea
            worth discussing, feel free to reach out.
          </p>
        </div>

        <div className="contact-grid contact-grid-3">
          {cards.map((c) => (
            <a
              key={c.k}
              className="contact-card reveal"
              ref={useReveal<HTMLAnchorElement>()}
              href={c.href}
              target={c.href.startsWith('http') ? '_blank' : undefined}
              rel={c.href.startsWith('http') ? 'noreferrer' : undefined}
              aria-label={`${c.k}: ${c.v} — ${c.hint}`}
            >
              <span className="k">{c.k}</span>
              <span className="v">{c.v}</span>
              <span className="hint">{c.hint}</span>
            </a>
          ))}
        </div>

        <p className="schedule-nudge">
          Prefer live conversation? <a href="#schedule">Book a 15-minute call with me →</a>
        </p>
      </div>
    </section>
  );
}
