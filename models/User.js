import mongoose, { Schema } from "mongoose";
import isEmail from "validator/lib/isEmail.js";

export default mongoose.model(
  "User",
  new Schema({
    id: {
      type: Schema.Types.ObjectId,
    },
    name: {
      type: String,
      required: true,
      validate: {
        validator: (value) => value.length > 0,
        message: "Name cannot be empty",
      },
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: (value) => isEmail(value),
        message: "Email is incorrect",
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: (value) => value.length >= 6,
        message: "Password must be at least 6 characters long",
      },
    },
    phoneNumber: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },
  })
);
