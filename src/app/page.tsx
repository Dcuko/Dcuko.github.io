import Link from 'next/link';
import { Janela } from '@/components/Janela';
import { ListaProjetos } from '@/components/ListaProjetos';
import { BarraStack } from '@/components/BarraStack';
import { listarProjetos } from '@/lib/projetos';
import { lerStack, formatarData } from '@/lib/stack';
import { site } from '@/site.config';

export default function Home() {
  const projetos = listarProjetos();
  const destaque = projetos.find((p) => p.destaque) ?? projetos[0];
  const hero = projetos.slice(0, 2);
  const stack = lerStack();

  return (
    <>
      <section className="hero">
        <div className="wrap">
          {site.disponivel && (
            <p className="selo-disp rotulo">
              <i aria-hidden="true" /> Aberto pra novos projetos
            </p>
          )}
          <h1 className="titulo">
            <span>Faço</span>
            <span className="l2">software.</span>
          </h1>
          <div className="hero-corpo">
            <div className="hero-texto">
              <p>
                {site.nome}, {site.cargo.toLowerCase()}. Sistemas de ponta a ponta para academias:
                do banco de dados à tela que o cliente usa.
              </p>
              <div className="acoes">
                <Link className="btn" href="/projetos/">
                  Ver projetos
                </Link>
                <Link className="btn claro" href="/contato/">
                  Falar comigo
                </Link>
              </div>
            </div>
            <div className="colagem" aria-hidden={hero.length === 0}>
              {hero[0] && (
                <div className="j1">
                  <Janela capa={hero[0].capa} alt={hero[0].capaAlt} titulo={hero[0].titulo} />
                </div>
              )}
              {hero[1] && (
                <div className="j2">
                  <Janela capa={hero[1].capa} alt={hero[1].capaAlt} titulo={hero[1].titulo} />
                </div>
              )}
              <div className="selo" aria-hidden="true">
                Full
                <br />
                stack
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="secao" id="projetos" aria-labelledby="t-projetos" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="secao-topo">
            <h2 id="t-projetos" className="titulo">
              Projetos
            </h2>
            <Link className="rotulo" href="/projetos/">
              Ver todos →
            </Link>
          </div>
          <ListaProjetos projetos={projetos} />
        </div>
      </section>

      {destaque && (
        <section className="faixa-laranja secao" aria-labelledby="t-destaque">
          <div className="wrap destaque">
            <div>
              <p className="rotulo">Em destaque · {destaque.situacao}</p>
              <h2 id="t-destaque" className="titulo">
                {destaque.titulo}
              </h2>
              <p>{destaque.resumo}</p>
              <Link className="btn preto" href={`/projetos/${destaque.slug}/`}>
                Ver o projeto →
              </Link>
            </div>
            <Janela
              grande
              capa={destaque.capa}
              alt={destaque.capaAlt}
              titulo={destaque.titulo}
              endereco={destaque.links.online?.replace(/^https?:\/\//, '')}
            />
          </div>
        </section>
      )}

      <section className="faixa-preta secao" aria-labelledby="t-stack">
        <div className="wrap">
          <div className="secao-topo">
            <h2 id="t-stack" className="titulo">
              Minha stack
            </h2>
            <p className="rotulo">Direto do GitHub · {stack.totalRepos} repositórios</p>
          </div>
          {stack.exemplo && <span className="pilula laranja stack-exemplo">Dados de exemplo</span>}
          <BarraStack itens={stack.linguagens} />
          <p className="stack-nota">
            Percentual de código por linguagem em todos os meus repositórios, inclusive os privados
            (só os números aparecem aqui, nunca o conteúdo). Atualizado em {formatarData(stack.atualizadoEm)}.
          </p>
        </div>
      </section>
    </>
  );
}
