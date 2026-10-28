import { z } from 'zod';

// Todo projeto (content/projetos/<slug>/index.mdx) precisa passar por este molde.
// Se faltar um campo obrigatório, o build falha dizendo qual e em qual arquivo.
export const projetoSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/, 'use só letras minúsculas, números e hífen'),
  titulo: z.string().min(1),
  resumo: z.string().min(1).max(220),
  tipo: z.string().min(1), // ex.: "Sistema web", "Site", "App"
  situacao: z.string().min(1), // ex.: "No ar", "Em andamento"
  cliente: z.string().optional(),
  papel: z.string().default('Desenvolvimento'),
  duracao: z.string().optional(),
  status: z.enum(['publicado', 'rascunho']).default('publicado'),
  destaque: z.boolean().default(false),
  ordem: z.number().default(99),
  capa: z.string().optional(), // caminho em public/, ex.: /projetos/x/capa.png
  capaAlt: z.string().default(''),
  links: z
    .object({
      online: z.string().url().optional(),
      repositorio: z.string().optional(), // "usuario/repo" (opcional)
      extras: z.array(z.object({ rotulo: z.string(), url: z.string().url() })).default([]),
    })
    .default({ extras: [] }),
  stack_manual: z.array(z.string()).default([]),
});

export type ProjetoMeta = z.infer<typeof projetoSchema>;
