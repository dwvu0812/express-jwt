import { print, OutputType } from "../helpers/print.js";
import { User } from "../models/index.js";
import Exception from "../exceptions/Exception.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const login = async ({ email, password }) => {
  // print(`Login user in repositories`, OutputType.INFORMATION);
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (isMatch) {
      // create jwt
      const jwtToken = jwt.sign(
        { data: existingUser },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      return {
        ...existingUser.toObject(),
        password: "Not show",
        token: jwtToken,
      };
    } else {
      throw new Exception(Exception.WRONG_EMAIL_OR_PASSWORD);
    }
  } else {
    throw new Exception(Exception.WRONG_EMAIL_OR_PASSWORD);
  }
};

const register = async ({ email, name, password, phoneNumber, address }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Exception(Exception.USER_EXISTS);
  }
  // hash password
  const hashedPassword = await bcrypt.hash(
    password,
    parseInt(process.env.SALT)
  );
  // insert to db
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    phoneNumber,
    address,
  });
  return { ...user._doc, password: "Not show" };
};

export default { login, register };
