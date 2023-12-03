const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  author: String,
  content: String,
  timestamp: String,
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reply" }],
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = { Comment };
