import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import TestSearch from './components/views/TestPage/TestSearch';
import TestSearchReviews from "./components/views/TestPage/TestSearchReviews";
import TestMyReview from './components/views/TestPage/TestMyReview';

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import ChangeNicknamePage from './components/views/ChangePage/ChangeNicknamePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/test/search" element={<TestSearch />} />
        <Route path="/test/searchReviews" element={<TestSearchReviews />} />
        <Route path="/test/myReview" element={<TestMyReview />} />
          
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/change_nickname" element={<ChangeNicknamePage />} />"
      </Routes>
    </BrowserRouter>
  );
}

export default App;
