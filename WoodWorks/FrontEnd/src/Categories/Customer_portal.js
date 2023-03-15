import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from '../assets/nav-logo.svg';
import './Customer_portal.scss'
export default function Customer_portal() {
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
                    <div style={{marginBottom:"30px",}}   ><Link style={{color:"white",padding:"10px",borderRadius:"5px",width:"150px"}} to="/Order">Order History</Link></div>
                    {/* <div  style={{marginBottom:"30px",width:"150px"}} ><Link style={{color:"white",padding:"10px",borderRadius:"5px",}} to="/Sale">My Sales</Link></div>
                    <div style={{marginBottom:"30px",width:"150px"}}  ><Link style={{color:"white",padding:"10px",borderRadius:"5px",}} to="/Feed"> Feedbacks</Link>
                    </div> */}
                </div>

            <div className='Options2'>
                <div className='Option'>Logout</div>
            </div>
        </div>
    )
}
