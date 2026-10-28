import Link from 'next/link';
import type { Projeto } from '@/lib/projetos';
import { Janela } from './Janela';

export function ListaProjetos({ projetos }: { projetos: Projeto[] }) {
  return (
    <ul className="lista">
      {projetos.map((p, i) => (
        <li className="linha" key={p.slug}>
          <Link href={`/projetos/${p.slug}/`}>
            <span className="num">{String(i + 1).padStart(2, '0')}</span>
            <span className="nome titulo">{p.titulo}</span>
            <span className="meta">
              <span className="pilula">{p.tipo}</span>
              <span className={`pilula ${p.situacao === 'No ar' ? 'cheia' : ''}`}>{p.situacao}</span>
            </span>
            <span className="seta" aria-hidden="true">
              →
            </span>
          </Link>
          <div className="previa" aria-hidden="true">
            <Janela capa={p.capa} titulo={p.titulo} />
          </div>
        </li>
      ))}
    </ul>
  );
}
