import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import NavBar from '../NavBar/NavBar'; // 상대 경로에 주의하여 수정
import Footer from '../Footer/Footer';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';

function HomePage() {
  const navigate = useNavigate();

  const [cookie, setCookie] = useState("");
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [reviews, setReviews] = useState([]);
  
  useEffect(() => {
    // 현재 브라우저 쿠키에서 값(토큰) 가져오기
    const cookies = document.cookie.split('=');
    setCookie(cookies[1]);
  }, []);
  
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

  useEffect(() => {
    // 서버에서 감상평 데이터 가져오기
    axios.get('/api/users/review')
    .then(response => setReviews(response.data))
    .catch(error => console.error(error));
  }, []);
  
  const handleCarouselItemClick = (reviewId, userId) => {
    // 클릭 이벤트 처리
    navigate(`/review_detail/${reviewId}/${userId}`);
  };
  
  return (
    <div>
      <NavBar />

      <div className="d-flex flex-column align-items-center">

        <Card style={{width: "32rem", margin: "1rem"}}>
          <Card.Body className="text-center">This is some text within a card body.</Card.Body>
        </Card>
      
        <Carousel pause="hover" controls={false} data-bs-theme="dark">
          {reviews.map((review) => (

            <Carousel.Item key={review._id} 
            style={{marginBottom: '1rem', minHeight: '32rem', minWidth: '34rem'}}>
              <div onClick={() => handleCarouselItemClick(review._id, currentUser._id)}>
                <Card bg="light" style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
                  minHeight: '30rem', width: '32rem'}}>
                  <Card style={{padding:"10px", display: "flex", flexDirection:"row"}} bg='light'>
                    <Card.Img style={{width:"50px", height:"50px", 
                    borderRadius: "50%", objectFit: "cover",}}
                    src="http://dummyimage.com/50x50/ced4da/6c757d.jpg"
                    alt="Image Alt Text">
                    </Card.Img>
                    <Card.Body style={{padding: '0px', marginLeft: '10px', 
                    display: 'flex', flexDirection: 'row'}}>
                      <div className="align-items-center">
                        {users.find(user => user._id === review.user)
                        ? users.find(user => user._id === review.user).nickname
                        : 'unkown'} 
                        <br/> {review.createdAt}
                      </div>
                    </Card.Body>
                  </Card>
                  <div style={{padding:"10px"}}>
                    <Card.Img style={{width:"144px", height:"96px"}}
                      src="http://dummyimage.com/128x96/ced4da/6c757d.jpg"
                      alt="Image Alt Text"
                    />
                  </div>
                  <div style={{padding:"10px", width:'32rem'}}>
                    <h5>{review?.title ? review?.title : 'untitled'}</h5>
                    <Card.Text>
                      {review.review.length > 120 ? `${review.review.slice(0, 120)}...` : review.review}
                    </Card.Text>
                  </div>
                </Card>
                <Carousel.Caption>
                  <h5>{review?.bookname}</h5>
                  <p>{review.author}</p>
                </Carousel.Caption>
              </div>
            </Carousel.Item>

          ))}
        </Carousel>

      </div>

      <Footer />
    </div>
  )
}

export default HomePage