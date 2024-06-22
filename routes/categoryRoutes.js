import express from "express";
import Category from "../models/category.js"; 

const router = express.Router();

// POST CATEGORIES
router.post("/addCategory", async (req, res) => {
    try {
        const CategoryToAdd = req.body.categories

        const savedCategories = []

        for (const category of CategoryToAdd) {
            const dataToSave = new Category({
                category: category.category,
            });
            const savedCategory = await dataToSave.save();
            savedCategories.push(savedCategory)
        }
        console.log(savedCategories, "savedCategory")
        res.status(201).json({
            message: "Category saved sucessfully",
            categories: savedCategories
        })
    }
    catch (err) {
        console.log("err", err);
        res.status(500).send("failed")
    }
})

// // GET CATEFORIES
router.get("/getCategories", async (req, res) => {
    try {
        const categories = await Category.find();
        console.log(categories, "categories")

        res.status(200).json(categories);
        console.log(categories, "categories")
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
});

// DELETE CATEGORY
router.delete("/deleteCategory/:id", async (req, res) => {
    try {
        const categoryId = req.params.id;
        await Category.deleteOne({ _id: categoryId })
        res.status(200).json({ message: "category deleted sucessfully" })
    }
    catch (err) {
        console.log("error delete category", err)
        res.status(500).json({ message: "failed to delete category" })
    }
});

// UPDATE CATEGORY
router.put("/updatecategory/:id", async (req, res) => {
    try {
        const categoryId = req.params.id;
        const { category } = req.body;

        const result = await Category.updateOne({ _id: categoryId }, { $set: { category } });
        res.status(200).json({ id: categoryId, result, status: "updated" });

    } catch (err) {
        console.log("error updating category", err);
        res.status(500).json({ message: "failed to update category" });
    }
});

export default router;
