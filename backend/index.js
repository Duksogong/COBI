const express = require("express");
const app = express();
const port = 5000;

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const { Review } = require("./models/Review");
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

app.post("/api/review", (req, res) => {
    const review = new Review(req.body);
    try {
        const reviewInfo = review.save();
        return res.status(200).json({
            success: true,
        });
    } catch (err) {
        return res.json({ success: false, err });
    }
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
