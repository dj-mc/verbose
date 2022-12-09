# verbose-server

## docker images

```bash
docker compose up -d

# Access psql
psql -h localhost -p 5432 -U postgres -d verbose_db
```

In another terminal:

```bash
# Find redis
docker container ls

# Access redis-cli
docker exec -it <CONTAINER ID> redis-cli

# Get all keys
keys *

# Flush all keys
flushall

# Get all hash field values from a user's `contact_id` key
hgetall contact_id:<username>

# Get all (0: first, -1: last) elements from a list
# stored in a user's `contacts` key
lrange contacts:<username> 0 -1

# Delete data stored in a user's `contacts` key
del contacts:<username>
```

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

And `yarn run dev` will set them.
