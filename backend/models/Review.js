const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema(
    {
        title: {
            type: String,
            maxLength: 50,
        },
        isbn: {
            type: String,
            maxLength: 50,
        },
        author: {
            type: String,
            maxLength: 50,
        },
        publisher: {
            type: String,
            maxLength: 50,
        },
        review: {
            type: String,
        },
        images: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image" }],
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Review = mongoose.model("Review", ReviewSchema);

module.exports = { Review };
