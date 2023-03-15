
import React from 'react'
import Index from '../modules/Products/index_1'
import './Doors.css'
import { Link } from 'react-router-dom';
export default function Flooring() {
    return (
        <><div>
            <Index />
            <div className="Doors">
                <div className="item">
                    <div className="img-box">
                        <img src="https://www.lamiwood.in/wp-content/uploads/2021/12/CHEVRON-Engineered-1.jpg" alt="" />
                    </div>
                    <div className="details">
                        <h2>Flooring1<br /></h2>
                        <div className="price"><Link  to="/Signup">Get Price</Link></div>
                        <label>Size</label>
                        <ul>
                            <li>150-90</li>
                            
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
                        <img src="https://media.wickes.co.uk/is/image/wickes/GPID_5000003732_01?&wid=800&hei=600&fit=crop&extend=0,0,0,0" alt="" />
                    </div>
                    <div className="details">
                        <h2>Flooring2<br /></h2>
                        <div className="price"><Link  to="/Signup">Get Price</Link></div>
                        <label >Size</label>
                        <ul>
                            <li>150-90</li>
                            
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
                        <img src="https://contentgrid.homedepot-static.com/hdus/en_US/DTCCOMNEW/Articles/how-to-choose-the-best-flooring-for-dogs-2022-hero.jpg" alt="" />
                    </div>
                    <div className="details">
                        <h2>Flooring3<br /></h2>
                        <div className="price"><Link  to="/Signup">Get Price</Link></div>
                        <label>Size</label>
                        <ul>
                            <li>150-90</li>
                            
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
