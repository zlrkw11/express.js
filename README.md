# express.js

this is a repo that records express.js related opeartions and structure

to run 
```bash
npm run start:dev   
```

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

1. `:id` is entered after the specified route
2. get the `params` from the response object that contains all the information
3. parse the `id` to a number and check if it is a valid int
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

Then, destructure the `query params` into whatever we pass into the query, in this case: filter, value

```Javascript
  const {
    query: { filter, value },
  } = request;
```

Then finally we set up the function to filter the `mockUsers` array and get the desired values using the `[]` and `.includes` to grab the right values(value) from the correct fields(filter)

```Javascript
 if (!filter && !value) return response.send(mockUsers);
  if (filter && value)
    // grab the correct field and check if it contains the value we want
    return response.send(
      mockUsers.filter((user) => user[filter].includes(value))
    );
  response.send(mockUsers);
```

## Post request

frontend makes a http request to the server\
send the data via a payload (request body)\
backend takes that data and does certain operations.\
saving that record to database when done and sends back a 201 code(signals the resource is created)

express does not parse json objects by defualt. So, we need to use a middleware to parse them manually:

```Javascript
app.use(express.json());
```

note:

```Javascript
const {body} = req;
```

is short for:

```Javascript
const body = req.body;
```

## Put request

updating the entire record, overwritten everything. (where patch is overwriting partially)

in this case, I have found a user `id` and used the `findIndex` method to find the desired
user from the mockUsers array and then replaced that user with the `request body` as the new user while keeping id the same:

```Javascript
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

```

## Patch request
We basically just destructure both `user` and the request `body` both into the user position we want to **change or update**. This allows for only certain fields (key-value pairs) to be updated but not replacing the object entirely.

```Javascript
app.patch("/api/users/:id", (req, res)=>{
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
  // override the old user object with the key value pairs in the request body
  mockUsers[findUserIndex] = {...mockUsers[findUserIndex], ...body};
})
```

## Delete request
- retrieve a user from req.params.id
- make ````parsedId```
- check if id is valid
- try finding the user 
- if not found, return 404
- else splice the user list 

```Javascript
app.delete("/api/users/:id", (req, res) => {
  const {
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) return res.sendStatus(404);
  mockUsers.splice(findUserIndex, 1);
  return res.sendStatus(200);
});
```