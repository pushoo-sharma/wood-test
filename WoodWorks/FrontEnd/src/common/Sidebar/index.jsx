import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import logo from '../../assets/nav-logo.svg';
import './Sidebar.scss';
import { Link } from 'react-router-dom';
function Sidebar() {

  const [selected, setSelected] = useState('home');
  const navigate = useNavigate();

  const changeSelected = (tabname) => {
    setSelected(tabname);
    navigate(`${tabname}`)
  }
  return (
    <div className='Sidebar'>
      <div className='Logo'>
        <img src={logo} alt="logo" height={"40px"} />
         <Link  to="/">WOODWORKS</Link>
      </div>
      <div className='Options'>
        <div className={`Option ${selected === 'home' ? "Selected" : ""}`} onClick={() => changeSelected('home')}>Home</div>
        <div className={`Option ${selected === 'products' ? "Selected" : ""}`} onClick={() => changeSelected('products')}>Your Products</div>
        <div className={`Option ${selected === 'list' ? "Selected" : ""}`} onClick={() => changeSelected('list')}>List Product</div>
        <div className={`Option ${selected === 'list' ? "Selected" : ""}`} onClick={() => navigate('/Sale')}>Sales</div>
      </div>

      <div className='Options2'>
        <div className='Option'>Logout</div>
      </div>
    </div>
  )
}

export default Sidebar