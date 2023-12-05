// CommentForm.js

import React, { useState } from 'react';

const CommentForm = ({ onCommentSubmit }) => {
  const [commentContent, setCommentContent] = useState('');

  const handleInputChange = (e) => {
    setCommentContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 댓글을 제출하기 전에 작성자와 내용이 제공되었는지 확인합니다.
    const author = 'CurrentUser'; // 실제 사용자 정보로 교체
    const reviewId = '656f5ea14fcf790ca7513db2'; // 실제 리뷰 ID로 교체

    if (!author || !commentContent) {
      console.error('작성자와 내용은 필수입니다.');
      return;
    }

    // 댓글 데이터를 부모 컴포넌트에 전달하여 제출합니다.
    onCommentSubmit({ author, content: commentContent, reviewId });

    // 댓글 입력 필드를 재설정합니다.
    setCommentContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={commentContent}
        onChange={handleInputChange}
        placeholder="댓글을 입력하세요..."
      />
      <button type="submit">댓글 작성</button>
    </form>
  );
};

export default CommentForm;
