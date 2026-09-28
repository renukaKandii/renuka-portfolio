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
  return (
    <header className="nav">
      <div className="nav-inner">
        <a className="nav-brand" href="#top" aria-label="Back to top">
          <span className="stamp" aria-hidden="true">
            R
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
