# How to Create Pagination in Express

Pagination is a technique used to divide a large set of data into smaller, manageable chunks, making it easier to navigate and display.

In an Express application, you can implement pagination by using query parameters to determine which page of data to return. This guide covers the steps for implementing pagination in an Express app using MongoDB as an example.

## Setting Up Your Express Application

### 1. Install Dependencies

First, ensure you have the necessary packages installed. For this example, we’ll use Express and Mongoose:

```bash
npm install express mongoose
```

### 2. Connect to MongoDB

Create a file named db.js to handle the database connection:

```js
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/mydatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});
```

### 3. Define a Mongoose Model

Create a model.js file for your data model:

```js
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
```

### 4. Implement Pagination in Your Route

In your app.js file, set up the route to handle pagination:

```js
const express = require("express");
const app = express();
const Item = require("./model");
require("./db");

app.get("/items", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page
    const skip = (page - 1) * limit;

    const items = await Item.find().skip(skip).limit(limit);
    const totalItems = await Item.countDocuments();
    const totalPages = Math.ceil(totalItems / limit);

    res.json({
      items,
      page,
      totalPages,
      totalItems,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### 5. Test Your Pagination

To test the pagination, you can use a tool like Postman or your browser:

- Request the first page with a limit of 5 items:

```bash
GET http://localhost:3000/items?page=1&limit=5
```

- Request the second page with a limit of 10 items:

```bash
GET http://localhost:3000/items?page=2&limit=10

```

## Conclusion

Pagination helps manage large datasets by dividing them into smaller, more manageable chunks.

In an Express application, you can implement pagination by using query parameters to control the page number and items per page, and by leveraging MongoDB’s skip and limit functions.

This approach ensures that your application remains performant and user-friendly, even with large datasets.
