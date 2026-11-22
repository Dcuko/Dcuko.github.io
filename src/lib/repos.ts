import fs from 'node:fs';
import path from 'node:path';

export type Repo = {
  nome: string;
  descricao: string;
  linguagem: string | null;
  url: string;
  site: string | null;
  estrelas: number;
  atualizadoEm: string;
};
export type Repos = { atualizadoEm: string; repos: Repo[] };

/** Lê public/repos.json (gerado pelo script scripts/stack.mjs no GitHub Actions). */
export function lerRepos(): Repos {
  const arquivo = path.join(process.cwd(), 'public', 'repos.json');
  return JSON.parse(fs.readFileSync(arquivo, 'utf8')) as Repos;
}
