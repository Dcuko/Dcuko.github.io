import Link from 'next/link';
import { site } from '@/site.config';

export function Footer() {
  return (
    <>
      <section className="rodape-cta" aria-labelledby="cta-titulo">
        <div className="wrap">
          <p className="rotulo">Tem um projeto?</p>
          <h2 id="cta-titulo" className="titulo">
            Bora falar?
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
      <div className="ondas" aria-hidden="true">
        <svg viewBox="0 0 900 90" preserveAspectRatio="none">
          <defs>
            <linearGradient id="onda" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#7df9ff" />
              <stop offset="1" stopColor="#e07bff" />
            </linearGradient>
          </defs>
          <g opacity="0.35" fill="url(#onda)">
            <path d="M0 40 q75 -16 150 0 t150 0 t150 0 t150 0 t150 0 t150 0 t150 0 t150 0 t150 0 V90 H0 Z">
              <animateTransform attributeName="transform" type="translate" from="0 0" to="-300 0" dur="7s" repeatCount="indefinite" />
            </path>
          </g>
          <g opacity="0.6" fill="url(#onda)">
            <path d="M0 56 q55 -12 110 0 t110 0 t110 0 t110 0 t110 0 t110 0 t110 0 t110 0 t110 0 t110 0 t110 0 t110 0 V90 H0 Z">
              <animateTransform attributeName="transform" type="translate" from="0 0" to="-220 0" dur="5s" repeatCount="indefinite" />
            </path>
          </g>
        </svg>
      </div>
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
          <span className="lema">feito com energético, bug e teimosia</span>
        </div>
      </footer>
    </>
  );
}
