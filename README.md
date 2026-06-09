# Clube do Album Social API

API responsavel pelas relacoes sociais da plataforma Clube do Album.

## Responsabilidade

- Seguir usuarios.
- Deixar de seguir usuarios.
- Listar seguidores e usuarios seguidos.
- Publicar o evento `USER_FOLLOWED` no RabbitMQ.

## Tecnologias usadas

- Node.js
- TypeScript
- Express
- Prisma
- PostgreSQL
- RabbitMQ

## Variaveis de ambiente

Crie um arquivo local a partir do exemplo:

```bash
cp .env.example .env
```

Principais variaveis:

```env
PORT=3004
DATABASE_URL=postgresql://clube:clube@localhost:5432/clube_do_album_social
RABBITMQ_URL=amqp://clube:clube@localhost:5672
RABBITMQ_EXCHANGE=clube-do-album.events
```

O banco usado por este servico e:

```text
clube_do_album_social
```

## Banco de dados

Execute as migrations do Prisma:

```bash
npx prisma migrate dev
```

Gerar client Prisma, caso necessario:

```bash
npx prisma generate
```

## Como rodar localmente

```bash
npm install
npm run dev
```

Endpoint inicial:

```http
GET /health
```

## Endpoints

As rotas esperam o header `X-User-Id`, enviado pelo Gateway apos validar o JWT.

Seguir usuario:

```http
POST /follows/:userId
```

Deixar de seguir:

```http
DELETE /follows/:userId
```

Listar quem o usuario autenticado segue:

```http
GET /follows/following
```

Listar seguidores do usuario autenticado:

```http
GET /follows/followers
```

## Evento publicado

Exchange:

```text
clube-do-album.events
```

Routing key:

```text
user.followed
```

Payload:

```json
{
  "event": "USER_FOLLOWED",
  "followerId": "uuid-do-seguidor",
  "followedId": "uuid-do-seguido",
  "occurredAt": "2026-05-31T18:00:00.000Z"
}
```

## Docker

Build da imagem:

```bash
docker build -t clube-do-album-social-api .
```

Execucao local:

```bash
docker run --rm --name clube-do-album-social-api \
  --network clube-do-album-network \
  --env-file .env \
  -e DATABASE_URL=postgresql://clube:clube@clube-do-album-postgres:5432/clube_do_album_social \
  -e RABBITMQ_URL=amqp://clube:clube@clube-do-album-rabbitmq:5672 \
  -p 3004:3004 \
  clube-do-album-social-api
```
