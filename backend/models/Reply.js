const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
  commentId: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
  author: String,
  content: String,
  timestamp: String,
});

const Reply = mongoose.model("Reply", replySchema);

module.exports = Reply;
