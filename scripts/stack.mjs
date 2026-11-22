// Lê o GitHub e grava dois arquivos em public/:
//   stack.json  percentual de linguagens (só números; nada de repositório privado sai daqui)
//   repos.json  repositórios públicos para a seção "Código aberto"
//
// Funciona sem token (só repositórios públicos, 60 requisições/h).
// Com STACK_TOKEN (fine-grained, somente leitura) o gráfico de linguagens inclui também os privados.
// Uso: node scripts/stack.mjs
import fs from 'node:fs';
import path from 'node:path';

const cfg = JSON.parse(fs.readFileSync('github.config.json', 'utf8'));
const privado = process.env.STACK_TOKEN;
const token = privado || process.env.GITHUB_TOKEN;
const incluiPrivados = Boolean(privado) && cfg.incluirPrivados;

const H = { Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' };
if (token) H.Authorization = `Bearer ${token}`;

async function get(url, headers = H) {
  const r = await fetch(url, { headers });
  if (!r.ok) throw new Error(`${r.status} em ${url}`);
  return r;
}

async function repos() {
  const base = incluiPrivados
    ? `https://api.github.com/user/repos?affiliation=owner&visibility=all`
    : `https://api.github.com/users/${cfg.usuario}/repos?type=owner`;
  const todos = [];
  for (let p = 1; ; p++) {
    const lote = await (await get(`${base}&per_page=100&page=${p}`)).json();
    todos.push(...lote);
    if (lote.length < 100) break;
  }
  return todos.filter(
    (r) => !r.fork && !r.archived && r.owner.login === cfg.usuario && !cfg.ignorarRepos.includes(r.name),
  );
}

function percentuais(bytes, limite) {
  const total = Object.values(bytes).reduce((a, b) => a + b, 0);
  if (!total) return [];
  let lista = Object.entries(bytes).sort((a, b) => b[1] - a[1]);
  // o que passa do limite, ou fica abaixo de 1%, entra em "Outras"
  const fica = lista.filter(([, v], i) => (!limite || i < limite) && v / total >= 0.01);
  const resto = total - fica.reduce((a, [, v]) => a + v, 0);
  lista = resto > 0 ? [...fica, ['Outras', resto]] : fica;
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

/** Primeiro parágrafo "de verdade" do README, sem markdown, com até ~200 caracteres. */
function resumoReadme(md) {
  const paragrafos = [];
  let atual = [];
  let cerca = false;
  const fecha = () => {
    if (atual.length) paragrafos.push(atual.join(' '));
    atual = [];
  };
  for (const bruta of md.replace(/\r/g, '').split('\n')) {
    const l = bruta.trim();
    if (l.startsWith('```')) {
      cerca = !cerca;
      fecha();
      continue;
    }
    const pula = cerca || /^(#|!\[|<|\||>|[-*+] |\d+\. |-{3,})/.test(l) || /README[^)\s]*\.md/i.test(l);
    if (!l || pula) {
      fecha();
      continue;
    }
    atual.push(l);
  }
  fecha();
  const limpo = (paragrafos.find((p) => p.length >= 40) ?? '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (!limpo) return '';
  let saida = '';
  for (const frase of limpo.split(/(?<=[.!?])\s+/)) {
    if (saida && (saida + ' ' + frase).length > 200) break;
    saida += (saida ? ' ' : '') + frase;
  }
  saida = saida.trim();
  return saida.length > 220 ? saida.slice(0, 200).replace(/\s+\S*$/, '') + '…' : saida;
}

async function descricao(r) {
  if (r.description) return r.description.trim();
  try {
    const md = await (await get(`${r.url}/readme`, { ...H, Accept: 'application/vnd.github.raw+json' })).text();
    return resumoReadme(md);
  } catch {
    return '';
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
const abertos = [];
for (const r of lista) {
  const langs = await (await get(r.languages_url)).json();
  somar(geral, langs);
  if (citados.has(r.full_name)) {
    const b = {};
    somar(b, langs);
    porRepositorio[r.full_name] = percentuais(b, 5);
  }
  if (!r.private) {
    abertos.push({
      nome: r.name,
      descricao: await descricao(r),
      linguagem: cfg.agrupar[r.language] ?? r.language ?? null,
      url: r.html_url,
      site: r.homepage || null,
      estrelas: r.stargazers_count,
      atualizadoEm: r.pushed_at,
    });
  }
}
abertos.sort((a, b) => b.atualizadoEm.localeCompare(a.atualizadoEm));

const linguagens = percentuais(geral, cfg.quantasMostrar);
if (!linguagens.length) {
  console.error('Nenhuma linguagem encontrada. Não vou sobrescrever os arquivos.');
  process.exit(1);
}
const agora = new Date().toISOString();
fs.writeFileSync(
  'public/stack.json',
  JSON.stringify({ atualizadoEm: agora, totalRepos: lista.length, incluiPrivados, linguagens, porRepositorio }, null, 2) + '\n',
);
fs.writeFileSync('public/repos.json', JSON.stringify({ atualizadoEm: agora, repos: abertos }, null, 2) + '\n');
console.log(`OK: ${lista.length} repositórios (${abertos.length} abertos)`, linguagens);
