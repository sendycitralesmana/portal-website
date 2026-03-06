#bin/bash
nvm use 22.13.1 -y
bun install
bun run build
docker compose down -v --remove-orphans
docker compose build --no-cache
docker compose up -d
