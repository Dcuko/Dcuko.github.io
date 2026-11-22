import type { Repo } from '@/lib/repos';

function quando(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric', timeZone: 'UTC' }).replace('.', '');
}

export function ListaRepos({ repos }: { repos: Repo[] }) {
  return (
    <ul className="repos">
      {repos.map((r) => (
        <li key={r.nome}>
          <a className="repo" href={r.url} target="_blank" rel="noopener noreferrer">
            <span className="rotulo">Atualizado em {quando(r.atualizadoEm)}</span>
            <span className="repo-nome titulo">{r.nome}</span>
            {r.descricao && <span className="repo-desc">{r.descricao}</span>}
            <span className="repo-rodape">
              {r.linguagem && <span className="pilula">{r.linguagem}</span>}
              {r.estrelas > 0 && <span className="pilula">★ {r.estrelas}</span>}
              <span className="repo-ir" aria-hidden="true">
                ↗
              </span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
