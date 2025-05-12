import { serialize } from "cookie";
import jwt from "jsonwebtoken";
export const generateToken = (payload: { _id: string; email: string }) => {
  const token = jwt.sign(payload, process.env.SECRET_KEY as string, {
    expiresIn: "7d",
  });
  const cookie = serialize("jwtCrudTask", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
  return cookie;
};
