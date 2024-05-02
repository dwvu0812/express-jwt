import { validationResult } from "express-validator";

const login = async (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  res.send("POST login users");
};

const register = async (req, res) => {
  res.send("POST register users");
};

const getDetailUser = async (req, res) => {
  res.send("GET detail user");
};

const getAllUsers = async (req, res) => {};

export default { login, register, getDetailUser, getAllUsers };
