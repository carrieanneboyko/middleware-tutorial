import { jeopardy } from "../../repos/jeopardy";
import db from "../../db/index";

const jeopardyMiddleware = async (req, res, next) => {
  const { identifier } = req.params;
  const { test } = req.query;
  const repo = test ? jeopardy(db.test) : jeopardy(db.jeopardy);
  try {
    const result = await repo.getCategory(identifier);
    res.send(result);
  } catch (err) {
    next(err);
  }
};

export default jeopardyMiddleware;
