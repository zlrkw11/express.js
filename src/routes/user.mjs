import { mockUsers } from "../utils/constants.mjs";
import { Router } from "express";
import { query, validationResult } from "express-validator";

const router = Router();

router.get(
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

export default router;
