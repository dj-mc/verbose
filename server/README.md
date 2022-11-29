# verbose-server

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
