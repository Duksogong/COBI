import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCategory } from "../../../_actions/category_actions";
import { deselectCategory } from "../../../_actions/category_actions";

import NavBar from '../NavBar/NavBar'; // 상대 경로에 주의하여 수정
import Footer from '../Footer/Footer';

function CategoryPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [cookie, setCookie] = useState("");
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedUserCategories, setSelectedUserCategories] = useState([]);


  /* User 모델에서 가져온 리스트 정보 확인 */
  console.log("user >>> ", users)

  useEffect(() => {
    // 현재 브라우저 쿠키에서 값(토큰) 가져오기
    const cookies = document.cookie.split('=');
    setCookie(cookies[1]);
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
  console.log("최종 유저: ", currentUser._id);

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
        navigate('/');
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
        navigate('/');
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
      case '65538e1dcca6a7a4cd35b551':
        return "예술/대중문화";
      default:
        return "기타";
    }
  };


  return (
    <div>
      <NavBar />

      <div style={{ 
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', minHeight: '32rem', flexDirection: 'column'
      }}>

        <div onClick={() => { navigate(`/change_nickname`); }}>
          닉네임 변경
        </div>

        <div onClick={() => { navigate(`/change_password`); }}>
          비밀번호 변경
        </div>
        
        <form onSubmit={onAddCategory}>
        <hr/> 
        <label>Category</label>
        <select value={selectedCategory} onChange={onCategoryChange}>
          {categories.map(category => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>  
        <button type="submit">
          추가
        </button>
        <hr/>
        </form>

        {/* selectedUserCategories 값들을 버튼으로 표시 */}
        <div>
          {selectedUserCategories.map((categoryId, index) => (
            <button key={index} type="submit" onClick={() => onDeleteCategory(categoryId)}>
              {getCategoryName(categoryId)}
            </button>
          ))}
        </div>
      </div>

      
      <Footer />
    </div>
  );
}

export default CategoryPage