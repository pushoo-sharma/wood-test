
import React from 'react'
import Index from '../modules/Products/index_4'
import './Doors.css'
import { Link } from 'react-router-dom';
export default function Boundary_Wall() {
    return (
        <><div>
            <Index />
            <div style={{width:"20px",float:"left",zIndex:"10009"}} className="select">
                
            </div>
            <div className="Doors">
                <div className="item">
                    <div className="img-box">
                        <img src="https://modularwalls.com.au/wp-content/uploads/700x450-Blog-Image-2022-06-15T162228.821.png" alt="" />
                    </div>
                    <div className="details">
                        <h2>Wall1<br /></h2>
                        <div className="price"><Link  to="/Signup">Get Price</Link></div>
                        <label>Size</label>
                        <ul>
                            <li>1950-990</li>
                            
                        </ul>
                        <label>Color</label>
                        <ul className="colors">
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                        <a className='a' href="#">More Details</a>
                    </div>
                </div>
                <div className="item i-1">
                    <div className="img-box">
                        <img src="https://img.staticmb.com/mbcontent/images/uploads/2021/3/stone%20boundary-wall.jpg" alt="" />
                    </div>
                    <div className="details">
                        <h2>Wall2<br /></h2>
                        <div className="price"><Link  to="/Signup">Get Price</Link></div>
                        <label >Size</label>
                        <ul>
                            <li>1850-909</li>
                            
                        </ul>
                        <label>Color</label>
                        <ul className="colors">
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                        <a className='a' href="#">More Details</a>
                    </div>
                </div>
                <div className="item i-2">
                    <div className="img-box">
                        <img src="https://www.99homeplans.com/wp-content/uploads/2017/03/outer-boundary-wall-design-for-home-home-interior.jpg" alt="" />
                    </div>
                    <div className="details">
                        <h2>Wall3<br /></h2>
                        <div className="price"><Link  to="/Signup">Get Price</Link></div>
                        <label>Size</label>
                        <ul>
                            <li>1750-990</li>
                            
                        </ul>
                        <label>Color</label>
                        <ul className="colors">
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                        <a className='a' href="#">More Details</a>
                    </div>
                </div>
                
            </div>
            
        </div></>

    )
}
