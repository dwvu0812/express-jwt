import jwt from "jsonwebtoken";

export default function checkToken(req, res, next) {
  if (req.url === "/users/login" || req.url === "/users/register") {
    return next();
  }

  if (!req.headers.authorization) {
    return res.status(401).json({
      message: "Unauthorized",
      error: "Token is missing",
    });
  }

  try {
    // other requests, check token
    const token = req.headers.authorization.split(" ")[1];
    const jwtObject = jwt.verify(token, process.env.JWT_SECRET);
    const isExpired = Date.now() >= jwtObject.exp * 1000;
    if (isExpired) {
      return res.status(401).json({
        message: "Unauthorized",
        error: "Token is expired",
      });
    } else {
      return next();
    }
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
      error: error.message,
    });
  }
}
