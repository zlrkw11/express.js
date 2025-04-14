# Validation

```bash
npm i express-validator
```

Can use more validators to keep validating the desired result
```Javascript
app.get("/api/users", query("filter").isString().notEmpty(), (request, response))
```

the validator will check and attach the results onto the request object. 