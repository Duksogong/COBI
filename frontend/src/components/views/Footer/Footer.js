import './Footer.css'

import React, { useState } from 'react';
import { Link } from "react-router-dom";

import { GrHomeRounded } from "react-icons/gr";
import { IoBookOutline } from "react-icons/io5";
import { IoBookmarkOutline } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";

function Footer() {
  const [activeNav, setActiveNav] = useState(1);
  return (
    <nav style={{paddig: '8px 0px'}}>
      <div>
        <Link to="/home" className="nav-link" onClick={() => setActiveNav(1)}>
          <div style={activeNav === 1 ? {color: '#5F6F52'} : {}}>
            <div><GrHomeRounded /></div>
            <div>홈</div>
          </div>
        </Link>
      </div>
      <div>
        <Link to="#" className="nav-link" onClick={() => setActiveNav(2)}>
          <div style={activeNav === 2 ? {color: '#5F6F52'} : {}}>
            <div><IoBookOutline /></div>
            <div>내감상평</div>
          </div>
        </Link>
      </div>
      <div>
        <Link to="/my_bookmark" className="nav-link" onClick={() => setActiveNav(3)}>
          <div style={activeNav === 3 ? {color: '#5F6F52'} : {}}>
            <div><IoBookmarkOutline /></div>
            <div>책갈피</div>
          </div>
        </Link>
      </div>
      <div>
        <Link to="post_review" className="nav-link" onClick={() => setActiveNav(4)}>
          <div style={activeNav === 4 ? {color: '#5F6F52'} : {}}>
            <div><LuPencilLine /></div>
            <div>글쓰기</div>
          </div>
        </Link>
      </div>
      <div>
        <Link to="/change_category" className="nav-link" onClick={() => setActiveNav(5)}>
          <div style={activeNav === 5 ? {color: '#5F6F52'} : {}}>
            <div><IoSettingsOutline /></div>
            <div>설정</div>
          </div>
        </Link>
      </div>
    </nav>
  );
}

export default Footer;
