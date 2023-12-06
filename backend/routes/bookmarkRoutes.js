const express = require("express");
const router = express.Router();

const cookieParser = require("cookie-parser");
router.use(cookieParser());

const { Bookmark } = require("../models/Bookmark");
const { Review } = require("../models/Review");
const { auth } = require("../middleware/auth");

router.get("/review", (req, res) => {
    Review.find({})
        .then((reviews) => {
            res.json(reviews);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

router.get("/bookmark", (req, res) => {
    Bookmark.find({})
        .then((bookmarks) => {
            res.json(bookmarks);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

router.post("/select_bookmark", auth, (req, res) => {
    const { userId, reviewId } = req.body;

    const bookmark = new Bookmark({
        userId: userId,
        reviewId: reviewId,
    });

    bookmark
        .save()
        .then(() => {
            res.status(200).json({
                success: true,
                message: "Bookmark selected successfully.",
            });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({
                success: false,
                message: "Internal server error.",
            });
        });
});

router.post("/deselect_bookmark", auth, (req, res) => {
    const { userId, reviewId } = req.body;

    Bookmark.findOneAndDelete({ userId: userId, reviewId: reviewId })
        .then(() => {
            res.status(200).json({
                success: true,
                message: "Bookmark deselected successfully.",
            });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({
                success: false,
                message: "Internal server error.",
            });
        });
});

module.exports = router;