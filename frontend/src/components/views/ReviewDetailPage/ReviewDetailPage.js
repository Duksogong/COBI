import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { selectBookmark } from "../../../_actions/bookmark_action";
import { deselectBookmark } from "../../../_actions/bookmark_action";
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import Card from 'react-bootstrap/Card';
import { FaRegCommentDots } from "react-icons/fa6";
import { HiMiniBookmark } from "react-icons/hi2";import { HiOutlineBookmark } from "react-icons/hi2";

function ReviewDetailPage() {
    //const navigate = useNavigate();
    const dispatch = useDispatch();

    const [users, setUsers] = useState([]);
    const [detail, setDetail] = useState(null); 

    const [bookmarks, setBookmarks] = useState([]);
    const [selectedBookmarks, setSelectedBookmarks] = useState([]);

    // useParams 훅을 사용하여 reviewId 추출
    const { reviewId } = useParams();
    const { currentUser } = useParams();

    // 유저 데이터를 가져오기
    useEffect(() => {
        axios.get('/api/users')
        .then(response => setUsers(response.data))
        .catch(error => console.error(error));
    }, []);

    // 감상평 데이터 가져오기
    useEffect(() => {
        axios.get('/api/users/review')
        .then(response => {
            const selectedReview = response.data.find(review => review._id === reviewId);
            if (selectedReview) {
                setDetail(selectedReview);
            } else {
            console.error(`ID가 ${reviewId}인 리뷰를 찾을 수 없습니다`);
            }
        })
        .catch(error => console.error(error));
    }, [reviewId]);

    useEffect(() => {
      // 북마크 데이터 가져오기
      axios.get('/api/users/bookmark')
      .then(response => {
          setBookmarks(response.data) 
      })
      .catch(error => console.error(error));
    }, []); 

    // 북마크 유저것만 골라내기
    useEffect(() => {
      const filteredBookmarks = bookmarks.filter(bm => bm.userId === currentUser);
      const selectedReviewIds = filteredBookmarks.map(bm => bm);
      setSelectedBookmarks(selectedReviewIds);
    }, [bookmarks, currentUser]);

    const onSetBookmark = () => {
  
      let body = {
        userId: currentUser,
        reviewId: detail._id
      }

      let funBool = selectedBookmarks.find((bookmark) => bookmark.reviewId === reviewId)
        ? false : true ;

      if (funBool) {
        dispatch(selectBookmark(body))
        .then( response => {
          if(response.payload.success) {
            window.location.replace(`/review_detail/${detail._id}/${currentUser}`)
          } else {
            alert('북마크 추가 실패');
          }
        });
      } else {
        dispatch(deselectBookmark(body))
        .then( response => {
          if(response.payload.success) {
            window.location.replace(`/review_detail/${detail._id}/${currentUser}`)
          } else {
            alert('북마크 삭제 실패');
          }
        });
      }
    }
  
    return (
      <div className="d-flex flex-column" style={{height: '100vh'}}>
        <NavBar />
      
        <div className="d-flex flex-column align-items-center flex-grow-1"
          style={{justifyContent: 'space-evenly'}}
        >
          <Card 
            bg="light"  
            style={{ position: 'relative',width:'310px',height: '40rem',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)', margin:'10px', marginBottom:'20px', border:'none',
            }}
          >

            <HiMiniBookmark   style={{position: 'absolute', top: '-15px', right: '30px', fontSize:'40px',
              backgroundColor: selectedBookmarks.find((bookmark) => bookmark.reviewId === reviewId)
                ? 'green': 'white',
            }} onClick={() => onSetBookmark()}/>

            <div style={{ display: 'flex', alignItems: 'center', padding:'10px', borderBottom:'1px solid'}}>
              <Card.Img style={{width:"50px", height:"50px", 
                borderRadius: "50%", objectFit: "cover",}}
                src="http://dummyimage.com/50x50/ced4da/6c757d.jpg"
                alt="Image Alt Text">
              </Card.Img>
              <Card.Body style={{padding: '0px', marginLeft: '10px', 
                display: 'flex', flexDirection: 'row'}}>
                <div style={{display:'flex', justifyContent:'space-around'}}>{
                  users.find(user => user._id === detail?.user)
                  ? users.find(user => user._id === detail.user).nickname : 'unkown'
                }</div>
              </Card.Body>
            </div>
              
            <div style={{padding:'10px', display: 'flex', justifyContent:'space-around', flexDirection:"column"}}>
              <Card.Img style={{width:"144px", height:"96px"}}
                src="http://dummyimage.com/128x96/ced4da/6c757d.jpg"
                alt="Image Alt Text"
              />
              <h4>{detail?.title}</h4>
              <p style={{ fontSize: '16px', height: '24rem', overflow: 'auto'}}>{detail?.review}</p>
            </div>

            <FaRegCommentDots 
              style={{ position: 'absolute', bottom: '10px', left: '10px'}}
            />
            </Card>
        </div>

        <Footer />
      </div>
    );
}

export default ReviewDetailPage