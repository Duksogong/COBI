const express = require("express");
const router = express.Router();

const { Review } = require("../models/Review");
const { Image } = require("../models/Image");

// 이미지 업로드를 위한 Multer 및 Memory Storage 설정
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/", upload.array("images", 3), async (req, res) => {
    // const user = req.user;
    const { user, category } = req.body; // 임시

    try {
        // const imageIds = await Promise.all(
        //     req.files.map(async (file) => {
        //         const image = new Image({
        //             data: file.buffer,
        //             contentType: file.mimetype,
        //         });
        //         const savedImage = await image.save();
        //         return savedImage;
        //     })
        // );

        // 이미지 ID를 저장할 배열 생성
        const imageIds = [];

        // 업로드된 이미지를 순회하며 Image 문서 생성
        for (const file of req.files) {
            const image = new Image({
                image: {
                    data: file.buffer,
                    contentType: file.mimetype,
                },
            });

            // 이미지를 데이터베이스에 저장
            const savedImage = await image.save();

            // 이미지 ID를 배열에 추가
            imageIds.push(savedImage._id);
        }

        const review = new Review({
            ...req.body,
            // user: user._id,
            user,
            category,
            images: imageIds,
        });

        const reviewInfo = await review.save();

        return res.status(200).json({
            success: true,
            review: reviewInfo,
        });
    } catch (err) {
        return res.json({
            success: false,
            error: err.message,
        });
    }
});

// 로그인한 사용자의 리뷰 조회
router.get("/user", async (req, res) => {
    try {
        // req.user에서 사용자 정보를 가져온다고 가정
        const userId = req.user._id; // 또는 다른 사용자 식별자

        // 해당 사용자의 리뷰 조회
        const userReviews = await Review.find({ user: userId }).populate(
            "category images"
        );

        return res.status(200).json({
            success: true,
            reviews: userReviews,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message,
        });
    }
});

// 특정 리뷰 조회
router.get("/:reviewId", async (req, res) => {
    const { reviewId } = req.params;
    try {
        const review = await Review.findById(reviewId).populate(
            "user category images"
        );
        if (!review) {
            return res.status(404).json({
                success: false,
                error: "Review not found",
            });
        }
        return res.status(200).json({
            success: true,
            review,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message,
        });
    }
});
module.exports = router;
