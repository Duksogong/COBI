const express = require("express");
const app = express();
const port = 5000;

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const { Review } = require("./models/Review");
const { Image } = require("./models/Image");

// 이미지 업로드를 위한 Multer 및 Memory Storage 설정
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// const imageRouter = Router();
const config = require("./config/key");

app.use(bodyParser.urlencoded({ extended: true }));

// application/json
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require("mongoose");

mongoose
    .connect(config.mongoURI)
    .then(() => console.log("MongoDB Connected.."))
    .catch((err) => console.log(err));

app.post("/api/review", upload.array("images", 3), async (req, res) => {
    // const user = req.user;
    const { user, category } = req.body; // 임시

    try {
        const imageIds = await Promise.all(
            req.files.map(async (file) => {
                const image = new Image({
                    data: file.buffer,
                    contentType: file.mimetype,
                });
                const savedImage = await image.save();
                return savedImage;
            })
        );

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

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
