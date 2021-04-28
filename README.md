# EasyLOR


Go to client:

```bash
yarn # to install dependencies
yarn dev # start the server
```

Go to server:

```bash
yarn # to install dependencies
npx prisma generate # types for prisma models
yarn dev # start the server
```

## Generating types in server
If server is already running, save the codegen.yml file to regenerate types

## Debugging

To kill the port if EADDRINUSE error:

```bash
lsof -i TCP:PORT_NUMBER
kill PID
```

Checking the DB:

```bash
npx prisma studio
```

Regenerating DB:

```bash
npx prisma migrate
```

For more info visit  package.json in server & client.
