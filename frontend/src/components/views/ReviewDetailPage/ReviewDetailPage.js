import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { selectBookmark } from "../../../_actions/bookmark_action";
import { deselectBookmark } from "../../../_actions/bookmark_action";

function ReviewDetailPage() {
    const navigate = useNavigate();
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
      <div style={{ 
        display: 'flex', justifyContent: 'center', flexDirection: 'column',
        alignItems: 'center', width: '100%', height: '100vh'
      }}>
      
        <div style={{backgroundColor: 'mistyrose', position: 'relative',
        minWidth: '300px', minHeight: '500px'
        }}>
            <button style={{border: '2px solid', 
            position: 'absolute', top: '-15px', right: '30px', 
            backgroundColor: selectedBookmarks.find((bookmark) => bookmark.reviewId === reviewId)
              ? 'green': 'white',
            }} onClick={() => onSetBookmark()}>
              책갈피
            </button>
            <div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{width: '50px', height: '50px', overflow: 'hidden', marginRight: '10px',
                borderRadius: '50%', backgroundColor: 'gray', margin: '5px'
                }}>프사</div>
                <div>{
                  users.find(user => user._id === detail?.user)
                  ? users.find(user => user._id === detail.user).nickname : 'unkown'
                }</div>
              </div>
              <hr/>
              <div>이미지</div>
              <h4>{detail?.title}</h4>
              <p style={{ fontSize: '10px'}}>{detail?.review}</p>
            </div>
            <div style={{ position: 'absolute', bottom: '10px', left: '10px', border: '1px solid black'}}>
              <div>댓글</div>
            </div>
        </div>

      </div>
    );
}

export default ReviewDetailPage