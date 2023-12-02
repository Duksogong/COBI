import React, { useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // client는 3000에서 보내는데 server는 5000이기 때문
    axios.get('/api/axios')
    .then(response => {console.log(response.data)})
  }, [])
  
  return (
    <div style={{ 
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', minHeight: '32rem', flexDirection: 'column'
      }}>
      <img style={{width:"300px", height:"180px"}}
        src="http://dummyimage.com/300x180/ced4da/6c757d.jpg"
        alt="Image Alt Text">
      </img>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div style={{margin:'10px'}}
        onClick={() => { navigate(`/login`); }}>
          로그인
        </div>
        <div style={{margin:'10px'}}
        onClick={() => { navigate(`/register`); }}>
          회원가입
        </div>
      </div>
    </div>
  )
}

export default LandingPage