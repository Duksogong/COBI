import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';

const CommentPage = () => {
  const [comments, setComments] = useState([]);
  const reviewId = '656f5ea14fcf790ca7513db2'; // 특정 리뷰의 ObjectId

  const fetchComments = async () => {
    try {
      // 서버에서 특정 리뷰에 대한 댓글 목록 가져오기
      const response = await axios.get(`/api/comments/${reviewId}`);
      setComments(response.data.comments);
    } catch (error) {
      console.error('댓글 가져오기 오류:', error);
    }
  };

  useEffect(() => {
    // 페이지가 로드될 때 특정 리뷰에 대한 댓글을 가져옴
    fetchComments();
  }, []);

  const handleCommentSubmit = async (commentData) => {
    try {
      // 서버에 댓글 전송
      await axios.post('/api/comments', { ...commentData, reviewId });

      // 서버에서 최신 댓글 목록을 다시 가져옴
      fetchComments();
    } catch (error) {
      console.error('댓글 작성 오류:', error);
    }
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#a9b388',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  };

  return (
    <div className="d-flex flex-column" style={{ height: '100vh' }}>
      <NavBar />
      <CommentForm onCommentSubmit={handleCommentSubmit} />
      <div
        className="d-flex flex-column align-items-center flex-grow-1"
        style={{ justifyContent: 'space-evenly' }}
      >
        <CommentList comments={comments} />
        <button type="submit" style={buttonStyle}>
          댓글 작성
        </button>
      </div>
      <Footer className="fixed-footer" />
    </div>
  );
};

export default CommentPage;
