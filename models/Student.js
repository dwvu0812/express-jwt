import mongoose, { Schema } from "mongoose";
import isEmail from "validator/lib/isEmail.js";

export default mongoose.model(
  "Student",
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
    languages: {
      type: [String],
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female"],
        message: "{VALUE} is not supported.",
      },
      required: true,
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
