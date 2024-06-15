import express from "express";
import Quiz from "../models/questions.js"; 

const router = express.Router();

router.post('/addQuestions', async (req, res) => {
    try {
        const { questions } = req.body;
        const savedQuestions = await Quiz.create({ questions });

        console.log("Saved questions:", savedQuestions);
        res.json(savedQuestions);
    } catch (error) {
        console.error('Error saving to database:', error);
        res.status(500).send('Error saving data');
    }
});

export default router;
