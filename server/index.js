import express from "express";
import 'dotenv/config'
const port = process.env.PORT;
const app = express();

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`)
})


