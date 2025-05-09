import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import routes from "./routes/index.mjs";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(routes);

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

// app.get("/", loggingMiddleware, (request, response) => {
//   response.sendFile(path.join(__dirname, "..", "public", "home.html"));
// });

app.get("/", (req, res) => {
  res.cookie("hello", "world", { maxAge: 60000 * 10 });
  res.status(201).send({ msg: "hello" });
});
