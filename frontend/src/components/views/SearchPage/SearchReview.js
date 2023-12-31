import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';

import { searchBookISBN } from '../../../_actions/search_action';
import { findUser } from '../../../_actions/user_action';
import { getFeedIsbn, getRecIsbn } from '../../../_actions/review_action';

import { FaRegCommentDots } from "react-icons/fa";

import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

function SearchPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isbn } = useParams()
  const currentUserId = useSelector(state => state.user.success._id)

  const [book, setBook] = useState("")
  const [reviews, setReviews] = useState([])
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState({})

  const [radioValue, setRadioValue] = useState('feed')
  const radios = [
    { name: '피드', value: 'feed' },
    { name: '추천', value: 'rec' },
  ];

  useEffect(() => {
    let body = {
      query: isbn,
    }

    //도서 정보 가져오기
    dispatch(searchBookISBN(body))
      .then(response => {
        if(response.payload.success) {
          setBook(response.payload.result)
        }
      })

    //감상평 가져오기
    dispatch(getFeedIsbn(isbn))
      .then(response => {
        if(response.payload.success) {
          setReviews(response.payload.reviews)
        }
      })
    
    //카테고리를 가져오기
    axios.get('/api/users/categories')
      .then(response => setCategories(response.data))
      .catch(err => console.error(err))
  }, [isbn])

  useEffect(() => {
    //감상평 목록 출력
    if(radioValue === 'feed') {
      dispatch(getFeedIsbn(isbn))
        .then(response => {
          if(response.payload.success) {
            setReviews(response.payload.reviews)
          }
        })
    } else if (radioValue === 'rec') {
      dispatch(getRecIsbn(isbn))
        .then(response => {
          if(response.payload.success) {
            setReviews(response.payload.reviews)
          }
        })
    }
  }, [radioValue])

  useEffect(() => {
    //각 감상평에 대한 사용자 정보 저장
    const fetch = async () => {
      const authorDetails = {}

      //사용자 정보 불러오기
      const fetchUserDetail = async (userId) => {
        try {
          const response = await dispatch(findUser(userId))
          if(response.payload.success) {
            return response.payload.result
          } else {
            return { nickname: "unknown" }
          }
        } catch (err) {
          return { nickname: "unknown" }
        }
      }

      //Promise.all을 사용하여 비동기 작업을 병렬로 처리
      await Promise.all(reviews.map(async (review) => {
        const userId = review.user
        const categoryId = review.category
        if(!authors[userId]) {
          const user = await fetchUserDetail(userId)
          authorDetails[userId] = user
        }
      }))
      setAuthors((prevAuthors) => ({ ...prevAuthors, ...authorDetails }))
    }
    fetch()
  }, [reviews])

  //댓글 이벤트 처리
  const onCommentHandler = (reviewId) => {
    alert(`감상평: ${reviewId}에 대한 댓글 작성중...`)
  }

  //클릭 이벤트 처리
  const handleCarouselItemClick = (reviewId) => {
    navigate(`/review_detail/${reviewId}/${currentUserId}`);
  };

  return(
    <div className="d-flex flex-column" style={{height: '100vh'}}>
      <NavBar />

      <div className="d-flex flex-column align-items-center flex-grow-1"
        style={{justifyContent: 'space-evenly'}}>

        <Card style={{width:'280px', margin:'15px'}}>
          <Container>
            <Row>
              <Col xs={2} className="d-flex align-items-center justify-content-center">
                <img style={{ width:'60px', height:'80px', objectFit:'cover' }}
                  src={book.image}
                  alt="표지준비중"/>
              </Col>
              <Col xs={10} className="d-flex flex-column align-items-center justify-content-center">
                <p style={{ margin:'5px', fontSize:'15px', fontWeight:'bold', display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden', WebkitLineClamp: 2 }}>
                  {book.title}
                </p>
                <p style={{ margin:'5px', fontSize:'12px', color:'#808080', maxWidth:'260px', whiteSpace: 'nowrap', overflow:'hidden', textOverflow: 'ellipsis' }}>
                  {book.publisher} | {book.author} | {book.pubdate}
                </p>
              </Col>
            </Row>
          </Container>
        </Card>
      
        <Carousel pause="hover" indicators={false} data-bs-theme="dark"
        style={{width:'310px'}}>
          {reviews.length === 0 && (
            <p style={{ height:'30rem', lineHeight:'30rem', textAlign:'center' }}>
              감상평이 없습니다.
            </p>
          )}

          {reviews.length > 0 && reviews.map((review) => (
            <Carousel.Item key={review._id}>
            <Card bg="light" text="dark"
            style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)', margin:'10px', height: '30rem' }}>
                <Card.Header
                style={{ borderBottom:'solid 1px #dcdcdc', display:'flex' }}>
                    <Card.Img style={{ width:"40px", height:"40px", borderRadius: "50%", objectFit: "cover" }}
                        src="http://dummyimage.com/50x50/ced4da/6c757d.jpg"
                        alt="Image Alt Text">
                    </Card.Img>
                    <div style={{ flexDirection:'column', marginLeft:'10px' }}>
                        <p style={{ margin:'0px' }}>
                          {authors[review.user] ? authors[review.user].nickname : "unknown"}
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
                <Card.Body onClick={() => handleCarouselItemClick(review._id, currentUserId)}>
                    <Card.Img style={{ width:'144px', height: '96px' }}
                        src="http://dummyimage.com/128x96/ced4da/6c757d.jpg"
                        alt="Image Alt Text">
                    </Card.Img>
                    <div style={{ marginTop:'10px' }}>
                        <Card.Title style={{ whiteSpace: 'nowrap', overflow:'hidden', textOverflow: 'ellipsis' }}>{review?.title ? review?.title : 'untitled'}</Card.Title>
                        <Card.Text>{review.review.length > 150 ? (<>{`${review.review.slice(0, 150)}... `}<br /><span style={{ color:'#808080', fontSize:'12px' }}>더보기</span></>) : review.review}</Card.Text>
                    </div>
                </Card.Body>
                <Card.Footer 
                style={{ borderTop:'solid 1px #dcdcdc', position: 'relative', display:'flex', alignItems:'center' }}>
                    <FaRegCommentDots onClick={() => onCommentHandler(review._id)} />
                    <span className='text-muted' style={{ fontSize:'12px', position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}>
                      카테고리: {categories.find(category => category._id === review.category)?.name || '기타'}
                    </span>
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

export default SearchPage