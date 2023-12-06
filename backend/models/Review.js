const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema(
    {
        title: {
            type: String,
            maxLength: 50,
            require: true,
        },
        booktitle: {
            type: String,
            maxLength: 50,
            require: true,
        },
        isbn: {
            type: String,
            maxLength: 50,
            require: true,
        },
        author: {
            type: String,
            maxLength: 50,
            require: true,
        },
        publisher: {
            type: String,
            maxLength: 50,
            require: true,
        },
        bookimage: {
            type: String,
        },
        review: {
            type: String,
            require: true,
        },
        images: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Image",
            },
        ],
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            require: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            require: true,
        },
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Review = mongoose.model("Review", ReviewSchema);

module.exports = { Review };
