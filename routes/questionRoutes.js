import express from "express";
import Question from "../models/questions.js";

const router = express.Router();
// http://localhost:3000/get_questions/getQuestions?category=S&difficultyLevel=easy

router.post('/addQuestions', async (req, res) => {
    try {
        const questionsToAdd = req.body.questions;

        // if (!Array.isArray(questionsToAdd)) {
        //     return res.status(400).send();
        // }
        const savedQuestions = [];

        for (const question of questionsToAdd) {
            const dataToSave = new Question({
                category: question.category,
                difficultyLevel: question.difficultyLevel,
                que: question.que,
                options: question.options,
                answer: question.answer
            });

            const savedQuestion = await dataToSave.save();
            savedQuestions.push(savedQuestion);
        };

        console.log(savedQuestions, "savedQuestions");

        res.status(201).json({
            message: "Questions saved successfully",
            questions: savedQuestions
        });
    } catch (err) {
        console.log("Error", err);
        res.status(500).send("Failed");
    }
});

router.get('/getQuestions', async (req, res) => {
    const { category, difficultyLevel } = req.query;

    try {
        let getData = {};

        if (category) {
            getData.category = category;
        }

        if (difficultyLevel) {
            getData.difficultyLevel = difficultyLevel;
        }

        const questions = await Question.find(getData);
        res.status(200).json(questions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
export default router;