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
      <h3 style={{padding:"0px",margin:"7px"}}>Material</h3>
      <input style={{marginTop:"10px"}} type="checkbox" /> <span style={{marginLeft:"10px",fontSize:"13px"}}>Steel</span> <br />
      <input style={{marginTop:"10px"}} type="checkbox" /> <span style={{marginLeft:"10px",fontSize:"13px"}}>Steel with Glass</span> <br />
      <input style={{marginTop:"10px"}} type="checkbox" /> <span style={{marginLeft:"10px",fontSize:"13px"}}>Wood with Glass</span> <br />
      <input style={{marginTop:"10px"}} type="checkbox" /> <span style={{marginLeft:"10px",fontSize:"13px"}}>Fibre Glass</span> <br />
      <h3 style={{padding:"0px",margin:"7px"}}>Texture</h3>
      <input style={{marginTop:"10px"}} type="checkbox" /> <span style={{marginLeft:"10px",fontSize:"13px"}}>Mahogany</span> <br />
      <input style={{marginTop:"10px"}} type="checkbox" /> <span style={{marginLeft:"10px",fontSize:"13px"}}>Smooth</span> <br />
      <h3 style={{padding:"0px",margin:"7px"}}>Size</h3>
      <input style={{marginTop:"10px"}} type="checkbox" /> <span style={{marginLeft:"10px",fontSize:"13px"}}>32 X 80</span> <br />
      <input style={{marginTop:"10px"}} type="checkbox" /> <span style={{marginLeft:"10px",fontSize:"13px"}}>34 X 80</span> <br />
      <input style={{marginTop:"10px"}} type="checkbox" /> <span style={{marginLeft:"10px",fontSize:"13px"}}>36 X 80</span> <br />
      <h3 style={{padding:"0px",margin:"7px"}}>Colour</h3>
      <input style={{marginTop:"10px"}} type="checkbox" /> <span style={{marginLeft:"10px",fontSize:"13px"}}>White</span> <br />
      <input style={{marginTop:"10px"}} type="checkbox" /> <span style={{marginLeft:"10px",fontSize:"13px"}}>Black</span> <br />
      <input style={{marginTop:"10px"}} type="checkbox" /> <span style={{marginLeft:"10px",fontSize:"13px"}}>Tan</span> <br />
      
    </div>
  )
}

export default ProductSidebar;