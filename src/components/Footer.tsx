import { profile } from '../data/portfolio';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <span>
          © {new Date().getFullYear()} {profile.name} · Lab notebook Nº 001
        </span>
        <span>
          Built with React + TypeScript ·{' '}
          <a href={profile.github} target="_blank" rel="noreferrer">
            Source on GitHub
          </a>
        </span>
      </div>
    </footer>
  );
}
