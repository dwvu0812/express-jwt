import mongoose, { Schema } from "mongoose";

export default mongoose.model(
  "Klass",
  new Schema({
    id: {
      type: Schema.Types.ObjectId,
    },
    name: {
      type: String,
      required: true,
      validate: {
        validator: (value) => value.length > 0,
        message: "Class name cannot be empty",
      },
    },
  })
);
