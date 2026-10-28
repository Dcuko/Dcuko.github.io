import { Janela } from '../Janela';

// Cada bloco é um componente. Para criar um novo: escreva aqui, exporte em `blocos`
// e use no .mdx como <MeuBloco />. Nada mais precisa mudar.

export function Texto({ children }: { children: React.ReactNode }) {
  return <div className="prosa">{children}</div>;
}

export function Titulo({ children }: { children: React.ReactNode }) {
  return <h2 className="titulo">{children}</h2>;
}

type Foto = { src: string; alt?: string; legenda?: string; titulo?: string };
export function Galeria({ fotos }: { fotos: Foto[] }) {
  return (
    <div className="bloco-galeria">
      {fotos.map((f) => (
        <figure key={f.src}>
          <Janela capa={f.src} alt={f.alt ?? ''} titulo={f.titulo ?? 'tela'} />
          {f.legenda && <figcaption>{f.legenda}</figcaption>}
        </figure>
      ))}
    </div>
  );
}

export function Video({ youtube, src, titulo = 'Vídeo do projeto' }: { youtube?: string; src?: string; titulo?: string }) {
  return (
    <div className="bloco-video">
      {youtube ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtube}`}
          title={titulo}
          loading="lazy"
          allowFullScreen
        />
      ) : (
        <video src={src} controls preload="metadata" aria-label={titulo} />
      )}
    </div>
  );
}

export function Codigo({ arquivo, children }: { arquivo?: string; children: React.ReactNode }) {
  return (
    <div className="bloco-codigo">
      {arquivo && <div className="rotulo">{arquivo}</div>}
      <pre>
        <code>{children}</code>
      </pre>
    </div>
  );
}

type Metrica = { valor: string; sufixo?: string; legenda: string };
export function Metricas({ itens }: { itens: Metrica[] }) {
  return (
    <div className="metricas">
      {itens.map((m) => (
        <div key={m.legenda}>
          <div className="valor">
            {m.valor}
            {m.sufixo && <em>{m.sufixo}</em>}
          </div>
          <div className="legenda">{m.legenda}</div>
        </div>
      ))}
    </div>
  );
}

export function Depoimento({ autor, children }: { autor: string; children: React.ReactNode }) {
  return (
    <figure className="depoimento" style={{ margin: 0 }}>
      <blockquote>{children}</blockquote>
      <footer>— {autor}</footer>
    </figure>
  );
}

export function Stack({ itens }: { itens: string[] }) {
  return (
    <div>
      <p className="rotulo bloco-titulo">Tecnologias</p>
      <ul className="stack-pilulas">
        {itens.map((i) => (
          <li key={i} className="pilula">
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

type LinkItem = { rotulo: string; url: string };
export function Links({ itens }: { itens: LinkItem[] }) {
  return (
    <div className="lista-links">
      {itens.map((l) => (
        <a key={l.url} className="btn claro" href={l.url} target="_blank" rel="noopener noreferrer">
          {l.rotulo} ↗
        </a>
      ))}
    </div>
  );
}

export const blocos = { Texto, Titulo, Galeria, Video, Codigo, Metricas, Depoimento, Stack, Links };
