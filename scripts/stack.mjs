// Calcula o % de linguagens de todos os repositórios (inclusive privados) e grava public/stack.json.
// Uso: STACK_TOKEN=... node scripts/stack.mjs   (token fine-grained, somente leitura)
import fs from 'node:fs';
import path from 'node:path';

const cfg = JSON.parse(fs.readFileSync('github.config.json', 'utf8'));
const token = process.env.STACK_TOKEN;
if (!token) {
  console.error('STACK_TOKEN ausente. Mantendo o public/stack.json atual.');
  process.exit(1);
}
const H = { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' };

async function get(url) {
  const r = await fetch(url, { headers: H });
  if (!r.ok) throw new Error(`${r.status} em ${url}`);
  return r.json();
}

async function repos() {
  const todos = [];
  for (let p = 1; ; p++) {
    const lote = await get(`https://api.github.com/user/repos?per_page=100&page=${p}&affiliation=owner&visibility=${cfg.incluirPrivados ? 'all' : 'public'}`);
    todos.push(...lote);
    if (lote.length < 100) break;
  }
  return todos.filter((r) => !r.fork && !r.archived && r.owner.login === cfg.usuario && !cfg.ignorarRepos.includes(r.name));
}

function percentuais(bytes, limite) {
  const total = Object.values(bytes).reduce((a, b) => a + b, 0);
  if (!total) return [];
  let lista = Object.entries(bytes).sort((a, b) => b[1] - a[1]);
  if (limite && lista.length > limite) {
    const resto = lista.slice(limite).reduce((a, [, v]) => a + v, 0);
    lista = [...lista.slice(0, limite), ['Outras', resto]];
  }
  const pct = lista.map(([nome, v]) => ({ nome, pct: Math.round((v / total) * 1000) / 10 }));
  const dif = Math.round((100 - pct.reduce((a, l) => a + l.pct, 0)) * 10) / 10;
  pct[0].pct = Math.round((pct[0].pct + dif) * 10) / 10; // fecha em 100,0
  return pct;
}

function somar(destino, langs) {
  for (const [k, v] of Object.entries(langs)) {
    if (cfg.linguagensIgnoradas.includes(k)) continue;
    const nome = cfg.agrupar[k] ?? k;
    destino[nome] = (destino[nome] ?? 0) + v;
  }
}

// repositórios citados nos projetos (frontmatter links.repositorio) ganham barra própria
const citados = new Set();
const pasta = 'content/projetos';
for (const d of fs.readdirSync(pasta)) {
  const f = path.join(pasta, d, 'index.mdx');
  if (!fs.existsSync(f)) continue;
  const m = fs.readFileSync(f, 'utf8').match(/^\s*repositorio:\s*(\S+)/m);
  if (m) citados.add(m[1]);
}

const lista = await repos();
const geral = {};
const porRepositorio = {};
for (const r of lista) {
  const langs = await get(r.languages_url);
  somar(geral, langs);
  if (citados.has(r.full_name)) {
    const b = {};
    somar(b, langs);
    porRepositorio[r.full_name] = percentuais(b, 5);
  }
}

const linguagens = percentuais(geral, cfg.quantasMostrar);
if (!linguagens.length) {
  console.error('Nenhuma linguagem encontrada. Não vou sobrescrever o arquivo.');
  process.exit(1);
}
fs.writeFileSync('public/stack.json', JSON.stringify({ atualizadoEm: new Date().toISOString(), totalRepos: lista.length, linguagens, porRepositorio }, null, 2) + '\n');
console.log(`OK: ${lista.length} repositórios`, linguagens);
