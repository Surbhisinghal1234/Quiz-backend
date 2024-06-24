import mongoose from "mongoose";


const answerSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    difficultyLevel: {
        type: String,
        required: true
    },
    questions: [{
        question: {
            type: String,
            required: true
        },
        options: [{
            type: String,
            required: true
        }],
        correctAnswer: {
            type: String,
            required: true
        }
    }]
});
const Answer = mongoose.model('Answer', answerSchema);
export default Answer;
