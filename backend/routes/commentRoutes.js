// commentRoutes.js

const express = require("express");
const router = express.Router();
const { Comment } = require("../models/Comment");

// 모든 댓글 조회
router.get("/", (req, res) => {
  Comment.find({})
    .then((comments) => {
      res.json({ comments });
    })
    .catch((error) => {
      console.error("댓글 가져오기 중 오류 발생:", error);
      res.status(500).json({ success: false, message: "내부 서버 오류." });
    });
});

// 특정 리뷰에 대한 댓글 조회
router.get('/:reviewId', (req, res) => {
  const { reviewId } = req.params;

  Comment.find({ reviewId })
    .then((comments) => {
      res.json({ comments });
    })
    .catch((error) => {
      console.error('댓글 가져오기 중 오류 발생:', error);
      res.status(500).json({ success: false, message: '내부 서버 오류.' });
    });
});

// ... (이전 코드)

// 새로운 댓글 작성
router.post('/', async (req, res) => {
  const { reviewId, content, author } = req.body; // 수정된 부분

  try {
    // 댓글을 MongoDB에 저장
    const newComment = new Comment({
      reviewId,
      content, // 수정된 부분
      author: author || 'CurrentUser', // 현재는 고정값으로 지정되어 있으므로 필요에 따라 수정
      timestamp: Date.now(), // timestamp를 추가하고 현재 시간으로 설정
      // 다른 필요한 댓글 속성 추가
      // author, timestamp 등
    });

    await newComment.save();

    res.status(201).json({
      success: true,
      message: '댓글 작성 성공',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: '댓글 작성 실패',
      error: error.message,
    });
  }
});

// ... (이전 코드)


module.exports = router;
