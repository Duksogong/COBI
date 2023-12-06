import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import TestSearch from "./components/views/TestPage/TestSearch";
import TestSearchReviews from "./components/views/TestPage/TestSearchReviews";
import TestAdvice from './components/views/TestPage/TestAdvice';
import TestMyReview from "./components/views/TestPage/TestMyReview";
import Test from "./components/views/TestPage/TestPage";

import SearchPage from "./components/views/SearchPage/SearchBook";
import SearchReviewPage from "./components/views/SearchPage/SearchReview";

import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import HomePage from "./components/views/HomePage/HomePage";

import ChangeNicknamePage from "./components/views/ChangePage/ChangeNicknamePage";
import ChangePasswordPage from "./components/views/ChangePage/ChangePasswordPage";

import ChangeCategoryPage from "./components/views/CategoryPage/CategoryPage";

import MyBookmarkPage from "./components/views/MyBookmarkPage/MyBookmarkPage";
import MyReviewPage from "./components/views/MyReivewPage/MyReviewPage";

import ReviewDetailPage from "./components/views/ReviewDetailPage/ReviewDetailPage";
import PostReviewPage from "./components/views/PostReviewPage/PostReviewPage";

import CommentList from "./components/views/CommentPage/CommentList";
import CommentForm from "./components/views/CommentPage/CommentForm";
import CommentPage from "./components/views/CommentPage/CommentPage"; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/test" element={<Test />} />
        <Route path="/test/advice" element={<TestAdvice />} />
        <Route path="/test/search" element={<TestSearch />} />
        <Route path="/test/searchReviews" element={<TestSearchReviews />} />
        <Route path="/test/myReview" element={<TestMyReview />} />
        <Route path="/search/:searchText" element={<SearchPage />} />
        <Route path="/search/review/:isbn" element={<SearchReviewPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/change_nickname" element={<ChangeNicknamePage />} />
        <Route path="/change_password" element={<ChangePasswordPage />} />
        <Route path="/change_category" element={<ChangeCategoryPage />} />
        <Route path="/my_bookmark" element={<MyBookmarkPage />} />
        <Route path="/post_review" element={<PostReviewPage />} />
        <Route path="/review_detail/:reviewId/:currentUser" element={<ReviewDetailPage />} />
        <Route path="/comments" element={<CommentPage />}>
          <Route index element={<CommentList />} />
        </Route>
        <Route path="/post_comment" element={<CommentForm />} /> 
        <Route path="/my_review" element={<MyReviewPage />} />
        <Route path="/post_review" element={<PostReviewPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;