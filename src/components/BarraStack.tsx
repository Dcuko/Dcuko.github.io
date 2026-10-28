import type { Linguagem } from '@/lib/stack';

const ESCURO = ['#FF4F1F', '#F2F2F0', '#A8A8A2', '#6A6A66', '#3A3A38', '#222222'];
const CLARO = ['#FF4F1F', '#0A0A0A', '#8A8A85', '#BDBDB7', '#DADAD6', '#EDEDEA'];

export function BarraStack({ itens, tema = 'escuro' }: { itens: Linguagem[]; tema?: 'escuro' | 'claro' }) {
  const cores = tema === 'escuro' ? ESCURO : CLARO;
  const cor = (i: number) => cores[Math.min(i, cores.length - 1)];
  return (
    <>
      <div
        className={`stack-barra ${tema === 'claro' ? 'clara' : ''}`}
        role="img"
        aria-label={itens.map((l) => `${l.nome} ${l.pct}%`).join(', ')}
      >
        {itens.map((l, i) => (
          <i key={l.nome} style={{ width: `${l.pct}%`, background: cor(i) }} />
        ))}
      </div>
      <ul className="stack-legenda">
        {itens.map((l, i) => (
          <li key={l.nome}>
            <span className="cor" style={{ background: cor(i) }} aria-hidden="true" />
            <span className="lang">{l.nome}</span>
            <span className="pct">{l.pct.toFixed(1).replace('.', ',')}%</span>
          </li>
        ))}
      </ul>
    </>
  );
}
