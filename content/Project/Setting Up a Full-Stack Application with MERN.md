# Setting Up a Full-Stack Application with MERN

The MERN stack is a popular set of technologies for building modern web applications. It includes MongoDB, Express.js, React, and Node.js.

This guide provides step-by-step instructions for setting up a full-stack application using the MERN stack, covering both the backend and frontend components.

## Prerequisites

Before you start, make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [npm](https://www.npmjs.com/)

## Setting Up the Backend

1. Initialize the Project

    Create a new directory for your project and initialize a Node.js project:

    ```bash
    mkdir my-mern-app
    cd my-mern-app
    mkdir backend
    cd backend
    npm init -y
    ```

### 2. Install Dependencies

Install Express and Mongoose for the backend:

```bash
npm install express mongoose
```

### 3. Create the Server

Create a file named server.js in the backend directory:

```js
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/mydatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### 4. Define a Mongoose Model

Create a file named model.js in the backend directory:

```js
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
```

### 5. Create API Endpoints

Add routes to server.js for CRUD operations:

```js
const Item = require("./model");

// Create a new item
app.post("/items", async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all items
app.get("/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

## Setting Up the Frontend

### 1. Create a React Application

In the root directory of your project, create the React frontend:

```bash
npx create-react-app frontend
cd frontend
```

### 2. Install Axios

Install Axios for making HTTP requests:

```bash
npm install axios
```

### 3. Create a Service to Fetch Data

Create a file named api.js in the src directory:

```js
import axios from "axios";

const API_URL = "http://localhost:5000/items";

export const fetchItems = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createItem = async (item) => {
  const response = await axios.post(API_URL, item);
  return response.data;
};
```

### 4. Build React Components

Update src/App.js to display and add items:

```js
import React, { useState, useEffect } from "react";
import { fetchItems, createItem } from "./api";

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", description: "" });

  useEffect(() => {
    const loadItems = async () => {
      const items = await fetchItems();
      setItems(items);
    };
    loadItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const item = await createItem(newItem);
    setItems([...items, item]);
    setNewItem({ name: "", description: "" });
  };

  return (
    <div className="App">
      <h1>Items</h1>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            {item.name}: {item.description}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newItem.description}
          onChange={(e) =>
            setNewItem({ ...newItem, description: e.target.value })
          }
        />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}

export default App;
```

### 5. Proxy API Requests

Add a proxy setting to frontend/package.json to forward requests to the backend:

```json
"proxy": "http://localhost:5000"
```

## Running the Application

1. Start the backend server:

    ```bash
    cd backend
    node server.js
    ```

2. Start the React development server:

    ```bash
    cd frontend
    npm start
    ```

## Conclusion

The MERN stack provides a powerful and flexible framework for building full-stack applications. By setting up MongoDB, Express.js, React, and Node.js, you can create a modern web application with a robust backend and an interactive frontend.

This guide covers the basic setup and provides a foundation for developing more complex features and functionality.
