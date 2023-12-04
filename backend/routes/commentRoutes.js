const express = require("express");
const router = express.Router();
const { Comment } = require("../models/Comment");
const Reply = require("../models/Reply");

router.post("/api/comments", (req, res) => {
    const { username, content } = req.body;

    const newComment = new Comment({
        author: username,
        content,
        timestamp: new Date().toISOString(),
    });

    newComment
        .save()
        .then((comment) => {
            res.json({ success: true, comment, message: "댓글이 성공적으로 등록되었습니다." });
        })
        .catch((error) => {
            console.error("댓글 저장 중 오류 발생:", error);
            res.status(500).json({ success: false, message: "내부 서버 오류." });
        });
});

router.post("/api/comments/:commentId/replies", async (req, res) => {
    try {
        const { commentId } = req.params;
        const { author, content } = req.body;

        const newComment = new Comment({
            author,
            content,
            timestamp: new Date().toISOString(),
        });

        const savedComment = await newComment.save();

        const newReply = new Reply({
            commentId: savedComment._id,
            author,
            content,
            timestamp: new Date().toISOString(),
        });

        const savedReply = await newReply.save();

        const updatedComment = await Comment.findByIdAndUpdate(
            commentId,
            { $push: { replies: savedReply._id } },
            { new: true }
        ).exec();

        res.json({ success: true, comment: updatedComment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "내부 서버 오류." });
    }
});

module.exports = router;
