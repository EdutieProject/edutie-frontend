FROM node:17.0.1-alpine3.14 as build-stage

WORKDIR /app
COPY edutie-frontend/package*.json ./
RUN npm install
COPY . .
RUN cd edutie-frontend && npx tailwindcss -i ./src/index.css -o ./dist/output.css && npm run build

# Production stage
FROM nginx:alpine as production
COPY --from=build /app/edutie-frontend/dist/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 5173
# EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]