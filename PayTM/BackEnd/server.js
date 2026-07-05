
import User from "./config/db.js";

import express from "express";
import router from "./routes/users.js"
import connectDB from "./config/db.js";

import cors from 'cors'

const app = express();

app.use(cors());
app.use(express.json());


await connectDB();

app.get("/", (req, res) => {
    res.send("Hello World! this is a user route");
});

app.use('/api/v1/users', router );

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



