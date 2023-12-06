import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';

function MyBookmarkPage() {
  const navigate = useNavigate();
  //const dispatch = useDispatch();

  const [cookie, setCookie] = useState("");
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");

  const [option, setOption] = useState("최신순")
  
  const [bookmarks, setBookmarks] = useState([]);
  const [selectedBookMarks, setSelectedBookMarks] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [details, setDetails] = useState([]);

  /* User 모델에서 가져온 리스트 정보 확인 */
  console.log("user >>> ", users)

  useEffect(() => {
    // 현재 브라우저 쿠키에서 값(토큰) 가져오기
    const sample = document.cookie.split('=');
    const cookies = sample[1].split(';');
    setCookie(cookies[0]);
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

  const onOptionDate = () => {
    setOption("최신순")
    //setReviews([...reviews].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)))
  }

  const onOptionDictionary = () => {
    setOption("사전순")
    // setReviews([...reviews].sort((a, b) => {
    //   const titleA = a.title || ""; // null 또는 undefined인 경우 빈 문자열로 대체
    //   const titleB = b.title || ""; // null 또는 undefined인 경우 빈 문자열로 대체
  
    //   // 비교 함수를 통해 정렬, null 또는 undefined인 경우를 고려하여 처리
    //   return titleA.localeCompare(titleB);
    // }))
  }

  const handleReviewClick = (reviewId, currentUser) => {
    // 리뷰 클릭 시 리뷰 상세 페이지로 이동
    navigate(`/review_detail/${reviewId}/${currentUser}`);
  };

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
    <div className="d-flex flex-column" style={{height: '100vh'}}>
      <NavBar />
      
      <div className="d-flex flex-column align-items-center flex-grow-1"
        style={{justifyContent: 'space-evenly'}}>
        <div style={{ display:'flex', flexDirection:'row', width:'310px', alignItems: 'center' }}>
          <span><b>정렬방식</b></span>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic" size="sm"
            style={{ borderRadius:'20px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)', marginLeft:'10px', border:'none', backgroundColor:'white', color:'black' }}>
              {option}
            </Dropdown.Toggle>

            <Dropdown.Menu
            style={{ minWidth:'50px', textAlign:'center', padding:'0px' }}>
              <Dropdown.Item onClick={onOptionDate} active={option === '최신순'}
              style={{ fontSize:'13px' }}>
                최신순
              </Dropdown.Item>
              <Dropdown.Item onClick={onOptionDictionary} active={option === '사전순'}
              style={{ fontSize:'13px' }}>
                사전순
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <style>{`::-webkit-scrollbar { display: none;}`}</style>
        <div style={{ height: '40rem', overflow: 'auto'}}>
          {details.length === 0 && (
            <p>북마크를 추가해보세요.</p>
          )}
          
          {details.length > 0 && details.map((reviewO, index) => ( 
            <Card key={index} onClick={() => handleReviewClick(reviewO._id, currentUser._id)}
              style={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)', margin:'10px', marginBottom:'20px', border:'none'}}>
              <div style={{padding: '10px'}}>
                <div style={{display: "flex", flexDirection:"row"}}> 
                  <div>
                    <img style={{width:"50px", height:"70px", marginRight:'10px',
                      borderRadius: "10%", objectFit: "cover",}}
                      // src="http://dummyimage.com/50x70/ced4da/6c757d.jpg"
                      src={reviewO?.bookimage}
                      alt="Image Alt Text"/>
                  </div>
                  <div style={{width: '260px', fontSize:'16px', 
                    display:'flex', flexDirection: 'column', justifyContent:'space-around'}}>
                    <div style={{ margin:'5px', fontSize:'15px', fontWeight:'bold', maxWidth:'260px', whiteSpace: 'nowrap', overflow:'hidden', textOverflow: 'ellipsis' }}>
                      책제목 : {reviewO?.booktitle}
                    </div>
                    <div style={{ margin:'5px', fontSize:'15px', fontWeight:'bold', maxWidth:'260px', whiteSpace: 'nowrap', overflow:'hidden', textOverflow: 'ellipsis' }}>
                      글제목 : {reviewO?.title}
                    </div>
                  </div>
                </div>
                <div>
                  <small style={{ fontSize: '12px' }}>
                    작성자 닉네임: {
                      users.find(user => user._id === reviewO.user)
                      ? users.find(user => user._id === reviewO.user).nickname
                      : 'unkown'
                    }
                  </small>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Footer />  
    </div>
  );
}

export default MyBookmarkPage