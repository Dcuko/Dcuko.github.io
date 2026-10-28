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
              Sou {site.nome}, {site.cargo.toLowerCase()}. Cuido do projeto inteiro: modelagem do banco,
              API, telas e o deploy.
            </p>
            <p>
              Hoje trabalho em dois produtos para academias: o <strong>Perimo Fit</strong>, de avaliação
              física, e o <strong>Perimo Access</strong>, que cuida de mensalidade, catraca e financeiro.
              Nos dois a regra é a mesma: software que o dono da academia consegue usar sem treinamento.
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
              <span>Atuação</span>
              <span>Full stack</span>
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
          {stack.exemplo && <span className="pilula rosa stack-exemplo">Dados de exemplo</span>}
          <BarraStack itens={stack.linguagens} />
        </div>
      </section>
    </>
  );
}
