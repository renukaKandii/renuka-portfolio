import { useEffect, useState } from 'react';

interface NavProps {
  onAsk: () => void;
}

const links = [
  { href: '#experience', label: 'Field Notes' },
  { href: '#projects', label: 'Experiments' },
  { href: '#skills', label: 'Apparatus' },
  { href: '#credentials', label: 'Credentials' },
  { href: '#contact', label: 'Contact' },
];

export default function Nav({ onAsk }: NavProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header className="nav">
      <span
        className="scroll-progress"
        aria-hidden="true"
        style={{ transform: `scaleX(${progress})` }}
      />
      <div className="nav-inner">
        <a className="nav-brand" href="#top" aria-label="Back to top">
          <span className="stamp" aria-hidden="true">
            NR
          </span>
          <span>
            NAGA RENUKA KANDI <span className="brand-sub" aria-hidden="true">· LAB NOTEBOOK</span>
          </span>
        </a>
        <nav className="nav-links" aria-label="Primary">
          {links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
          <a className="btn btn-signal" href="#schedule">
            Schedule a Call
          </a>
          <button type="button" className="btn btn-ghost" onClick={onAsk}>
            Ask Kandi
          </button>
        </nav>
      </div>
    </header>
  );
}
