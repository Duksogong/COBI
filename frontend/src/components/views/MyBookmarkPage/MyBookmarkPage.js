import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
//import { myBookmark } from "../../../_actions/bookmark_action";

function MyBookmarkPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [cookie, setCookie] = useState("");
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");

  const [bookmarks, setBookmarks] = useState([]);
  const [selectedBookMarks, setSelectedBookMarks] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [details, setDetails] = useState([]);

  /* User 모델에서 가져온 리스트 정보 확인 */
  console.log("user >>> ", users)

  useEffect(() => {
    // 현재 브라우저 쿠키에서 값(토큰) 가져오기
    const cookies = document.cookie.split('=');
    setCookie(cookies[1]);
  }, []);

  /* 현재 브라우저 쿠키값(토큰) 확인 */
  console.log("쿠키값: ", cookie);
  
  useEffect(() => {
    // 서버에서 유저 데이터를 가져오기
    axios.get('/api/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    // users 리스트에서 cookie값을 token으로 가진 유저 찾기 (로그인 상태 유저 찾기)
    for (let i=0; i<users.length; i++) {
      if (users[i].token === cookie){
        setCurrentUser(users[i]);
        break;
      }
    }
  }, [cookie, users]);

  /* 토큰 값으로 찾은 User의 유저 _id */
  console.log("최종 유저: ", currentUser._id);

  useEffect(() => {
    // 북마크 데이터 가져오기
    axios.get('/api/users/bookmark')
    .then(response => {
        setBookmarks(response.data) 
    })
    .catch(error => console.error(error));
  }, []);

  /* 북마크 데이터 */
  console.log("북마크 데이터: ", bookmarks); 

  // 북마크 유저것만 골라내기
  useEffect(() => {
    const filteredBookmarks = bookmarks.filter(bm => bm.userId === currentUser._id);
    const selectedReviewIds = filteredBookmarks.map(bm => bm);
    setSelectedBookMarks(selectedReviewIds);
  }, [bookmarks, currentUser._id]);

  /* 유저 북마크 데이터 */
  console.log("유저 북마크: ", selectedBookMarks);

  useEffect(() => {
    // 서버에서 감상평 데이터 가져오기
    axios.get('/api/users/review')
    .then(response => setReviews(response.data))
    .catch(error => console.error(error));
  }, []);

  /* 감상평 데이터 */
  console.log("감상평 데이터: ", reviews);

  // 북마크된 리뷰 object가져오기
  useEffect(() => {
    selectedBookMarks.map(s => {
    // reviews에서 해당 리뷰를 찾아서 가져옴
    const foundReview = reviews.find(review => review._id === s.reviewId);
    if (foundReview) {
        setDetails(details => [...details, foundReview]);
    }
    }); 
  }, [selectedBookMarks]);
    
  /* 유저의 북마크 리뷰 */
  console.log("북마크된 리뷰: ", details);
  

    // ==========================================================

  return (
    <div style={{ 
    //   display: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', height: '100vh'
    }}>
      
      <h4>내 책갈피</h4>
      <hr/>

      <div>
        {details.map((reviewO, index) => (
          <div key={index} type="submit" style={{ backgroundColor: 'mistyrose', margin:'2px'}}>
            <div style={{ display: 'flex' }}>
                <div style={{ flex: 3, marginRight: '10px', backgroundColor: 'aliceblue' }}>
                    <div style={{fontSize:'10px'}}>이미지</div>
                </div>
                <div style={{ flex: 5 }}>
                    <div style={{ fontSize:'10px'}}>책 제목 : {reviewO.bookname}</div>
                    <div style={{ fontSize:'10px'}}>글 제목 : {reviewO.title}</div>
                </div>
            </div>
            <div>
            <small style={{ fontSize: '10px' }}>
                작성자 닉네임: {
                    users.find(user => user._id === reviewO.user)
                    ? users.find(user => user._id === reviewO.user).nickname
                    : '미정'
                }
                </small>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
}

export default MyBookmarkPage