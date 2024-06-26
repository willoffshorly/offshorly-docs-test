# Pagination

Pagination in Prisma is done in two (2) ways: `cursor-based` and `seek-based`:

## cursor-based pagination

Cursor-based pagination uses a cursor value to check what that last fetch data item is. It's pros are that it scales and is useful for infinite scrolling. But the cons is that it cannot skip to the middle bulk of the data.

```js
const pageSize = 4 // number of items per page
const myCursor = 52 // starting cursor

const firstPage = await prisma.post.findMany({
  take: pageSize, // fetch the first page of size `pageSize`
  cursor: { id: myCursor }, // start fetching from the item with ID `myCursor`
  where: {
    title: {
      contains: 'Prisma', // optional filter
    },
  },
  orderBy: { id: 'asc' }, // optional sorting
})
```

```js
const lastItemInFirstPage = firstPage[firstPage.length - 1]
const nextCursor = lastItemInFirstPage.id

const secondPage = await prisma.post.findMany({
  take: pageSize, // fetch the second page of size `pageSize`
  cursor: { id: nextCursor }, // start fetching from the next item after the last item in the previous page
  where: {
    title: {
      contains: 'Prisma', // optional filter
    },
  },
  orderBy: { id: 'asc' }, // optional sorting
})
```

## seek-based pagination

Seek-based pagination uses a unique identifier (foreign key) for the data to fetch the next set of results.

```js
const chunkSize = 10 // number of items per chunk
const lastItemId = 50 // unique identifier of the last item in the previous chunk

const middleChunk = await prisma.myModel.findMany({
  take: chunkSize, // fetch the next chunk of size `chunkSize`
  skip: 1, // skip the first item (since it's included in the previous chunk)
  orderBy: { id: 'asc' }, // order the items by their unique identifier
  after: { id: lastItemId }, // start fetching from the item with ID `lastItemId`
})
```
