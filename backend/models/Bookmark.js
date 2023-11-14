const mongoose = require('mongoose');

let bookmarkSchema = mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    reviewId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
        required: true,
    }
});

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);
module.exports = { Bookmark };

