const mongoose = require("mongoose");
const sallRounds = 10;

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
        // created_at: {
        //     type: Date,
        //     maxLength: 6,
        // },
        // updated_at: {
        //     type: Date,
        //     maxLength: 6,
        // },

        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Review = mongoose.model("Review", ReviewSchema);

module.exports = { Review };