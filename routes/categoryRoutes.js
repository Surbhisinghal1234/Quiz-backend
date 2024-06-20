import express from "express";
import Category from "../models/category.js"; // Adjust path as per your project structure

const router = express.Router();

// POST
router.post("/addCategory", async (req, res) => {
    try {
        const { categories } = req.body;

        const newCategory = new Category({ category: categories });

        await newCategory.save();
        console.log(newCategory)
        res.status(201).json(newCategory);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
});

// GET
router.get("/getCategories", async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
});

router.delete("/deleteCategory/:id", async (req, res) => {
    
    
});
export default router;
