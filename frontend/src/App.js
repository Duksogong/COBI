import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import TestSearch from './components/views/TestPage/TestSearch';
import TestSearchReviews from "./components/views/TestPage/TestSearchReviews";

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';

import ChangeNicknamePage from './components/views/ChangePage/ChangeNicknamePage';
import ChangePasswordPage from './components/views/ChangePage/ChangePasswordPage';

import ChangeCategoryPage from './components/views/CategoryPage/CategoryPage';

import MyBookmarkPage from './components/views/MyBookmarkPage/MyBookmarkPage';

import ReviewDetailPage from './components/views/ReviewDetailPage/ReviewDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/test/search" Component={TestSearch} />
        <Route exact path="/test/searchReviews" Component={TestSearchReviews} />
          
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/change_nickname" element={<ChangeNicknamePage />} />
        <Route path="/change_password" element={<ChangePasswordPage />} />

        <Route path="/change_category" element={<ChangeCategoryPage />} />

        <Route path="/my_bookmark" element={<MyBookmarkPage />} />

        <Route path="/review_detail/:reviewId" element={<ReviewDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
