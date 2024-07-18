# zod validation

zod is a TypeScript-first schema declaration and validation library.

[read more](https://zod.dev/)

```js
import { z } from 'zod'

// creating a schema for strings
const mySchema = z.string()

// parsing
mySchema.parse('tuna') // => "tuna"
mySchema.parse(12) // => throws ZodError

// "safe" parsing (doesn't throw error if validation failes)
mySchema.safeParse('tuna') // => { success: true; data: "tuna" }
mySchema.safeParse(12) // => { success: false; error: ZodError }
```

We can define the schema as an object like this:

<!--snippet-->
<!--title: Define object-->
<!--descr: We can define the schema as an object like this-->

```js
// all properties are required by default
const Dog = z.object({ name: z.string(), age: z.number(), });

// extract the inferred type like this
type Dog = z.infer<typeof Dog>;

// equivalent to:
type Dog = { name: string; age: number; };
```

<!--/snippet-->
