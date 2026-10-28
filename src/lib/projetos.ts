import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { projetoSchema, type ProjetoMeta } from './schema';

const PASTA = path.join(process.cwd(), 'content', 'projetos');

export type Projeto = ProjetoMeta & { corpo: string };

function ler(pasta: string): Projeto {
  const arquivo = path.join(PASTA, pasta, 'index.mdx');
  const { data, content } = matter(fs.readFileSync(arquivo, 'utf8'));
  const r = projetoSchema.safeParse(data);
  if (!r.success) {
    const erros = r.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ');
    throw new Error(`Projeto "${pasta}" inválido (${arquivo}): ${erros}`);
  }
  return { ...r.data, corpo: content };
}

/** Projetos publicados, na ordem do campo `ordem`. Pastas que começam com _ são ignoradas (modelo). */
export function listarProjetos(): Projeto[] {
  return fs
    .readdirSync(PASTA, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith('_'))
    .map((d) => ler(d.name))
    .filter((p) => p.status === 'publicado')
    .sort((a, b) => a.ordem - b.ordem);
}

export function obterProjeto(slug: string): Projeto | undefined {
  return listarProjetos().find((p) => p.slug === slug);
}
