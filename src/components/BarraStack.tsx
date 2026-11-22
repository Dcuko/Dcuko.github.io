import type { Linguagem } from '@/lib/stack';

const CORES = ['#ff3340', '#f2f2ee', '#a9a9b2', '#6c6c76', '#43434b', '#2b2b31'];

export function BarraStack({ itens }: { itens: Linguagem[]; tema?: 'escuro' | 'claro' }) {
  const cor = (i: number) => CORES[i % CORES.length];
  return (
    <>
      <div
        className="stack-barra"
        role="img"
        aria-label={itens.map((l) => `${l.nome} ${l.pct}%`).join(', ')}
      >
        {itens.map((l, i) => (
          <i key={l.nome} style={{ width: `${l.pct}%`, background: cor(i) }} />
        ))}
      </div>
      <ul className="stack-legenda">
        {itens.map((l, i) => (
          <li key={l.nome} style={{ '--cor': cor(i) } as React.CSSProperties}>
            <span className="cor" style={{ background: cor(i) }} aria-hidden="true" />
            <span className="lang">{l.nome}</span>
            <span className="pct">{l.pct.toFixed(1).replace('.', ',')}%</span>
          </li>
        ))}
      </ul>
    </>
  );
}
