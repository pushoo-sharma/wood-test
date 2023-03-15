import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import logo from '../../../../assets/nav-logo.svg';
import './ProductSidebar.scss';

function ProductSidebar() {

  const [selected, setSelected] = useState('home');
  const navigate = useNavigate();

  const changeSelected = (tabname) => {
    setSelected(tabname);
    navigate(`${tabname}`)
  }
  return (
    <div className='ProductSidebar'>
      <div className='Heading'>Filters</div>

      {/* <div className='Options2'>
        <div className='Option'>Logout</div>
      </div> */}
      <input style={{marginTop:"20px"}} type="checkbox" /> <span>5ft-3ft</span> <br />
      <input style={{marginTop:"20px"}} type="checkbox" /> <span>6ft-2ft</span> <br />
      <input style={{marginTop:"20px"}} type="checkbox" /> <span>Below 1000$</span> <br />
      <input style={{marginTop:"20px"}} type="checkbox" /> <span>Above 1000$</span> <br />
      <input style={{marginTop:"20px"}} type="checkbox" /> <span>4ft-2ft</span> <br />
    </div>
  )
}

export default ProductSidebar;