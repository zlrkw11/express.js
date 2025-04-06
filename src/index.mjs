import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "..", "public")));
const mockUsers = [
  { id: 1, username: "anson" },
  { id: 2, username: "jack" },
  { id: 3, username: "adam" },
  { id: 4, username: "mary" },
  { id: 5, username: "maria" },
];

// localhost:3000
app.listen(PORT, () => {
  console.log(`Running on Port${PORT}`);
});

app.get("/", (request, response) => {
  response.sendFile(path.join(__dirname, "..", "public", "home.html"));
});

// localhost:3000/api/users
app.get("/api/users", (request, response) => {
  console.log(request.query);
  const {
    query: { filter, value },
  } = request;

  if (filter && value)
    // grab the correct field and check if it contains the value we want
    return response.send(
      mockUsers.filter((user) => user[filter].includes(value))
    );

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

// delete a user
app.delete("/api/users/:id", (req, res) => {
  const parsedId = parseInt(req.params.id);
  userIndex = mockUsers.findIndex((user) => user.id == parsedId);
  mockUsers.splice(userIndex, 1);
  res.status(200).send({ message: `user ${parsedId} deleted` });
});

// post
app.post("/api/users", (req, res) => {
  console.log(req.body);
  // assume the request body is a valid user object
  const { body } = req;
  const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...body };
  mockUsers.push(newUser);
  console.log(mockUsers);
  return res.status(200).send(newUser);
});

// put
app.put("/api/users/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  console.log(parsedId);
  if (isNaN(parsedId)) return res.sendStatus(400);
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  // if the user is not found
  if (findUserIndex === -1) return res.sendStatus(404);
  // updating the entire user object
  // keep id the same, replace the original object with request body
  mockUsers[findUserIndex] = { id: parsedId, ...body };
  return res.sendStatus(200);
});
