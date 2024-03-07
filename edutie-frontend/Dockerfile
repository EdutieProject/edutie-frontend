FROM oven/bun:latest as build-stage

WORKDIR /app
COPY package*.json ./
# Install dependencies
RUN bun install
COPY . .
# Build the application
RUN  bunx --bun vite build

# Production stage
FROM nginx:1.24.0-alpine-slim as production
COPY --from=build-stage /app/dist/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 5173
CMD ["nginx", "-g", "daemon off;"]