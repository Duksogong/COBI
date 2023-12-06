const express = require("express");
const router = express.Router();

const cookieParser = require("cookie-parser");
router.use(cookieParser());

const { UserCategory } = require("../models/UserCategory");
const { Category } = require("../models/Category");
const { auth } = require("../middleware/auth");

router.get("/categories", (req, res) => {
    Category.find({})
        .then((categories) => {
            return res.json(categories);
        })
        .catch((err) => {
            return res.status(500).send(err);
        });
});

router.get("/user_categories", (req, res) => {
    UserCategory.find({})
        .then((user_categories) => {
            return res.json(user_categories);
        })
        .catch((err) => {
            return res.status(500).send(err);
        });
});

router.post("/select_category", auth, (req, res) => {
    const { userId, categoryId } = req.body;

    const userCategory = new UserCategory({
        userId: userId,
        categoryId: categoryId,
    });

    userCategory
        .save()
        .then(() => {
            return res.status(200).json({
                success: true,
                message: "Category selected successfully.",
            });
        })
        .catch((error) => {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "Internal server error.",
            });
        });
});

router.post("/deselect_category", auth, (req, res) => {
    const { userId, categoryId } = req.body;

    UserCategory.findOneAndDelete({ userId: userId, categoryId: categoryId })
        .then(() => {
            return res.status(200).json({
                success: true,
                message: "Category deselected successfully.",
            });
        })
        .catch((error) => {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "Internal server error.",
            });
        });
});

module.exports = router