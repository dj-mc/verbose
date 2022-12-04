# verbose-server

## environment

For production:  
Set these environment variables via CLI.

```
PRODUCTION=true
SESSION_SECRET=<secret>
```

For development:  
You may instead create a .env file.

```environment
PRODUCTION=false
SESSION_SECRET=<secret>
```

`yarn run dev` will set them.

## docker images

`docker compose up -d`

Access psql:  
`psql -h localhost -p 5432 -U postgres -d verbose_db`

Access redis-cli:  
`docker exec -it <CONTAINER ID> redis-cli`
