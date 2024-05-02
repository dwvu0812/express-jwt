import express from "express";
import * as dotenv from "dotenv";
import { userRouter, studentRouter } from "./routes/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // read data from request body

app.use("/users", userRouter);
app.use("/students", studentRouter);

app.get("/", (req, res) => {
  res.send("Hello World 222");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
