    import express from "express";
    import mongoose from "mongoose";
    import dotenv from "dotenv";
    import cors from "cors";
    import questionRoutes from "./routes/questionRoutes.js"; 
    import userRoutes from "./routes/userRoutes.js";
    import categoryRoutes from "./routes/categoryRoutes.js";
    import submitRoutes from "./routes/submitRoutes.js";

    dotenv.config();

    const app = express();
    const port = 3000;

    app.use(cors({ origin: "*" }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use("/questions", questionRoutes);
    // app.use("/users", userRoutes);
    app.use('/get_questions',questionRoutes )
    app.use('/get_categories',questionRoutes )

    app.use('/submit_quiz',questionRoutes )
    app.use("/add_category", categoryRoutes);
    app.use("/get_categories",categoryRoutes )
    app.use("/delete_category",categoryRoutes )
    app.use("/update_category",categoryRoutes )
    app.use('/submit_answers',submitRoutes )


    const username = process.env.MONGO_USERNAME;
    const password = encodeURIComponent(process.env.MONGO_PASSWORD);
    const dbname = "quiz"

    mongoose.connect(
        "mongodb+srv://" +
        username +
        ":" +
        password +
        `@cluster0.3j0ywmp.mongodb.net/${dbname}?retryWrites=true&w=majority&appName=Cluster0`
    )
    .then(() => {
        console.log("MongoDB connected");
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch((error) => console.error("MongoDB connection error", error));
