import React, { useState } from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [showCommentForm, setShowCommentForm] = useState(false);

  const handleCommentSubmit = (commentContent) => {
    // 댓글 목록에 새로운 댓글 추가
    setComments([...comments, { id: comments.length + 1, content: commentContent }]);
    // 댓글 작성 폼 감추기
    setShowCommentForm(false);
  };

  return (
    <div>
      <button onClick={() => setShowCommentForm(!showCommentForm)}>
        {showCommentForm ? '댓글 목록 보기' : '댓글 작성'}
      </button>
      {showCommentForm ? (
        <CommentForm onCommentSubmit={handleCommentSubmit} />
      ) : (
        <CommentList comments={comments} />
      )}
    </div>
  );
};

export default CommentSection;
