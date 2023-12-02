import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../../_actions/password_action";

function ChangePasswordPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [password, setPassword] = useState("");
  const [newPW1, setNewPW1] = useState("");
  const [newPW2, setNewPW2] = useState("");

  const onPasswordHandler = (event) => { 
    setPassword(event.currentTarget.value);
  }
  const onNewPW1Handler = (event) => { 
    setNewPW1(event.currentTarget.value);
  }
  const onNewPW2Handler = (event) => { 
    setNewPW2(event.currentTarget.value);
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();

    let body = { 
      password: password,
      newPW1: newPW1,
      newPW2: newPW2,
    }

    dispatch(changePassword(body))
    .then( response => {
      if(response.payload.hashSuccess) {
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
      <label>current password</label> 
      <input type="password" value={password} onChange={onPasswordHandler} />
      <label>new password</label> 
      <input type="password" value={newPW1} onChange={onNewPW1Handler} />
      <label>new password confirm</label> 
      <input type="password" value={newPW2} onChange={onNewPW2Handler} />
      <br />
      <button type="submit">
        Change
      </button>
    </form>
  </div>
  )
}

export default ChangePasswordPage