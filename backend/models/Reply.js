const mongoose = require("mongoose");

<<<<<<< HEAD
const replySchema = new mongoose.Schema({
  commentId: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
  author: String,
  content: String,
  timestamp: String,
=======
const replySchema = mongoose.Schema({
  commentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
  },
  author: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
>>>>>>> main
});

const Reply = mongoose.model("Reply", replySchema);

module.exports = Reply;
