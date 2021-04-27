# NotSoEasyLOR

Go to server:

```bash
#!/bin/bash
yarn install
npx prisma generate
yarn dev
```

## Debugging

To check the port:

```bash
#!/bin/bash
lsof -i TCP:4000
```

Checking the DB:

```bash
#!/bin/bash
npx prisma studio
```

Clearing DB:

```bash
npx prisma migrate
```

For more info visit  package.json in server & client.
