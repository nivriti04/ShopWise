import { isValidObjectId } from "mongoose";

// will check if the `req.params.id` is a valid Mongoose ObjectId and throw an error if it is not.
function checkObjectId(req, res, next) {
  if (!isValidObjectId(req.params.id)) {
    res.status(404);
    throw new Error(`Invalid ObjectId of:  ${req.params.id}`);
  }
  next();
}

export default checkObjectId;
