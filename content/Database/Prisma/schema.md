# Prisma Schema

Suppose you have two models User and Post. Each post belongs to a user, so you want to define a relation between them.

```js
model User {
  id    Int    @id @default(autoincrement())
  posts Post[]
}

model Post {
  id       Int  @id @default(autoincrement())
  author   User @relation(fields: [authorId], references: [id])
  authorId Int
}
```

## User model

In the `User` model, we define a one-to-many relation with the `Post` model using the posts field. The @relation attribute specifies the relation name as userPosts.

## Post model

In the `Post` model, we define a many-to-one relation with the `User` model using the author field.

The `@relation` attribute with the fields argument specifies that the relation is established using the authorId field in the Post model.

The `references` argument specifies that the relation references the id field in the User model.

---

## Notes

In setting up prisma schema, scalar fields are the ones that appear in queries and tables. @relations are only there to define the relationship between models. This took me a while to understand when doing my exercises

In the example above, we need to take note that in order to establish a 1-n relation between `User` and `Post` , we needed to defined the _Foreign key_ via the relation scalar field of Post.

```js
model Post {
  id       Int  @id @default(autoincrement())
  author   User @relation(fields: [authorId], references: [id])
  authorId Int
}
```

Let's break this code snippet down, `@relation(fields: [authId], reference: [id])`
`@relation` - is the attribute that defines that this field as a relation scalar field
`fields` - is the first argument that points to the scalar field authorId which gives our author an id value. authorId - being a scalar field - does not appear in the database
`references` - is the second argument that points the the referenced column in the User entity
