import './HomePage.css'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { kadvice } from 'kadvice';

import { getFeed, getRec } from '../../../_actions/review_action';

import { IoMdRefresh } from "react-icons/io";
import { FaRegCommentDots } from "react-icons/fa";

import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [advice, setAdvice] = useState("");

  const [cookie, setCookie] = useState("")
  const [currentUser, setCurrentUser] = useState("");

  const [users, setUsers] = useState([]);
  const [reviews, setReviews] = useState([]);

  const [radioValue, setRadioValue] = useState('feed');
  const radios = [
    { name: '피드', value: 'feed' },
    { name: '추천', value: 'rec' },
  ];

  useEffect(() => {
    // 현재 브라우저 쿠키에서 값(토큰) 가져오기
    const cookies = document.cookie.split('='); 
    setCookie(cookies[1]);

    //렌더 시, 랜덤 명언 출력
    setAdvice(kadvice.getOne());

    //감상평 목록 출력
    if(radioValue === 'feed') {
      dispatch(getFeed())
        .then(response => {
          if(response.payload.success) {
            setReviews(response.payload.reviews)
          }
        })
    } else if (radioValue === 'rec') {
      dispatch(getRec())
        .then(response => {
          if(response.payload.success) {
            setReviews(response.payload.reviews)
          }
        })
    }

    // 서버에서 유저 데이터를 가져오기
    axios.get('/api/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));
  }, [])
  
  // users 리스트에서 cookie값을 token으로 가진 유저 찾기 (로그인 상태 유저 찾기)
  useEffect(() => {
    for (let i=0; i<users.length; i++) {
      if (users[i].token === cookie){
        setCurrentUser(users[i]);
        break;
      }
    }
  }, [cookie, users]);

  useEffect(() => {
    //감상평 목록 출력
    if(radioValue === 'feed') {
      dispatch(getFeed())
        .then(response => {
          if(response.payload.success) {
            setReviews(response.payload.reviews)
          }
        })
    } else if (radioValue === 'rec') {
      dispatch(getRec())
        .then(response => {
          if(response.payload.success) {
            setReviews(response.payload.reviews)
          }
        })
    }
  }, [radioValue])

  //명언 새로고침 이벤트
  const onRefreshHandler = (event) => {
    setAdvice(kadvice.getOne())
  }

  //명언 상세보기 이벤트
  const onDetailAdviceHandler = (event) => {
    //add...
    alert(`${advice.message}\n- ${advice.author}`)
  }

  //클릭 이벤트 처리
  const handleCarouselItemClick = (reviewId, userId) => {
    navigate(`/review_detail/${reviewId}/${userId}`);
  };
  
  return (
    <div className="d-flex flex-column" style={{height: '100vh'}}>
      <NavBar />

      <div className="d-flex flex-column align-items-center flex-grow-1"
        style={{justifyContent: 'space-evenly'}}
      >

        <Card>
          <Card.Body className="text-center" style={{width: '310px', height: '6rem'}}>
            <div onClick={onDetailAdviceHandler} style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
              <p style={{display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden', WebkitLineClamp: 2, fontSize: '12px',}}>
                {advice.message}
              </p>
              <p style={{margin: '0px', padding: '16px', position: 'absolute', bottom: '0', right: '0', fontSize: '12px'}}>
                「{advice.author}」
              </p>
            </div>
            
            <span onClick={onRefreshHandler} style={{padding: '14px', position: 'absolute', bottom: '0', left: '0'}}><IoMdRefresh /></span>
          </Card.Body>
        </Card>
      
        <Carousel pause="hover" indicators={false} data-bs-theme="dark"
        style={{width:'310px'}}>
          {reviews.map((review) => (
            <Carousel.Item key={review._id}>
              <Card onClick={() => handleCarouselItemClick(review._id, currentUser._id)} bg="light" text="dark"
              style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)', margin:'10px', height: '30rem' }}>
                  <Card.Header
                  style={{ borderBottom:'solid 1px #dcdcdc', display:'flex' }}>
                      <Card.Img style={{ width:"40px", height:"40px", borderRadius: "50%", objectFit: "cover" }}
                          src="http://dummyimage.com/50x50/ced4da/6c757d.jpg"
                          alt="Image Alt Text">
                      </Card.Img>
                      <div style={{ flexDirection:'column', marginLeft:'10px' }}>
                          <p style={{ margin:'0px' }}>
                            {users.find(user => user._id === review.user)
                            ? users.find(user => user._id === review.user).nickname
                            : 'unkown'}
                          </p>
                          <p style={{ margin:'0px', fontSize:'12px'}}>
                            {new Date(review.created_at).toLocaleString('ko-KR', {
                              year: 'numeric',
                              month: '2-digit',
                              day: '2-digit',
                              hour: '2-digit',
                              minute: '2-digit',
                              second: '2-digit',
                            })}
                          </p>
                      </div>
                  </Card.Header>
                  <Card.Body>
                      <Card.Img style={{ width:'144px', height: '96px' }}
                          src="http://dummyimage.com/128x96/ced4da/6c757d.jpg"
                          alt="Image Alt Text">
                      </Card.Img>
                      <div style={{ marginTop:'10px' }}>
                          <Card.Title>{review?.title ? review?.title : 'untitled'}</Card.Title>
                          <Card.Text>{review.review.length > 150 ? (<>{`${review.review.slice(0, 150)}... `}<br />더보기</>) : review.review}</Card.Text>
                      </div>
                  </Card.Body>
                  <Card.Footer 
                  style={{ borderTop:'solid 1px #dcdcdc' }}>
                      <FaRegCommentDots />
                  </Card.Footer>
              </Card>
          </Carousel.Item>
          ))}
        </Carousel>
        <ButtonGroup>
          {radios.map((radio, index) => (
            <ToggleButton
              key={index}
              id={`radio-${index}`}
              type="radio"
              variant={'outline-dark'}
              name="radio"
              value={radio.value}
              checked={radioValue === radio.value}
              onChange={(e) => setRadioValue(e.currentTarget.value)}
              style={{borderRadius: index%2? '0 15px 15px 0':'15px 0 0 15px'}}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </div>
      <Footer />
    </div>
  )
}

export default HomePage