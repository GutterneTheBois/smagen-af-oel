# Prisma

Prisma ORM for models and relations defined in "schema.prisma"
Using postgres is default.

Info can be found here: [Prisma Docs](https://www.prisma.io/docs)

<br>

Uploading schema: `npx prisma db push`

Alt: `yarn db:init` <- This will push and generate at once.

<br>

Open prisma studio: `npx prisma studio`

Alt: `yarn db:studio`

<br>

Create migration file: `npx prisma migrate dev --name <MIGRATION_NAME>`

<br>

Update migrations: `npx prisma generate`
