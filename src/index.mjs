import express from "express";
import path from "path"
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const mockUsers = [
  { id: 1, username: "a" },
  { id: 2, username: "b" },
];

// localhost:3000
app.listen(PORT, () => {
  console.log(`Running on Port${PORT}`);
});

app.get("/", (request, response) => {
  response.sendFile(path.join(__dirname, '..', "home.html"))
});

// localhost:3000/api/users
app.get("/api/users", (request, response) => {
  response.send(mockUsers);
});

// localhost:3000/api/products
app.get("/api/products", (request, response) => {
  response.send([
    { id: 1, name: "product_1", price: 10 },
    { id: 2, name: "product_2", price: 20 },
  ]);
});

// route parameter
app.get("/api/users/:id", (request, response) => {
  // returns a single user record based on id
  console.log(request.params);
  const parsedId = parseInt(request.params.id);
  console.log(parsedId);
  if (isNaN(parsedId))
    return response.status(400).send("Bad request. Invalid id");
  const findUser = mockUsers.find((user) => user.id == parsedId);
  if (!findUser) return response.status(404);
  return response.send(findUser);
});

// ``````
