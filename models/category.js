import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    category: [{
        id: {
            type: String,
            required: true,
            default: () => new mongoose.Types.ObjectId().toString(),
        },
        name: {
            type: String,
            required: true,
        }
    }]
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
