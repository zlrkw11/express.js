import express from "express";
import {
  query,
  body,
  validationResult,
  matchedData,
  checkSchema,
} from "express-validator";
import path from "path";
import { fileURLToPath } from "url";
import { mockUsers } from "./utils/constants.mjs";
import { createUserValidationSchema } from "./utils/validationSchemas.mjs";
import userRouter from "./routes/user.mjs";

const app = express();
app.use(express.json());
app.use(userRouter);

const loggingMiddleware = (req, res, next) => {
  console.log(`${req.method} - ${req.url}`);
  next();
};

const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "..", "public")));

// localhost:3000
app.listen(PORT, () => {
  console.log(`Running on Port${PORT}`);
});

app.get("/", loggingMiddleware, (request, response) => {
  response.sendFile(path.join(__dirname, "..", "public", "home.html"));
});

// localhost:3000/api/products
app.get("/api/products", (request, response) => {
  response.send([
    { id: 1, name: "product_1", price: 10 },
    { id: 2, name: "product_2", price: 20 },
  ]);
});

// delete
