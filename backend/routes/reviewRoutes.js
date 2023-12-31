const express = require("express");
const router = express.Router();

const cookieParser = require("cookie-parser");
router.use(cookieParser());

const { auth } = require("../middleware/auth");
const { Review } = require("../models/Review");
const { UserCategory } = require("../models/UserCategory");
const { Image } = require("../models/Image");

// 이미지 업로드를 위한 Multer 및 Memory Storage 설정
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/", auth, upload.array("images", 3), async (req, res) => {
    const userId = req.user._id;
    const { category } = req.body; // 임시

    if (!userId) {
        return res.status(401).json({
            success: false,
            error: "User not authenticated",
        });
    }

    try {
        // 이미지 ID를 저장할 배열 생성
        const imageIds = [];

        // 업로드된 이미지를 순회하며 Image 문서 생성
        if (req.files && req.files.length > 0) {
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
        } else {
            const review = new Review({
                ...req.body,
                user: userId,
                category,
            });

            const reviewInfo = await review.save();

            return res.status(200).json({
                success: true,
                review: reviewInfo,
            });
        }

        const review = new Review({
            ...req.body,
            user: userId,
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
router.get("/user", auth, async (req, res) => {
    const userId = req.user._id;
    if (!userId) {
        return res.status(401).json({
            success: false,
            error: "User not authenticated",
        });
    }
    try {
        // 해당 사용자의 리뷰 조회
        const userReviews = await Review.find({ user: userId });

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

// 피드 감상평 조회
router.get("/feed", auth, async (req, res) => {
    const userId = req.user._id;
    if (!userId) {
        return res.status(401).json({
            success: false,
            error: "User not authenticated",
        });
    }

    try {
        var reviews = await Review.find({}).sort({ created_at: -1 });

        return res.status(200).json({
            success: true,
            reviews: reviews,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message,
        });
    }
});

// 피드 감상평 조회
router.get("/feed/:isbn", auth, async (req, res) => {
    const userId = req.user._id;
    const { isbn } = req.params;
    if (!userId) {
        return res.status(401).json({
            success: false,
            error: "User not authenticated",
        });
    }

    try {
        var reviews = await Review.find({ isbn: isbn }).sort({
            created_at: -1,
        });

        return res.status(200).json({
            success: true,
            reviews: reviews,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message,
        });
    }
});

// 추천 감상평 조회
router.get("/rec", auth, async (req, res) => {
    const userId = req.user._id;
    if (!userId) {
        return res.status(401).json({
            success: false,
            error: "User not authenticated",
        });
    }

    try {
        const categoryId = await UserCategory.find({ userId }).then((result) =>
            result.map((item) => item.categoryId)
        );

        var reviews = [];

        if (categoryId && categoryId.length) {
            //카테고리가 있는 경우, 해당 카테고리 감상평을 최신순으로...
            reviews = await Review.find({ category: { $in: categoryId } });
            reviews.sort(
                (a, b) => new Date(b.created_at) - new Date(a.created_at)
            );
        }

        return res.status(200).json({
            success: true,
            reviews: reviews,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message,
        });
    }
});

// 추천 감상평 조회
router.get("/rec/:isbn", auth, async (req, res) => {
    const userId = req.user._id;
    const { isbn } = req.params;
    if (!userId) {
        return res.status(401).json({
            success: false,
            error: "User not authenticated",
        });
    }

    try {
        const categoryId = await UserCategory.find({ userId }).then((result) =>
            result.map((item) => item.categoryId)
        );

        var reviews = [];

        if (categoryId && categoryId.length) {
            //카테고리가 있는 경우, 해당 카테고리 감상평을 최신순으로...
            reviews = await Review.find({
                isbn: isbn,
                category: { $in: categoryId },
            });
            reviews.sort(
                (a, b) => new Date(b.created_at) - new Date(a.created_at)
            );
        }

        return res.status(200).json({
            success: true,
            reviews: reviews,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message,
        });
    }
});

// 특정 리뷰 조회
router.get("/:reviewId", auth, async (req, res) => {
    const { reviewId } = req.params;
    try {
        const review = await Review.findById(reviewId);
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

// 리뷰 수정
router.patch(
    "/:reviewId",
    auth,
    upload.array("images", 3),
    async (req, res) => {
        try {
            const { reviewId } = req.params;

            // 업데이트할 리뷰 데이터 수집
            const updatedReviewData = { ...req.body };

            const reviewToUpdate = await Review.findById(reviewId);
            // 리뷰가 존재하지 않으면 에러 응답
            if (!reviewToUpdate) {
                return res.status(404).json({
                    success: false,
                    error: "Review not found",
                });
            }
            // 작성자 확인
            if (reviewToUpdate.user.toString() !== req.user._id.toString()) {
                return res.status(403).json({
                    success: false,
                    error: "Unauthorized. You are not the author of this review.",
                });
            }

            // 새 이미지가 제공되면 이미지 업데이트
            if (req.files && req.files.length > 0) {
                const imageIds = [];

                for (const file of req.files) {
                    const image = new Image({
                        image: {
                            data: file.buffer,
                            contentType: file.mimetype,
                        },
                    });

                    const savedImage = await image.save();
                    imageIds.push(savedImage._id);
                }

                // 리뷰 문서의 이미지 필드 업데이트
                updatedReviewData.images = imageIds;
            }

            // 리뷰 업데이트
            const updatedReview = await Review.findByIdAndUpdate(
                { _id: reviewId, user: req.user._id }, // 작성자가 로그인 한 유저일 때
                { $set: updatedReviewData },
                { new: true } // 업데이트된 문서 반환
            );

            return res.status(200).json({
                success: true,
                review: updatedReview,
            });
        } catch (err) {
            return res.json({
                success: false,
                error: err.message,
            });
        }
    }
);

// 리뷰 삭제
router.delete("/:reviewId", auth, async (req, res) => {
    const { reviewId } = req.params;
    try {
        // 리뷰를 찾아서 삭제
        const deletedReview = await Review.findById(reviewId);

        if (!deletedReview) {
            return res.status(404).json({
                success: false,
                error: "Review not found",
            });
        }

        // 작성자 확인
        if (deletedReview.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                error: "Unauthorized. You are not the author of this review.",
            });
        }

        // 삭제된 리뷰의 이미지 ID 배열 가져오기
        const deletedImageIds = deletedReview.images;

        // 이미지 삭제
        await Image.deleteMany({ _id: { $in: deletedImageIds } });

        return res.status(200).json({
            success: true,
            message: "Review deleted successfully",
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message,
        });
    }
});

// router.get("/images", async (req, res) => {
//     try {
//         const { imageIds } = req.query;

//         // imageIds가 존재하면 쉼표로 분리하여 배열로 변환
//         const imageIdsArray = imageIds ? imageIds.split(",") : [];

//         // imageIds 배열에 포함된 이미지 ID로 이미지를 조회
//         const images = await Image.find({ _id: { $in: imageIdsArray } });

//         if (!images) {
//             return res.status(404).json({ error: "Images not found" });
//         }

//         res.json(images);
//     } catch (error) {
//         console.error("Error fetching images:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

router.get("/images/:id", async (req, res) => {
    try {
        const imageIds = req.params.id.split(",");
        console.log(imageIds);

        const images = await Image.find({ _id: { $in: imageIds } });
        console.log(images);

        if (!images || images.length === 0) {
            return res.status(404).send("Images not found");
        }

        const imageData = images.map((image) => ({
            contentType: image.image.contentType,
            data: image.image.data?.toString("base64"),
        }));
        console.log(imageData);

        res.json(imageData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
