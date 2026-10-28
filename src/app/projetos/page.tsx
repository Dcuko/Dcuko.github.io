import type { Metadata } from 'next';
import { ListaProjetos } from '@/components/ListaProjetos';
import { listarProjetos } from '@/lib/projetos';

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
      <div style={{ paddingBottom: 'clamp(48px,7vw,100px)' }}>
        <ListaProjetos projetos={listarProjetos()} />
      </div>
    </div>
  );
}
