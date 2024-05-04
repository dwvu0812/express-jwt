import { print, OutputType } from "../helpers/print.js";

export default class Exception extends Error {
  static CANNOT_CONNECT_DB = "Cannot connect to database";
  static USER_EXISTS = "User already exists";
  static CANNOT_REGISTER_USER = "Cannot register user";
  static WRONG_EMAIL_OR_PASSWORD = "Wrong email or password";
  constructor(message) {
    super(message);
    print(message, OutputType.ERROR);
  }
}
