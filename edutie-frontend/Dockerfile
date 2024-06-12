FROM oven/bun:latest as dependencies

WORKDIR /app
COPY package*.json ./
# Install dependencies
RUN bun install --only=production

# Build the application

FROM oven/bun:latest as build
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . . 
RUN  bunx --bun vite build


# Production stage
FROM nginx:1.24.0-alpine-slim as production
COPY --from=build /app/dist/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 5173
CMD ["nginx", "-g", "daemon off;"]