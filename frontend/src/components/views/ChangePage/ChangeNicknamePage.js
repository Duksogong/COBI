import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeNickname } from "../../../_actions/nickname_action";

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { FaChevronLeft } from "react-icons/fa6";

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
            <div>닉네임 변경</div>
          </Navbar.Brand>
        </Container>
      </Navbar>

      <form style={{display: 'flex', flexDirection: 'column', padding:'2em 3em'}}
        className="flex-grow-1" onSubmit={onSubmitHandler}>

        <label style={{fontFamily:'Arial, sans-serif',
          fontSize:'22px', fontWeight:'500', display: 'flex',
          alignItems: 'center'}}>변경 닉네임</label>
        <input type="text" value={Nickname} onChange={onNicknameHandler}
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

export default ChangeNicknamePage