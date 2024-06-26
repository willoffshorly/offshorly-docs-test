# Setup

Here we have the following steps for setting up a Prisma client and the database migration:

1. Install Prisma

   ```sh
    npm install prisma --save-dev
   ```

2. Setup Prisma

   ```sh
   npx prisma init --datasource-provider mysql
   ```

   This creates a new prisma directory with your Prisma schema 3. Prisma schema

   Define the models for the database.

   Here's an example:

   ```js
    model User {
        id    Int     @id @default(autoincrement())
        email String  @unique
        name  String?
        posts Post[]
      }

      model Post {
        id        Int     @id @default(autoincrement())
        title     String
        content   String?
        published Boolean @default(false)
        author    User    @relation(fields: [authorId], references: [id])
        authorId  Int
      }
   ```

3. Migrate
   Run a migration to create your database tables.

   ```sh
   npx prisma migrate dev --name <name-of-table-migration>
   ```

   Note: the `--name init` flag is for naming the migration file. If this was omitted in the command, the prisma cli will prompt you to name the migration file instead.

4. Install prisma/client

   ```sh
   npm install @prisma/client
   ```

   Prisma Client is a type-safe database client that's *generated* from your Prisma model definition. Because of this approach, Prisma Client can expose CRUD operations that are *tailored* specifically to your models.

5. Re-run prisma generate

   ```sh
   npx prisma generate
   ```

   Keep in mind that the `prisma generate` command should be executed after you make changes to your `schema.prisma` file or when you set up your project for the first time.

6. Migrate table

   ```sh
   npx prisma migrate dev --name <migration_name>
   ```

---

## Resetting migrations

```sh
npx prisma migrate reset
```
