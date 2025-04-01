import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Running on Port${PORT}`);
});

app.get("/", (request, response) => {
  response.status(201).send("Hello World!");
});

app.get("/api/users", (request, response) => {
  response.send([
    { id: 1, username: "a" },
    { id: 2, username: "b" },
  ]);
});

// localhost:3000
// localhost:3000/users
// localhost:3000/products
// ``````
