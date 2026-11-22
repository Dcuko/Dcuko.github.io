import Link from 'next/link';
import { Janela } from '@/components/Janela';
import { ListaProjetos } from '@/components/ListaProjetos';
import { BarraStack } from '@/components/BarraStack';
import { listarProjetos } from '@/lib/projetos';
import { ListaRepos } from '@/components/ListaRepos';
import { lerRepos } from '@/lib/repos';
import { lerStack, formatarData } from '@/lib/stack';
import { site } from '@/site.config';

export default function Home() {
  const projetos = listarProjetos();
  const destaque = projetos.find((p) => p.destaque) ?? projetos[0];
  const hero = projetos.slice(0, 2);
  const stack = lerStack();
  const abertos = lerRepos();

  return (
    <>
      <section className="hero">
        <div className="cena" aria-hidden="true">
          <div className="lamina l4" />
          <div className="lamina l3" />
          <div className="lamina l2" />
          <div className="lamina l1" />
          <span className="gigante">{site.marca}</span>
        </div>
        <div className="wrap">
          <div className="hud" aria-hidden="true">
            <span>
              <b>NV//01</b> portfólio
            </span>
            <span>© {new Date().getFullYear()}</span>
            <span>Rio de Janeiro, BR</span>
          </div>
          {site.disponivel && (
            <p className="selo-disp rotulo">
              <i aria-hidden="true" /> Aberto pra novos projetos
            </p>
          )}
          <p className="prompt" aria-hidden="true">
            &gt; hello, world_
          </p>
          <h1 className="titulo">{site.primeiroNome}</h1>
          <p className="alias">
            aka <b>{site.marca}</b> // programador desde {site.desde}
          </p>
          <div className="hero-corpo">
            <div className="hero-texto">
              <p>
                Faço sistemas de ponta a ponta, do MVP à entrega final. Também crio pequenas soluções e,
                no tempo livre, uns joguinhos.
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
                full
                <br />
                stack
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="secao" id="projetos" aria-labelledby="t-projetos">
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

      <section className="secao" id="abertos" aria-labelledby="t-abertos" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="secao-topo">
            <h2 id="t-abertos" className="titulo">
              Código aberto
            </h2>
            <a className="rotulo" href={`https://github.com/${site.github}`} target="_blank" rel="noopener noreferrer">
              {abertos.repos.length} repositórios no GitHub ↗
            </a>
          </div>
          <ListaRepos repos={abertos.repos} />
        </div>
      </section>

      {destaque && (
        <section className="faixa-destaque secao" aria-labelledby="t-destaque">
          <div className="wrap destaque">
            <div>
              <p className="rotulo">Em destaque · {destaque.situacao}</p>
              <h2 id="t-destaque" className="titulo">
                {destaque.titulo}
              </h2>
              <p>{destaque.resumo}</p>
              <Link className="btn rosa" href={`/projetos/${destaque.slug}/`}>
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

      <section className="secao" aria-labelledby="t-como">
        <div className="wrap">
          <div className="secao-topo">
            <h2 id="t-como" className="titulo">
              Como eu trabalho
            </h2>
          </div>
          <ol className="principios">
            <li>
              <h3 className="titulo">Ponta a ponta</h3>
              <p>
                Programo desde {site.desde}. Levo o sistema inteiro: do MVP até a entrega final.
              </p>
            </li>
            <li>
              <h3 className="titulo">Pequenas soluções</h3>
              <p>
                Também resolvo problemas menores com ferramenta sob medida e, no tempo livre, faço joguinhos.
              </p>
            </li>
            <li>
              <h3 className="titulo">IA é ferramenta</h3>
              <p>
                IA não é pra fazer tudo, é pra ajudar. O que ela fizer, eu preciso saber como foi feito e por quê.
              </p>
            </li>
          </ol>
        </div>
      </section>

      <section className="faixa-stack secao" aria-labelledby="t-stack">
        <div className="wrap">
          <div className="secao-topo">
            <h2 id="t-stack" className="titulo">
              Minha stack
            </h2>
            <p className="rotulo">Direto do GitHub · {stack.totalRepos} repositórios</p>
          </div>
          <BarraStack itens={stack.linguagens} />
          <p className="stack-nota">
            Percentual de código por linguagem nos meus repositórios
            {stack.incluiPrivados ? ', inclusive os privados (só os números aparecem aqui, nunca o conteúdo)' : ' públicos'}.
            Atualiza sozinho todo dia. Última leitura: {formatarData(stack.atualizadoEm)}.
          </p>
        </div>
      </section>
    </>
  );
}
