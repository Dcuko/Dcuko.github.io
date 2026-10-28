import type { MetadataRoute } from 'next';
import { listarProjetos } from '@/lib/projetos';
import { site } from '@/site.config';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, '');
  const fixas = ['', '/projetos/', '/sobre/', '/contato/'].map((p) => ({ url: `${base}${p}` }));
  const projetos = listarProjetos().map((p) => ({ url: `${base}/projetos/${p.slug}/` }));
  return [...fixas, ...projetos];
}
