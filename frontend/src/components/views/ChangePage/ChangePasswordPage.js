import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../../_actions/password_action";

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { FaChevronLeft } from "react-icons/fa6";

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
        navigate('/change_category');
      } else {
        alert('Error');
      }
    });

  }



  return (
    <div className="d-flex flex-column" style={{height: '100vh', position: 'relative'}}>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="/change_category"
            style={{display:'flex', alignItems: 'center', justifyContent: 'center'}}  
          >
            <FaChevronLeft style={{marginRight:'10px', fontSize:'1.3em'}}/>
            <div>비밀번호 변경</div>
          </Navbar.Brand>
        </Container>
      </Navbar>

      <form style={{display: 'flex', flexDirection: 'column', padding:'2em 3em'}}
        className="flex-grow-1" onSubmit={onSubmitHandler}>

        <label style={{fontFamily:'Arial, sans-serif',
          fontSize:'22px', fontWeight:'500', display: 'flex',
          alignItems: 'center'}}>현재 비밀번호</label>
        <input type="password" value={password} onChange={onPasswordHandler}
          style={{borderColor:'#A9B388', borderRadius:'8px', borderStyle:'solid',
            height:'3.2rem', marginBottom:'16px'}}/>

        <label style={{fontFamily:'Arial, sans-serif',
          fontSize:'22px', fontWeight:'500', display: 'flex',
          alignItems: 'center'}}>변경 비밀번호</label>
        <input type="password" value={newPW1} onChange={onNewPW1Handler}
          style={{borderColor:'#A9B388', borderRadius:'8px', borderStyle:'solid',
            height:'3.2rem', marginBottom:'16px'}}/>

        <label style={{fontFamily:'Arial, sans-serif',
          fontSize:'22px', fontWeight:'500', display: 'flex',
          alignItems: 'center'}}>비밀번호 확인</label>
        <input type="password" value={newPW2} onChange={onNewPW2Handler}
          style={{borderColor:'#A9B388', borderRadius:'8px', borderStyle:'solid',
            height:'3.2rem', marginBottom:'16px'}}/>
        
        <button type="submit"
          style={{position: 'absolute', bottom: 0, left: 0, right: 0, height:'48px',
            backgroundColor:'#A9B388', fontFamily:'Arial, sans-serif',
            fontSize:'22px', fontWeight:'bold', color:'white', display: 'flex',
            alignItems: 'center',justifyContent: 'center', border:'none'}}>
          저장하기
        </button>
      </form>

    </div>
  )
}

export default ChangePasswordPage