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
      <h3 style={{ padding: "0px", margin: "5px" }}>Wood type</h3>
      <input style={{ marginTop: "9px" }} type="checkbox" /> <span style={{ marginLeft: "9px", fontSize: "13px" }}>Cedar</span> <br />
      <input style={{ marginTop: "9px" }} type="checkbox" /> <span style={{ marginLeft: "9px", fontSize: "13px" }}>Pressure Treated</span> <br />
      

      <h3 style={{ padding: "0px", margin: "5px" }}>Width</h3>
      <input style={{ marginTop: "9px" }} type="checkbox" /> <span style={{ marginLeft: "9px", fontSize: "13px" }}>4 ft</span> <br />
      <input style={{ marginTop: "9px" }} type="checkbox" /> <span style={{ marginLeft: "9px", fontSize: "13px" }}>6 ft</span> <br />
     
      <h3 style={{ padding: "0px", margin: "5px" }}>Length</h3>
      <input style={{ marginTop: "9px" }} type="checkbox" /> <span style={{ marginLeft: "9px", fontSize: "13px" }}>16 ft</span> <br />
      <input style={{ marginTop: "9px" }} type="checkbox" /> <span style={{ marginLeft: "9px", fontSize: "13px" }}>8 ft </span> <br />
      <input style={{ marginTop: "9px" }} type="checkbox" /> <span style={{ marginLeft: "9px", fontSize: "13px" }}>10 ft</span> <br />
      <input style={{ marginTop: "9px" }} type="checkbox" /> <span style={{ marginLeft: "9px", fontSize: "13px" }}>12 ft</span> <br />
    </div>
  )
}

export default ProductSidebar;