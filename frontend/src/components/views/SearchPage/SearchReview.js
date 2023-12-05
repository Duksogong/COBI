import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { searchBookISBN, searchReview } from '../../../_actions/search_action';
import { findUser } from '../../../_actions/user_action';
import { getFeed, getRec } from '../../../_actions/review_action';

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
  const currentUser = useSelector(state => state.user.success._id)

  const [book, setBook] = useState("")
  const [reviews, setReviews] = useState([])
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
    dispatch(searchReview(body))
      .then(response => {
        if(response.payload.success) {
          setReviews(response.payload.result)
        }
      })
  }, [isbn])

  useEffect(() => {
    //각 리뷰에 대한 사용자 정보 상태 저장
    const fetchAuthors = async () => {
      const authorDetails = {};

      // Promise.all을 사용하여 비동기 작업을 병렬로 처리
      await Promise.all(reviews.map(async (review) => {
        const userId = review.user;
        const user = await fetchUserDetail(userId);
        authorDetails[userId] = user;
      }));

      setAuthors(authorDetails)
    }

    fetchAuthors()
  }, [reviews])

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
  }, [reviews, authors, radioValue])

  //사용자 정보 불러오기
  const fetchUserDetail  = async (userId) => {
    try {
      const response = await dispatch(findUser(userId))
      if(response.payload.success) {
        return response.payload.result
      } else {
        return { nickname: "unknown" }
      }
    } catch {
      return { nickname: "unknown" }
    }
  }

  //클릭 이벤트 처리
  const handleCarouselItemClick = (reviewId) => {
    navigate(`/review_detail/${reviewId}/${currentUser}`);
  };

  return(
    <div className="d-flex flex-column" style={{height: '100vh'}}>
      <NavBar />

      <div className="d-flex flex-column align-items-center flex-grow-1"
        style={{justifyContent: 'space-evenly'}}>

        <Card>
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
          {reviews.map((review) => (
            <Carousel.Item key={review._id}>
              <Card onClick={() => handleCarouselItemClick(review._id)} bg="light" text="dark"
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

export default SearchPage