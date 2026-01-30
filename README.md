huyen.ntt239131@sis.hust.edu.vn

# Command:

- Start
  docker compose -f docker-compose.local.yaml up -d --build

- Delete to restart
  docker compose -f docker-compose.local.yaml down -v
  docker volume prune -f
  docker network prune -f
