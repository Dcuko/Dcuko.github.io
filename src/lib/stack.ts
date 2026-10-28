import fs from 'node:fs';
import path from 'node:path';

export type Linguagem = { nome: string; pct: number };
export type Stack = {
  exemplo?: boolean;
  atualizadoEm: string;
  totalRepos: number;
  linguagens: Linguagem[];
  porRepositorio: Record<string, Linguagem[]>;
};

/** Lê public/stack.json (gerado pelo script scripts/stack.mjs no GitHub Actions). */
export function lerStack(): Stack {
  const arquivo = path.join(process.cwd(), 'public', 'stack.json');
  return JSON.parse(fs.readFileSync(arquivo, 'utf8')) as Stack;
}

export function formatarData(iso: string): string {
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
