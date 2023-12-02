import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../_actions/user_action";

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
    <div style={{ 
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', height: '100vh'
  }}>
    <form style={{display: 'flex', flexDirection: 'column'}}
      onSubmit={onSubmitHandler}>

      <label>Email</label>
      <input type="email" value={Email} onChange={onEmailHandler} />

      <label>Nickname</label>
      <input type="text" value={Nickname} onChange={onNicknameHandler} />

      <label>Password</label>
      <input type="password" value={Password} onChange={onPasswordHandler} />

      <label>Confirm Password</label>
      <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />

      <br />
      <button type="submit">
        회원가입
      </button>
    </form>
  </div>
  )
}

export default RegisterPage