FROM node:14.17.3

ENV BACKEND_HTTP_API_ENDPOINT=https://localhost:3000
ENV BACKEND_SOCKET_ENDPOINT=wss://localhost:3000
ENV BACKEND_SOCKET_PATH=/backend/socket
ENV USER_IDLE_TIMEOUT_MS=600000
ENV HOST_ENV=development
ENV PORT=3000

WORKDIR /srv
COPY ["package.json", "package-lock.json", "./"]
RUN npm i

COPY . .

RUN npm run build

CMD ["npm", "run", "start"]
