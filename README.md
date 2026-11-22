# Portfólio · Augusto Neves (Dcuko)

Portfólio de Augusto Neves: site estático em Next.js com estética Neo-Vectorheart, hospedado no GitHub Pages. A stack e os repositórios abertos vêm direto do GitHub e se atualizam todo dia.

## Rodar local
```
npm install
npm run dev      # http://localhost:3000
npm run build    # gera a pasta out/
```

## Adicionar um projeto
1. Copie `content/projetos/_modelo` para `content/projetos/<slug>`.
2. Preencha o cabeçalho e escreva o texto com os blocos (Texto, Titulo, Galeria, Metricas, Depoimento, Video, Codigo, Links).
3. Coloque as imagens em `public/projetos/<slug>/` e `status: publicado`.
Um campo errado derruba o build dizendo qual.

## Novo tipo de bloco
Crie o componente em `src/components/blocos/index.tsx` e inclua no objeto `blocos`.

## Dados pessoais
`src/site.config.ts` (e-mail, LinkedIn, currículo, formulário, selo de disponibilidade).

## Publicar
1. Crie o repositório público `Dcuko.github.io` e suba esta pasta.
2. Settings > Pages > Source: **GitHub Actions**.
3. A stack e a seção "Código aberto" são geradas por `scripts/stack.mjs` a cada push e todo dia às 06:17 UTC (workflow `publicar.yml`). Funciona sem configurar nada, só com os repositórios públicos.
4. Opcional: Settings > Secrets > Actions: crie `STACK_TOKEN` (token fine-grained, somente leitura, todos os repositórios, permissão Metadata) para o gráfico de linguagens contar também os repositórios privados.
5. Domínio .dev: Settings > Pages > Custom domain, e troque `url` em `site.config.ts`.

Segurança: o `stack.json` só tem percentuais e contagem; nomes de repositórios privados nunca saem. O `repos.json` lista apenas repositórios públicos.
