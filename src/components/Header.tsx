import Link from 'next/link';
import { site } from '@/site.config';

export function Header() {
  return (
    <header className="topo">
      <div className="wrap">
        <Link href="/" className="logo" aria-label={`${site.marca}, início`}>
          {site.marca}
          <b>.</b>
        </Link>
        <nav className="menu" aria-label="Principal">
          <Link href="/projetos/">Projetos</Link>
          <Link href="/sobre/">Sobre</Link>
          <Link href="/contato/" className="btn manter">
            Falar comigo
          </Link>
        </nav>
      </div>
    </header>
  );
}
