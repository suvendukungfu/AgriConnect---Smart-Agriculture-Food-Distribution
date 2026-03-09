FROM node:22-alpine
WORKDIR /app

COPY package.json ./
RUN npm install --omit=dev

COPY . .
RUN npm run build

EXPOSE 4009
CMD ["npm", "run", "start"]
