# EasyLOR

## Branches

develop - main development branch

LOR-X - feature branch where X is the corresponding ticket number

</br>

## Project Setup

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

## Update your feature branch with remote changes [IMPORTANT]

</br>

#### NEVER PULL CHANGES FROM YOUR REMOTE FEATURE BRANCH

```bash
git pull origin/LOR-25 #DO NOT DO THIS
        #OR
git pull # when you're in a feature branch locally
```

#### DO NOT PUSH TO THE DEVELOP BRANCH

```bash
git push # when you are in develop branch locally
```

#### COMMANDS TO BE USED

```bash
git checkout develop # switching to develop
git pull --rebase # pulling changes from develop
git checkout <feature_branch> # git checkout LOR-24
git rebase develop
## make your changes
git push --force # always do a force push after rebase
```

</br>

## Generating types in server

If server is already running, save the codegen.yml file to regenerate types

</br>

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

For more info visit package.json in server & client.
