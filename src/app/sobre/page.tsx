import type { Metadata } from 'next';
import Link from 'next/link';
import { BarraStack } from '@/components/BarraStack';
import { lerStack } from '@/lib/stack';
import { site } from '@/site.config';

export const metadata: Metadata = {
  title: 'Sobre',
  description: `${site.nome}, ${site.cargo.toLowerCase()}.`,
};

export default function Sobre() {
  const stack = lerStack();
  return (
    <>
      <div className="wrap">
        <div className="pagina-topo">
          <p className="rotulo">Quem faz</p>
          <h1 className="titulo">Sobre</h1>
        </div>
        <div className="duas-colunas">
          <div className="prosa">
            <p>
              Sou {site.nome}, programador desde {site.desde}. Faço sistemas de ponta a ponta: do MVP até a
              entrega final.
            </p>
            <p>
              Também desenvolvo pequenas soluções e, no tempo livre, faço joguinhos.
            </p>
            <p>
              Uso IA como <strong>ferramenta de apoio</strong>, não pra fazer tudo. O que ela fizer, eu
              preciso saber como foi feito e por quê.
            </p>
            <p>
              <Link href="/contato/">Tem um projeto? Fala comigo.</Link>
            </p>
          </div>
          <ul className="sobre-lista">
            <li>
              <span>Nome</span>
              <span>{site.nome}</span>
            </li>
            <li>
              <span>Desde</span>
              <span>{site.desde}</span>
            </li>
            <li>
              <span>Atuação</span>
              <span>Ponta a ponta</span>
            </li>
            <li>
              <span>GitHub</span>
              <a href={`https://github.com/${site.github}`} target="_blank" rel="noopener noreferrer">
                @{site.github}
              </a>
            </li>
            <li>
              <span>E-mail</span>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            {site.linkedin && (
              <li>
                <span>LinkedIn</span>
                <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
                  Perfil
                </a>
              </li>
            )}
            {site.curriculo && (
              <li>
                <span>Currículo</span>
                <a href={site.curriculo}>Baixar PDF</a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <section className="faixa-stack secao" aria-labelledby="t-stack-sobre">
        <div className="wrap">
          <div className="secao-topo">
            <h2 id="t-stack-sobre" className="titulo">
              Stack
            </h2>
            <p className="rotulo">{stack.totalRepos} repositórios</p>
          </div>
          <BarraStack itens={stack.linguagens} />
        </div>
      </section>
    </>
  );
}
