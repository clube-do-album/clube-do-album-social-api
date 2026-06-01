# Clube do Album Social API

API responsavel pelas futuras relacoes sociais da plataforma Clube do Album.

## Responsabilidade futura

- Seguir usuarios.
- Deixar de seguir.
- Listar seguidores e seguindo.
- Publicar eventos sociais.

## Tecnologias usadas

- Node.js
- TypeScript
- Express

## Como rodar localmente

```bash
npm install
npm run dev
```

Endpoint inicial:

```http
GET /health
```

Status atual: projeto inicial criado apenas com estrutura base. As funcionalidades serão implementadas nas próximas etapas.

## Docker

Crie um arquivo local de ambiente a partir do exemplo:

```bash
cp .env.example .env
```

Build da imagem:

```bash
docker build -t clube-do-album-social-api .
```

Execucao local:

```bash
docker run --env-file .env -p 3002:3002 clube-do-album-social-api
```
