import { validationResult } from "express-validator";
import { userRepository } from "../repositories/index.js";
import { EventEmitter } from "node:events";
import Exception from "../exceptions/Exception.js";

const myEvent = new EventEmitter();
myEvent.on("event.register.user", (params) => {
  console.log("Event register user", JSON.stringify(params));
});

const login = async (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await userRepository.login({ email, password });
    res.status(200).json({
      message: "POST login users successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "POST login users failed",
      error: error.message,
    });
  }
};

const register = async (req, res) => {
  const { email, name, password, phoneNumber, address } = req.body;

  try {
    const user = await userRepository.register({
      email,
      name,
      password,
      phoneNumber,
      address,
    });
    res.status(201).json({
      message: "POST register users successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "POST register users failed",
      error: error.message,
    });
  }

  // Event Emitters
  myEvent.emit("event.register.user", {
    x: 1,
    y: 2,
  });
};

const getDetailUser = async (req, res) => {
  res.send("GET detail user");
};

const getAllUsers = async (req, res) => {};

export default { login, register, getDetailUser, getAllUsers };
