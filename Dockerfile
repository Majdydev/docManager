FROM node:20-alpine

WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm ci --omit=dev

# Copy source
COPY . .

RUN npx prisma generate || true

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", ".next/standalone/server.js"]
