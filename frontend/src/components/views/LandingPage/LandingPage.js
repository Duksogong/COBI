import React, { useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import logoImgDes from '../../../src_assets/logoImgDes.png';

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // client는 3000에서 보내는데 server는 5000이기 때문
    axios.get('/api/axios')
    .then(response => {console.log(response.data)})
  }, [])
  
  return (
    <div className="d-flex flex-column align-items-center"
      style={{height:'840px', display: 'flex',
      alignItems: 'center',justifyContent: 'center'}}
    >
      <img style={{width: '270px', margin:"70px 0px"}}
        src={logoImgDes}
        alt="Image Alt Text">
      </img>
      <div style={{textAlign:'center', width: '260px'}}>
        <div style={{margin:"20px 0px", borderRadius:'25px', height:'48px',
          backgroundColor:'#A9B388', fontFamily:'Arial, sans-serif',
          fontSize:'22px', fontWeight:'bold', color:'white', display: 'flex',
          alignItems: 'center',justifyContent: 'center'}}
          onClick={() => { navigate(`/login`); }}>
          로그인
        </div>
        <div style={{margin:"20px 0px", borderRadius:'25px', height:'48px',
          backgroundColor:'#A9B388', fontFamily:'Arial, sans-serif',
          fontSize:'22px', fontWeight:'bold', color:'white', display: 'flex',
          alignItems: 'center',justifyContent: 'center'}}
          onClick={() => { navigate(`/register`); }}>
          회원가입
        </div>
      </div>
    </div>
  )
}

export default LandingPage