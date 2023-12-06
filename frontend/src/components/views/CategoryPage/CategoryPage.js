import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCategory } from "../../../_actions/category_actions";
import { deselectCategory } from "../../../_actions/category_actions";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FiPlus } from "react-icons/fi";

import NavBar from '../NavBar/NavBar'; // 상대 경로에 주의하여 수정
import Footer from '../Footer/Footer';

function CategoryPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [cookie, setCookie] = useState("");
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('65538dc8cca6a7a4cd35b548');
  const [selectedUserCategories, setSelectedUserCategories] = useState([]);


  /* User 모델에서 가져온 리스트 정보 확인 */
  console.log("user >>> ", users)

  useEffect(() => {
    // 현재 브라우저 쿠키에서 값(토큰) 가져오기
    const sample = document.cookie.split('=');
    const cookies = sample[1].split(';');
    setCookie(cookies[0]);
  }, []);

  /* 현재 브라우저 쿠키값(토큰) 확인 */
  console.log("쿠키값: ", cookie);

  useEffect(() => {
    // 서버에서 카테고리 데이터를 가져오기
    axios.get('/api/users/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error(error));
  }, []);
  
  useEffect(() => {
    // 서버에서 유저 데이터를 가져오기
    axios.get('/api/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    // users 리스트에서 cookie값을 token으로 가진 유저 찾기 (로그인 상태 유저 찾기)
    for (let i=0; i<users.length; i++) {
      if (users[i].token === cookie){
        setCurrentUser(users[i]);
        break;
      }
    }
  }, [cookie, users]);

  /* 토큰 값으로 찾은 User의 유저 _id */
  console.log("최종 유저: ", currentUser);

  useEffect(() => {
    // 서버에서 유저카테고리 데이터를 가져오기
    axios.get('/api/users/user_categories')
    .then(response => {
      response.data.map(uc => {
        if(uc.userId === currentUser._id) {
          setSelectedUserCategories(selectedUserCategories =>
            [...selectedUserCategories, uc.categoryId]
          );
        }
      })
    })
    .catch(error => console.error(error));
  }, [currentUser._id]);

  /* 유저카테고리 목록 */
  console.log("유저의 선택 카테고리: ", selectedUserCategories);

// ==========================================================

  const onCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  /* 드롭박스에서 선택된 카테고리 _id */ 
  console.log("add 최종 카테고리: ", selectedCategory);

  const onAddCategory = (event) => {
    event.preventDefault();

    let body = {
      // 현재 로그인된 유저의 ObjectId 받아와야 함
      userId: currentUser._id,
      categoryId: selectedCategory
    }

    dispatch(selectCategory(body))
    .then( response => {
      if(response.payload.success) {
        window.location.reload();
      } else {
        alert('카테고리 선택 실패');
      }
    });
  }

  const onDeleteCategory = (categoryId) => {

    /* 지울 카테고리 id */
    console.log("지울 카테고리 id >> ", categoryId)

    let body = {
      userId: currentUser._id,
      categoryId: categoryId
    }

    dispatch(deselectCategory(body))
    .then( response => {
      if(response.payload.success) {
        window.location.reload();
      } else {
        alert('카테고리 삭제 실패');
      }
    });
  }

  const getCategoryName = (categoryId) => {
    // 여기에서 categoryId에 따라 다른 문자열을 반환하도록 로직을 작성
    switch (categoryId) {
      case '65538dc8cca6a7a4cd35b548':
        return "소설";
      case '65538dd6cca6a7a4cd35b549':
        return "시/에세이";
      case '65538de1cca6a7a4cd35b54a':
        return "인문";
      case '65538de9cca6a7a4cd35b54b':
        return "가정/요리";
      case '65538df2cca6a7a4cd35b54c':
        return "경제/경영";
      case '65538dfecca6a7a4cd35b54d':
        return "자기계발";
      case '65538e07cca6a7a4cd35b54e':
        return "사회/정치";
      case '65538e0ecca6a7a4cd35b54f':
        return "역사";
      case '65538e14cca6a7a4cd35b550':
        return "종교";
      case '656f8d97c27e8e4307583e7a':
        return "예술/대중문화";
      case '656f8d0ac27e8e4307583e71':
        return "자연/과학";
      case '656f8d26c27e8e4307583e72':
        return "유아";
      case '656f8d35c27e8e4307583e73':
        return "어린이";
      case '656f8d3fc27e8e4307583e74':
        return "여행";
      case '656f8d4cc27e8e4307583e75':
        return "국어/외국어";
      case '656f8d5bc27e8e4307583e76':
        return "컴퓨터/IT";
      case '656f8d6ac27e8e4307583e77':
        return "청소년";
      case '656f8d76c27e8e4307583e78':
        return "수험서/자격증";
      case '656f8d8cc27e8e4307583e79':
        return "만화";
      case '65538e14cca6a7a4cd35b550':
        return "잡지";
      default:
        return "기타";
    }
  };

  const onClickHandler = () => {
    axios.get(`/api/users/logout`)
    .then(response => {
      if (response.data.success) {
        navigate('/')
      } else {
        alert("로그아웃하는데 실패했습니다.")
      }
    })
  }


  return (
    <div className="d-flex flex-column" style={{height: '100vh'}}>
      <NavBar />

      <div className="d-flex flex-column flex-grow-1"
        style={{overflow: 'auto', padding:'0px 40px'}}
      >

        <div style={{ display: 'flex', flexDirection:'column', alignItems: 'center', margin: '40px 0px'}}>
          <img style={{width:"100px", height:"100px", 
            borderRadius: "50%", objectFit: "cover",}}
            src="http://dummyimage.com/100x100/ced4da/6c757d.jpg"
            alt="Image Alt Text">
          </img>
          <Card.Body style={{padding: '0px', 
            display: 'flex', flexDirection: 'row'}}>
            <div style={{display:'flex', justifyContent:'space-around', margin:'8px',
              fontFamily: 'Georgia, Cursive', fontWeight: 'bold', fontSize:'16px', fontStyle:'italic'}}
            >{
              currentUser.nickname
              ? currentUser.nickname : 'unkown'
            }</div>
          </Card.Body>
        </div>

        <div onClick={() => { navigate(`/change_nickname`); }}
          style={{marginBottom:'20px', width: 'fit-content', 
          display:'flex', flexDirection:'column', justifyContent:'space-around',
          fontFamily:'Arial, sans-serif', fontWeight:'bold'}}
        >
          닉네임 변경
        </div>

        <div onClick={() => { navigate(`/change_password`); }}
          style={{marginBottom:'20px', width: 'fit-content', 
          display:'flex', flexDirection:'column', justifyContent:'space-around',
          fontFamily:'Arial, sans-serif', fontWeight:'bold'}}
        >
          비밀번호 변경
        </div>
        
        <form onSubmit={onAddCategory}
          style={{display:'flex', flexDirection:'column', justifyContent:'space-evenly'}}
        >
          <div style={{fontFamily:'Arial, sans-serif', fontWeight:'bold'}}>관심 카테고리 설정</div>
          <div style={{padding:'15px', display:'flex'}}>
            <Form.Select value={selectedCategory} onChange={onCategoryChange} size="sm"
              style={{ borderColor: '#A9B388', borderWidth: '2px', color: 'grey'}}>
              {categories.map(category => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </Form.Select>  
            <Button size="sm" type="submit"
              style={{ backgroundColor: '#A9B388', border:'none', marginLeft: '4px', padding:'0px 15px'}}
            >
              <FiPlus style={{fontSize:'1.5rem'}}/>
            </Button>
          </div>
        </form>

        {/* selectedUserCategories 값들을 버튼으로 표시 */}
        <div
          style={{marginBottom:'20px', display:'flex', padding:'0px 15px', flexWrap: 'wrap'}}
        >
          {selectedUserCategories.map((categoryId, index) => (   
            <Button size="sm" style={{ backgroundColor: 'white', borderColor:'#A9B388', fontSize:'80%',
              color:'black', width: 'fit-content', margin:'0px 15px 15px 0px'}}
              key={index} type="submit" onClick={() => onDeleteCategory(categoryId)}
            >
              {getCategoryName(categoryId)} X
            </Button>
          ))}
        </div>

        <hr/> 

        <div onClick={onClickHandler}
          style={{marginBottom:'20px', width: 'fit-content',
            fontFamily:'Arial, sans-serif', fontWeight:'bold'}}
        >
          로그아웃
        </div>

      </div>

      <Footer />
    </div>
  );
}

export default CategoryPage