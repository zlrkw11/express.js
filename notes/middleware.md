# Middleware

Essentially, a middleware is a processing function
```Javascript
(request, response, next) => {}
```

can have as many middlewares as we want as long as we pass in the ```next()``` 
everytime signals the end to keep the function running

```Javascript
app.get("/", (req, res)=>{
    console.log("1");
    next();
}, (req, res)=>{
    console.log("2");
    next();
}, (req, res)=>{
    res.status(201).send({msg: "Hello"})
}
)
```

Must register the middleware before any of the routes that uses the middleware.

in fact:
```Javascript
(request, response)
```
itself is a middleware.

