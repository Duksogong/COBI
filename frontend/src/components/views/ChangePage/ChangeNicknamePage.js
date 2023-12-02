import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeNickname } from "../../../_actions/nickname_action";

function ChangeNicknamePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [Nickname, setNickname] = useState("");

  const onNicknameHandler = (event) => {
    setNickname(event.currentTarget.value);
  }
  const onSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
      newNickname: Nickname,
    }

    dispatch(changeNickname(body))
    .then( response => {
      if(response.payload.success) {
        navigate('/');
      } else {
        alert('Error');
      }
    });

  }



  return (
    <div style={{ 
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', height: '100vh'
  }}>
    <form style={{display: 'flex', flexDirection: 'column'}}
      onSubmit={onSubmitHandler}>

      <label>new nickname</label>
      <input type="text" value={Nickname} onChange={onNicknameHandler} />
      
      <br />
      <button type="submit">
        Change
      </button>
    </form>
  </div>
  )
}

export default ChangeNicknamePage