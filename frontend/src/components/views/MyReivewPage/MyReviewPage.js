import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getReview } from '../../../_actions/review_action';
import { searchBookISBN } from '../../../_actions/search_action';

import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';


function MyReviewPage() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const currentUserId = useSelector(state => state.user.success._id)

  const [option, setOption] = useState("최신순")
  const [reviews, setReviews] = useState([])
  //const [books, setBooks] = useState({})

  useEffect(() => {
    //감상평 목록 가져오기
    dispatch(getReview())
      .then(response => {
        if(response.payload.success) {
          setReviews(response.payload.reviews)
        }
      })
  }, [])

  // useEffect(() => {
  //   //각 감상평에 대한 책 정보 저장
  //   const fetch = async () => {
  //     const bookDetails = {}

  //     //책 정보 불러오기
  //     const fetchBookDetail = async (isbn) => {
  //       try {
  //         let body = {
  //           query: isbn,
  //         }

  //         const response = await dispatch(searchBookISBN(body))
  //         if(response.payload.success) {
  //           return response.payload.result
  //         } else {
  //           return { title: "unknown" }
  //         }
  //       } catch (err) {
  //         return { title: "unknown" }
  //       }
  //     }

  //     //Promise.all을 사용하여 비동기 작업을 병렬로 처리
  //     await Promise.all(reviews.map(async (review) => {
  //       const isbn = review.isbn
  //       if(!books[isbn]) {
  //         const book = await fetchBookDetail(isbn)
  //         bookDetails[isbn] = book
  //       }
  //     }))
  //     setBooks((prevBooks) => ({ ...prevBooks, ...bookDetails }))
  //   }
  //   fetch()
  // }, [reviews])

  const onOptionDate = () => {
    setOption("최신순")
    setReviews([...reviews].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)))
  }

  const onOptionDictionary = () => {
    setOption("사전순")
    setReviews([...reviews].sort((a, b) => {
      const titleA = a.title || ""; // null 또는 undefined인 경우 빈 문자열로 대체
      const titleB = b.title || ""; // null 또는 undefined인 경우 빈 문자열로 대체
  
      // 비교 함수를 통해 정렬, null 또는 undefined인 경우를 고려하여 처리
      return titleA.localeCompare(titleB);
    }))
  }

  const onClickHandler = (reviewId, userId) => {
    navigate(`/review_detail/${reviewId}/${userId}`);
  }

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
          {reviews.length === 0 && (
            <p>감상평을 작성해보세요.</p>
          )}

          {reviews.length > 0 && reviews.map((result, idx) => (
            <Card key={idx} onClick={() => onClickHandler(result._id, currentUserId)}
            style={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)', margin:'10px', marginBottom:'20px', border:'none' }}>
              <div style={{padding: '10px'}}>
                <div style={{display: "flex", flexDirection:"row"}}> 
                  <div>
                    <img style={{width:"50px", height:"70px", marginRight:'10px',
                      borderRadius: "10%", objectFit: "cover",}}
                      src={result.bookimage ? result.bookimage : "http://dummyimage.com/50x70/ced4da/6c757d.jpg" }
                      alt="Image Alt Text"/>
                  </div>
                  <div style={{width: '260px', fontSize:'16px', 
                    display:'flex', flexDirection: 'column', justifyContent:'space-around'}}>
                    <div style={{ margin:'5px', fontSize:'15px', fontWeight:'bold', maxWidth:'260px', whiteSpace: 'nowrap', overflow:'hidden', textOverflow: 'ellipsis' }}>
                      책제목 : {result.booktitle ? result.booktitle : "unknown"}
                    </div>
                    <div style={{ margin:'5px', fontSize:'15px', fontWeight:'bold', maxWidth:'260px', whiteSpace: 'nowrap', overflow:'hidden', textOverflow: 'ellipsis' }}>
                      글제목 : {result.title}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <Footer />  
    </div>
  )
}

export default MyReviewPage