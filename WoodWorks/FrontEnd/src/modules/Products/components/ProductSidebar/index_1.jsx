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
     <h3 style={{padding:"0px",margin:"5px"}}>Material</h3>
      <input style={{marginTop:"9px"}} type="checkbox" /> <span style={{marginLeft:"9px",fontSize:"13px"}}>Bamboo</span> <br />
      <input style={{marginTop:"9px"}} type="checkbox" /> <span style={{marginLeft:"9px",fontSize:"13px"}}>Enginnered Hardwood</span> <br />
      <input style={{marginTop:"9px"}} type="checkbox" /> <span style={{marginLeft:"9px",fontSize:"13px"}}>Solid Hardwood</span> <br />
  
      <h3 style={{padding:"0px",margin:"5px"}}>Length</h3>
      <input style={{marginTop:"9px"}} type="checkbox" /> <span style={{marginLeft:"9px",fontSize:"13px"}}>36</span> <br />
      <input style={{marginTop:"9px"}} type="checkbox" /> <span style={{marginLeft:"9px",fontSize:"13px"}}>72</span> <br />
      <h3 style={{padding:"0px",margin:"5px"}}>Thicknesse</h3>
      <input style={{marginTop:"9px"}} type="checkbox" /> <span style={{marginLeft:"9px",fontSize:"13px"}}>32 X 80</span> <br />
      <input style={{marginTop:"9px"}} type="checkbox" /> <span style={{marginLeft:"9px",fontSize:"13px"}}>1/2 * 5-1/8</span> <br />
      <input style={{marginTop:"9px"}} type="checkbox" /> <span style={{marginLeft:"9px",fontSize:"13px"}}>1/2 * 5</span> <br />
      <input style={{marginTop:"9px"}} type="checkbox" /> <span style={{marginLeft:"9px",fontSize:"13px"}}>3/8 * 6-1/2</span> <br />
      <input style={{marginTop:"9px"}} type="checkbox" /> <span style={{marginLeft:"9px",fontSize:"13px"}}>3/4 * 5</span> <br />
      <h3 style={{padding:"0px",margin:"5px"}}>Colour</h3>
      <input style={{marginTop:"9px"}} type="checkbox" /> <span style={{marginLeft:"9px",fontSize:"13px"}}>Gray</span> <br />
      <input style={{marginTop:"9px"}} type="checkbox" /> <span style={{marginLeft:"9px",fontSize:"13px"}}>Brown</span> <br />
      <input style={{marginTop:"9px"}} type="checkbox" /> <span style={{marginLeft:"9px",fontSize:"13px"}}>Tan</span> <br />
      <input style={{marginTop:"9px"}} type="checkbox" /> <span style={{marginLeft:"9px",fontSize:"13px"}}>Light</span> <br />
    </div>
  )
}

export default ProductSidebar;