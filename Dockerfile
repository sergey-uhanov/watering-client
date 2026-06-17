FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
COPY .env .env
RUN npm run build
CMD ["npm", "run", "preview" ]


