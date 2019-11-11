FROM node:latest AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run-script build

FROM node:latest AS worker
WORKDIR /app
COPY --from=builder /app .
RUN yarn global add serve
EXPOSE 5000
ENTRYPOINT ["serve", "-s", "build"]