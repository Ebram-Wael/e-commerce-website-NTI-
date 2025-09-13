import jwt from "jsonwebtoken";
import { promisify } from "util";

export const auth = async (req, res, next) => {
  let { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      message: "you must login first",
    });
  }

  try {
    const token = authorization.startsWith("Bearer ")
      ? authorization.split(" ")[1]
      : authorization;
   
    let decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    

    req.role = decode.role;
    req.userId = decode.id;

    next();
  } catch (error) {
    res.status(403).json({
      message: "invaild token",
      error: error.message,
    });
  }
};
