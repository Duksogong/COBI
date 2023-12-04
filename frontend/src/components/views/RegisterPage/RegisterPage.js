import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../_actions/user_action";
import logo from '../../../src_assets/logo.png';

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Nickname, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  }
  const onNicknameHandler = (event) => {
    setName(event.currentTarget.value);
  }
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  }
  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  }
  const onSubmitHandler = (event) => {
    event.preventDefault();

    if(Password !== ConfirmPassword) {
      return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
    }

    let body = {
      email: Email,
      nickname: Nickname,
      password: Password,
    }

    dispatch(registerUser(body))
    .then( response => {
      if(response.payload.success) {
        navigate('/login');
      } else {
        alert('회원가입 실패');
      }
    })

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
              alignItems: 'center'}}>닉네임</label>
            <input type="text" value={Nickname} onChange={onNicknameHandler}
              style={{borderColor:'#A9B388', borderRadius:'8px', borderStyle:'solid',
                height:'3.2rem', marginBottom:'16px'}}/>

            <label style={{fontFamily:'Arial, sans-serif',
              fontSize:'22px', fontWeight:'500', display: 'flex',
              alignItems: 'center'}}>비밀번호</label>
            <input type="password" value={Password} onChange={onPasswordHandler}
              style={{borderColor:'#A9B388', borderRadius:'8px', borderStyle:'solid',
                height:'3.2rem', marginBottom:'16px'}}/>

            <label style={{fontFamily:'Arial, sans-serif',
              fontSize:'22px', fontWeight:'500', display: 'flex',
              alignItems: 'center'}}>비밀번호 확인</label>
            <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}
              style={{borderColor:'#A9B388', borderRadius:'8px', borderStyle:'solid',
                height:'3.2rem', marginBottom:'16px'}}/>

          </div>


          <button style={{margin:"30px 0px", borderRadius:'25px', height:'48px',
            backgroundColor:'#A9B388', fontFamily:'Arial, sans-serif',
            fontSize:'22px', fontWeight:'bold', color:'white', display: 'flex',
            alignItems: 'center',justifyContent: 'center', border:'none'}}
            onClick={() => { navigate(`/login`); }} type="submit"
          >
            회원가입
          </button>

          <div onClick={() => navigate('/')}>돌아가기</div>

        </form>
      </div>
    </div>












  //   <div style={{ 
  //     display: 'flex', justifyContent: 'center', alignItems: 'center',
  //     width: '100%', height: '100vh'
  // }}>
  //   <form style={{display: 'flex', flexDirection: 'column'}}
  //     onSubmit={onSubmitHandler}>

  //     <label>Email</label>
  //     <input type="email" value={Email} onChange={onEmailHandler} />

  //     <label>Nickname</label>
  //     <input type="text" value={Nickname} onChange={onNicknameHandler} />

  //     <label>Password</label>
  //     <input type="password" value={Password} onChange={onPasswordHandler} />

  //     <label>Confirm Password</label>
  //     <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />

  //     <br />
  //     <button type="submit">
  //       회원가입
  //     </button>
  //   </form>
  // </div>
  )
}

export default RegisterPage