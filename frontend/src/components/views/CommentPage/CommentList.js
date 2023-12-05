// CommentList.js

import React from 'react';
import './CommentList.css';

const CommentList = ({ comments }) => {
  return (
    <div className="comment-list">
      <h4>댓글 전체 목록</h4>
      {Array.isArray(comments) ? (
        comments.map((comment, index) => (
          <div className="comment" key={index}>
            <p>{comment.author}: {comment.content}</p>
            <p>{comment.timestamp}</p>
          </div>
        ))
      ) : (
        <p>댓글이 없거나 데이터를 가져오는 중에 오류가 발생했습니다.</p>
      )}
    </div>
  );
};

export default CommentList;
