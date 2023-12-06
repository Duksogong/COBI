import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../_actions/user_action";
import logo from '../../../src_assets/logo.png';

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  }
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  }
  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log('dslfksdlfksdjf')
    let body = {
      email: Email,
      password: Password
    }

    dispatch(loginUser(body))
    .then( response => {
      if(response.payload.success) {
        navigate('/home');
      } else {
        alert('로그인 실패');
      }
    });
  }

  return (
    <div className="d-flex flex-column align-items-center"
      style={{height:'840px', display: 'flex',
      alignItems: 'center',justifyContent: 'center'}}
    >
      <img style={{width: '240px', margin:"40px 0px"}}
        src={logo}
        alt="Image Alt Text">
      </img>
      <div style={{textAlign:'center', width: '260px'}}>
        <form style={{display: 'flex', flexDirection: 'column'}}
          onSubmit={onSubmitHandler}
        >
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <label style={{fontFamily:'Arial, sans-serif',
              fontSize:'22px', fontWeight:'500', display: 'flex',
              alignItems: 'center'}}>이메일</label>
            <input type="email" value={Email} onChange={onEmailHandler} 
              style={{borderColor:'#A9B388', borderRadius:'8px', borderStyle:'solid',
                height:'3.2rem', marginBottom:'16px'}}/>
            <label style={{fontFamily:'Arial, sans-serif',
              fontSize:'22px', fontWeight:'500', display: 'flex',
              alignItems: 'center'}}>비밀번호</label>
            <input type="password" value={Password} onChange={onPasswordHandler}
              style={{borderColor:'#A9B388', borderRadius:'8px', borderStyle:'solid',
                height:'3.2rem', marginBottom:'16px'}}/>
          </div>
          <button style={{margin:"30px 0px", borderRadius:'25px', height:'48px',
            backgroundColor:'#A9B388', fontFamily:'Arial, sans-serif',
            fontSize:'22px', fontWeight:'bold', color:'white', display: 'flex',
            alignItems: 'center',justifyContent: 'center', border:'none'}}
            type="submit"
          >
            로그인
          </button>
          <div onClick={() => navigate('/')}>돌아가기</div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage