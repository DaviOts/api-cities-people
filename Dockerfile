FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN yarn install

COPY . .

RUN yarn run build

FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
RUN yarn install --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/knexfile.ts ./knexfile.ts
COPY --from=builder /app/database ./database

EXPOSE 3333

CMD ["node", "dist/index.js"]
