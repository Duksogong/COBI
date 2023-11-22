import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';

import ChangeNicknamePage from './components/views/ChangePage/ChangeNicknamePage';

// ===============================================================================

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/change_nickname" element={<ChangeNicknamePage />} />"
      </Routes>
    </BrowserRouter>
  );
}

export default App;
