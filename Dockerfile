FROM node:16-alpine AS builder 
WORKDIR /usr/src/app
COPY ["./package*.json", "./"]
RUN npm install
COPY . .
RUN  npm run build


FROM node:16-alpine 
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/dist ./dist
EXPOSE 3000
CMD ["npm","run", "start:prod"]