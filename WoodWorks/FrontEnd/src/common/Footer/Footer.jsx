import React from 'react';

import logo from '../../assets/nav-logo.svg';
import './Footer.scss';

function Footer() {
  return (
    <div className='Footer'>
      <div className='Left'>
        <img src={logo} alt="logo" height="50px" />
        <div className='Title'>WOODWORKS</div>
      </div>
      <div className='Copyright'>
        <span>©</span>
        Woodworks Technologies
      </div>
    </div>
  )
}

export default Footer