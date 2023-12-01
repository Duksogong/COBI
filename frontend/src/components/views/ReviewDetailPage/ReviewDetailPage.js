import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
// import { selectCategory } from "../../../_actions/category_actions";
// import { deselectCategory } from "../../../_actions/category_actions";

function ReviewDetailPage() {
    // useParams 훅을 사용하여 reviewId 추출
    const { reviewId } = useParams();
 
    const [users, setUsers] = useState([]);
    const [detail, setDetail] = useState(null); 

    
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
    }, []);
  
    return (
        <div style={{ 
            display: 'flex', justifyContent: 'center', flexDirection: 'column',
            alignItems: 'center', width: '100%', height: '100vh'
        }}>
        
            <div style={{backgroundColor: 'mistyrose', position: 'relative',
            minWidth: '300px', minHeight: '500px'}}>
                <button style={{border: '2px solid green', 
                position: 'absolute', top: '-15px', right: '30px'}}>
                    책갈피
                </button>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{width: '50px', height: '50px', overflow: 'hidden', marginRight: '10px',
                        borderRadius: '50%', backgroundColor: 'gray', margin: '5px'}}>프사</div>
                        <div>{
                            users.find(user => user._id === detail.user)
                            ? users.find(user => user._id === detail.user).nickname
                            : 'unkown'
                        }</div>
                    </div>
                    <hr/>
                    <div>이미지</div>
                    <h4>{detail.title}</h4>
                    <p style={{ fontSize: '10px'}}>{detail.review}</p>
                </div>
                <div style={{ position: 'absolute', bottom: '10px', left: '10px', border: '1px solid black'}}>
                    <div>댓글</div>
                </div>
            </div>
        
        </div>
    );
}

export default ReviewDetailPage