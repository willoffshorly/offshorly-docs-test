# PrismaClient

## Installation

```sh
npm install @prisma/client
```

## Usage

Prisma Client is a type-safe database client that's generated from your Prisma model definition.

```js
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // insert prisma query
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
```
