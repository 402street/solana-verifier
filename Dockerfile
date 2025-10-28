FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --no-audit --no-fund || npm i --no-audit --no-fund
COPY src ./src
COPY .env.example ./
EXPOSE 9090
CMD ["npm", "start"]
