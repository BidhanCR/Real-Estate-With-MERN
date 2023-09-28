import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";




const port = process.env.PORT;

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("DB connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



