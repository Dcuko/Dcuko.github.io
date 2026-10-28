# Portfólio · Augusto Neves (Dcuko)

Site estático em Next.js, visual "Quadra". Hospedagem: GitHub Pages.

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
3. Settings > Secrets > Actions: crie `STACK_TOKEN` (token fine-grained, somente leitura, todos os repositórios, permissão Metadata).
4. Sem o token o site publica normalmente, mas o gráfico de stack mostra "Dados de exemplo".
5. Domínio .dev: Settings > Pages > Custom domain, e troque `url` em `site.config.ts`.

Segurança: o `stack.json` só tem percentuais e contagem; nomes de repositórios privados nunca saem.
