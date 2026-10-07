FROM node:22-alpine
WORKDIR /app
COPY package.json bun.lock ./
RUN npm install
COPY . .
ENV NITRO_PRESET=node-server
RUN npm run build
ENV NODE_ENV=production PORT=3000 HOST=0.0.0.0
CMD ["node", ".output/server/index.mjs"]
