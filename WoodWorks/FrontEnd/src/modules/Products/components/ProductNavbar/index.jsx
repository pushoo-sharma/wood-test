import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Input } from 'semantic-ui-react';

import logo from '../../../../assets/nav-logo.svg';
import './ProductNavbar.scss';

function ProductNavbar() {

  const navigate = useNavigate();
  const location = useLocation();
  const [isSignUp, setIsSignup] = useState(false);

  useEffect(() => {
    setIsSignup(location.pathname.includes('signup'))
  }, [location.pathname])

  if (isSignUp) return <></>

  return (
    <div className='ProductNavbar'>
      <div className='Left' onClick={() => navigate('/')}>
        <img src={logo} alt="logo" height="50px" />
        <div className='Title'>WOODWORKS</div>
      </div>
      <div className='Center'>
        <Input fluid style={{ width: "100%" }} placeholder={"Search Products.."} />
      </div>

      <div className='Right'>
        <div className='SignupButton'>
          
        </div>
      </div>

    </div>
  )
}

export default ProductNavbar