import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
        // id: {
        //     type: String,
        //     required: true,
        //     default: Date.now()
        // },
        category: {
            type: String,
            required: true,
        }
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
