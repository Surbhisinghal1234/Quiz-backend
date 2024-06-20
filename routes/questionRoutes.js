import express from "express";
import Question from "../models/questions.js";

const router = express.Router();

router.post('/addQuestion', async (req, res) => {
    try {
        const { category, difficultyLevel, que, options, answer } = req.body;

        const dataToSave = new Question({
            category,
            difficultyLevel,
            que,
            options,
            answer
        });

        console.log(dataToSave, "dataToSave before saving");

        await dataToSave.save();

        console.log(dataToSave, "dataToSave after saving");

        res.send("Question saved successfully");
    } catch (err) {
        console.error("Error saving question:", err);
        res.status(500).send("Failed to save question");
    }
});
router.get('/getQuestions', async (req, res) => {
    const { category, difficultyLevel } = req.query;

    try {
        let query = {};

        if (category) {
            query.category = category;
        }

        if (difficultyLevel) {
            query.difficultyLevel = difficultyLevel;
        }

        const questions = await Question.find(query);
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
export default router;