import Link from 'next/link';
import { site } from '@/site.config';

export function Footer() {
  return (
    <>
      <section className="rodape-cta" aria-labelledby="cta-titulo">
        <div className="wrap">
          <p className="rotulo">Tem um projeto?</p>
          <h2 id="cta-titulo" className="titulo">
            Bora <em>falar?</em>
          </h2>
          <div className="acoes">
            <a className="btn" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            <Link className="btn claro" href="/contato/">
              Mandar mensagem
            </Link>
          </div>
        </div>
      </section>
      <footer className="rodape">
        <div className="wrap">
          <span>
            © {new Date().getFullYear()} {site.nome}
          </span>
          <nav aria-label="Rodapé">
            <a href={`https://github.com/${site.github}`} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            {site.linkedin && (
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            )}
            <a href={`mailto:${site.email}`}>E-mail</a>
          </nav>
        </div>
      </footer>
    </>
  );
}
