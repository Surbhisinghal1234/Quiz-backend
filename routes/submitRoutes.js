import express from "express";
import Answer from "../models/submit.js"

const router = express.Router();

router.post('/submitAnswers', async (req, res) => {
    try {
        const { category, difficultyLevel, questions } = req.body;
        const answer = new Answer({
            category, difficultyLevel, questions
        });
        await answer.save();
        res.status(201).json("answer submitted successfully");
    } catch (err) {
        console.error("error", err);
        res.status(500).json("error");
    }
});

export default router;
