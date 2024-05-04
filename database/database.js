import mongoose from "mongoose";
import { OutputType, print } from "../helpers/print.js";
import Exception from "../exceptions/Exception.js";

async function connect() {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    print("Connect DB successfully", OutputType.SUCCESS);
    return connection;
  } catch (error) {
    throw new Exception(Exception.CANNOT_CONNECT_DB);
  }
}

export default connect;
