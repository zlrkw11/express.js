import express from "express";
import { query, validationResult } from "express-validator";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(express.json());

const loggingMiddleware = (req, res, next) => {
  console.log(`${req.method} - ${req.url}`);
  next();
};

const resolveIndexByUserId = (req, res, next) => {
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
  req.findUserIndex = findUserIndex;
  next();
};

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

app.get("/", loggingMiddleware, (request, response) => {
  response.sendFile(path.join(__dirname, "..", "public", "home.html"));
});

// localhost:3000/api/users
app.get(
  "/api/users",
  query("filter")
    .isString()
    .notEmpty()
    .withMessage("Must not be empty")
    .isLength({ min: 3, max: 10 })
    .withMessage("Must be at least 3-10 characters"),
  (request, response) => {
    const result = validationResult(request);
    console.log(result);
    const {
      query: { filter, value },
    } = request;

    if (filter && value)
      // grab the correct field and check if it contains the value we want
      return response.send(
        mockUsers.filter((user) => user[filter].includes(value))
      );

    response.send(mockUsers);
  }
);

// localhost:3000/api/products
app.get("/api/products", (request, response) => {
  response.send([
    { id: 1, name: "product_1", price: 10 },
    { id: 2, name: "product_2", price: 20 },
  ]);
});

// route parameter
app.get("/api/users/:id", resolveIndexByUserId, (request, response) => {
  const { findUserIndex } = request;
  const findUser = mockUsers[findUserIndex];
  if (!findUser) return response.status(404);
  return response.send(findUser);
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
// updating the entire user object
app.put("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req;
  // keep id the same, replace the original object with request body
  mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body };
  return res.sendStatus(200);
});

// patch
app.patch("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req;
  // override the old user object with the key value pairs in the request body
  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
});

// delete
app.delete("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { findUserIndex } = req;
  mockUsers.splice(findUserIndex, 1);
  return res.sendStatus(200);
});
