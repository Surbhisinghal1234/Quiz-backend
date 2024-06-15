import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import questionRoutes from "./routes/questionRoutes.js"; 

dotenv.config();

const app = express();
const port = 3000;

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/questions", questionRoutes);



const username = process.env.MONGO_USERNAME;
const password = encodeURIComponent(process.env.MONGO_PASSWORD);

mongoose.connect(
    "mongodb+srv://" +
    username +
    ":" +
    password +
    "@cluster0.3j0ywmp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/attendance"
)
.then(() => {
    console.log("MongoDB connected");
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
})
.catch((error) => console.error("MongoDB connection error:", error));
