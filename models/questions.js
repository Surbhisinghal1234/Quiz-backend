import mongoose from "mongoose";
const questionSchema = new mongoose.Schema({
    questions: [
        {
            question: {
                type: String,
                required: true
            },
            options: {
                type: [String],
                required: true
            },
            answer: {
                type: String,
                required: true
            },
            category: {
                type: String,
                required: true
            },
            difficultyLevel: {
                type: String,
                enum: ['easy', 'medium', 'hard'],
                required: true
            }
        }
    ]
});
const Quiz = mongoose.model("questions", questionSchema);
export default Quiz;
