import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
