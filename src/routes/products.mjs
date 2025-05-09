import { Router } from "express";

const router = Router();

router.get("/api/products", (request, response) => {
  console.log(request.cookies);
  console.log(request.headers.cookie);
  if (request.cookies.hello && request.cookies.hello == "world") {
    return response.send([
      { id: 1, name: "product_1", price: 10 },
      { id: 2, name: "product_2", price: 20 },
    ]);
  }
  return response
    .status(403)
    .send({ msg: "sorry, you need the correct cookie!" });
});

export default router;
