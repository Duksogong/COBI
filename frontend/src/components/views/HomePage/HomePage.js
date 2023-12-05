import './HomePage.css'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import NavBar from '../NavBar/NavBar';
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
    const sample = document.cookie.split('=');
    const cookies = sample[1].split(';');
    setCookie(cookies[0]);
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
    <div className="d-flex flex-column" style={{height: '100vh'}}>
      <NavBar />

      <div className="d-flex flex-column align-items-center flex-grow-1"
        style={{justifyContent: 'space-evenly'}}
      >

        <Card>
          <Card.Body className="text-center" style={{width: '310px'}}>
            This is some text within a card body.
          </Card.Body>
        </Card>
      
        <Carousel pause="hover" indicators={false} data-bs-theme="dark"
          style={{height: '37rem', width: '310px'}}>
          {reviews.map((review) => (

            <Carousel.Item key={review._id}>
              <div onClick={() => handleCarouselItemClick(review._id, currentUser._id)}>
                <Card bg="light" 
                style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)', margin:'10px', marginBottom:'132px'}}>
                  <div bg='light' 
                  style={{padding:"10px", display: "flex", flexDirection:"row"}}>
                    <Card.Img style={{width:"50px", height:"50px", 
                    borderRadius: "50%", objectFit: "cover",}}
                    src="http://dummyimage.com/50x50/ced4da/6c757d.jpg"
                    alt="Image Alt Text">
                    </Card.Img>
                    <Card.Body style={{padding: '0px', marginLeft: '10px', 
                      display: 'flex', flexDirection: 'row'}}>
                      <div style={{display:'flex', justifyContent:'space-around'}}>
                        {users.find(user => user._id === review.user)
                        ? users.find(user => user._id === review.user).nickname
                        : 'unkown'} 
                        <br/> {review.createdAt}
                      </div>
                    </Card.Body>
                  </div>
                  <div style={{padding:"10px"}}>
                    <Card.Img style={{width:"144px", height:"96px"}}
                      src="http://dummyimage.com/128x96/ced4da/6c757d.jpg"
                      alt="Image Alt Text"
                    />
                  </div>
                  <div style={{padding:"10px", height:'320px'}}>
                    <h5>{review?.title ? review?.title : 'untitled'}</h5>
                    <Card.Text>
                      {review.review.length > 120 ? `${review.review.slice(0, 120)}...` : review.review}
                    </Card.Text>
                  </div>
                </Card>
              </div>
              <Carousel.Caption>
                <h5>{review?.booktitle}</h5>
                <p>{review.author}</p>
              </Carousel.Caption>
            </Carousel.Item>

          ))}
        </Carousel>

      </div>

      <Footer />
    </div>
  )
}

export default HomePage