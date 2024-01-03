FROM node:18-alpine as builder
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY ./ ./
RUN npm run build

#------------------------------
FROM nginx as production
EXPOSE 8080
COPY --from=builder /app/dist /usr/share/nginx/html