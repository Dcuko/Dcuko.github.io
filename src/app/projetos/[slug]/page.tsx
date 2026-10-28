import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Janela } from '@/components/Janela';
import { Mdx } from '@/components/Mdx';
import { BarraStack } from '@/components/BarraStack';
import { listarProjetos, obterProjeto } from '@/lib/projetos';
import { lerStack } from '@/lib/stack';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return listarProjetos().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = obterProjeto(slug);
  if (!p) return {};
  return {
    title: p.titulo,
    description: p.resumo,
    openGraph: { title: p.titulo, description: p.resumo, images: p.capa ? [p.capa] : undefined },
  };
}

export default async function PaginaProjeto({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const todos = listarProjetos();
  const i = todos.findIndex((p) => p.slug === slug);
  if (i < 0) notFound();
  const p = todos[i];
  const proximo = todos.length > 1 ? todos[(i + 1) % todos.length] : undefined;
  const repo = p.links.repositorio;
  const statsRepo = repo ? lerStack().porRepositorio[repo] : undefined;
  const meta: [string, string | undefined][] = [
    ['Tipo', p.tipo],
    ['Situação', p.situacao],
    ['Papel', p.papel],
    ['Cliente', p.cliente],
    ['Duração', p.duracao],
  ];

  return (
    <>
      <section className="proj-topo wrap">
        <Link className="voltar" href="/projetos/">
          ← Todos os projetos
        </Link>
        <p className="rotulo">
          {p.tipo} · {p.situacao}
        </p>
        <h1 className="titulo">{p.titulo}</h1>
        <p className="resumo">{p.resumo}</p>
        <div className="proj-capa">
          <Janela
            grande
            capa={p.capa}
            alt={p.capaAlt}
            titulo={p.titulo}
            endereco={p.links.online?.replace(/^https?:\/\//, '')}
          />
        </div>
        <dl className="meta-grade">
          {meta
            .filter(([, v]) => v)
            .map(([k, v]) => (
              <div key={k}>
                <dt className="rotulo">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
        </dl>
        <div className="proj-links">
          {p.links.online ? (
            <a className="btn" href={p.links.online} target="_blank" rel="noopener noreferrer">
              Acessar o site ↗
            </a>
          ) : (
            <span className="pilula">Sem link público ainda</span>
          )}
          {p.links.extras.map((l) => (
            <a key={l.url} className="btn claro" href={l.url} target="_blank" rel="noopener noreferrer">
              {l.rotulo} ↗
            </a>
          ))}
          {repo && (
            <a className="btn claro" href={`https://github.com/${repo}`} target="_blank" rel="noopener noreferrer">
              Código ↗
            </a>
          )}
          {!repo && <span className="pilula">Código privado</span>}
        </div>
      </section>

      <section className="wrap proj-corpo">
        <Mdx source={p.corpo} />
        {p.stack_manual.length > 0 && (
          <div style={{ marginTop: 'clamp(28px,4vw,56px)' }}>
            <p className="rotulo bloco-titulo">Tecnologias</p>
            <ul className="stack-pilulas">
              {p.stack_manual.map((t) => (
                <li key={t} className="pilula">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        )}
        {statsRepo && (
          <div style={{ marginTop: 'clamp(28px,4vw,56px)' }}>
            <p className="rotulo bloco-titulo">Linguagens do repositório</p>
            <BarraStack itens={statsRepo} tema="claro" />
          </div>
        )}
      </section>

      {proximo && (
        <section className="prox">
          <div className="wrap">
            <Link href={`/projetos/${proximo.slug}/`}>
              <p className="rotulo">Próximo projeto →</p>
              <h2 className="titulo">{proximo.titulo}</h2>
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
