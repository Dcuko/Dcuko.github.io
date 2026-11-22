import type { Metadata } from 'next';
import { ListaProjetos } from '@/components/ListaProjetos';
import { ListaRepos } from '@/components/ListaRepos';
import { listarProjetos } from '@/lib/projetos';
import { lerRepos } from '@/lib/repos';

export const metadata: Metadata = {
  title: 'Projetos',
  description: 'Sistemas e sites que desenvolvi, do desenho ao deploy.',
};

export default function Projetos() {
  return (
    <div className="wrap">
      <div className="pagina-topo">
        <p className="rotulo">Trabalhos</p>
        <h1 className="titulo">Projetos</h1>
      </div>
      <div style={{ paddingBottom: 'clamp(32px,5vw,64px)' }}>
        <ListaProjetos projetos={listarProjetos()} />
      </div>
      <section id="abertos" aria-labelledby="t-abertos" style={{ paddingBottom: 'clamp(48px,7vw,100px)' }}>
        <div className="secao-topo">
          <h2 id="t-abertos" className="titulo">
            Código aberto
          </h2>
          <p className="rotulo">Direto do GitHub</p>
        </div>
        <ListaRepos repos={lerRepos().repos} />
      </section>
    </div>
  );
}
