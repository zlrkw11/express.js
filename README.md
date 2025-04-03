# express.js
this is a repo that records express.js related opeartions and structure

## Routes set up

A route is made up of a **route** and a **request handler**:
```JavaScript
app.get("/", (request, response) => {
  response.status(201).send("Hello World!");
});
```

## Route parameters
**dynamic data** based on the route
```Javascript
console.log(request.params);
```
```Javascript
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
```
1. ```:id``` is entered after the specified route
2. get the ```params``` from the response object that contains all the information
3. parse the ```id``` to a number and check if it is a valid int
4. if yes, find the user using the id from the database
5. if not found, return 404
6. otherwise return user object

## Query Parameters
```Javascript
localhost:3000/products?key=value&key2=value2
```
**usage**
- send data across pages (client -> server)

To see the request's query parameters (which contains the parameters we
want to request the server to do):
```Javascript
console.log(request.query);
```

Then, destructure the ```query params``` into whatever we pass into the query, in this case: filter, value

```Javascript
  const {
    query: { filter, value },
  } = request;
```
