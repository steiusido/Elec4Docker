FROM node:22-bookworm-slim
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Vite preview default port
EXPOSE 4173

CMD ["npm", "run", "preview", "--", "--port", "4173", "--host"]