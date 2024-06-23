import express from "express";
import Question from "../models/questions.js";
import Category from "../models/category.js"; 


const router = express.Router();

router.post('/addQuestions', async (req, res) => {
    try {
        const questionsToAdd = req.body.questions;

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

// GET CATEGORIES
router.get('/getCategories', async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
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