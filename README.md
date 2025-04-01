# express.js
this is a repo that records express.js related opeartions and structure

## Routes set up

A route is made up of a **route** and a **request handler**:
```JavaScript
app.get("/", (request, response) => {
  response.status(201).send("Hello World!");
});
```
