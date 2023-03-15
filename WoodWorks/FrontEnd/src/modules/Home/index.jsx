import React from 'react';
import Footer from '../../common/Footer/Footer';
import homeLogo from '../../assets/works-2.gif';
import { home_cards } from '../../store/Home/data';
import './Home.scss';
import Nav from '../../common/Navbar/Navbar';
import { product_categories } from '../../store/constants';
import ProductCard from '../../common/ProductCard';
import { useNavigate } from 'react-router-dom';
import { DASHBOARD_URL } from '../../constant/app';

function Home() {

  const navigate = useNavigate();

  const goToProductCategory = (key) => {
          window.location.href = `${DASHBOARD_URL}`;
          // navigate(`${key}`)
  }
  return (
    <div className='Home'>
      <Nav />
      <div className='Section1'>
        <img src={homeLogo} alt="homegif" height="400px" className='Logo' />
        <div className='Box'>
          <div className='Title'>
            Welcome to Woodworks!
          </div>
          <div className='Text'>
            A marketplace to meet all your wood requirement, in a powerful and efficient way.
          </div>
        </div>
      </div>

      <div className='Section2'>
        <div className='Heading'>Shop our Product Categories</div>
        <div className='CardsContainer'>
          {product_categories.map((product, index) => (
            <ProductCard data={product} onClick={() => goToProductCategory(product.key)} />
          ))}
        </div>
      </div>

      <div className='Section3'>
        <div className='Title'>Group 22 Capstone</div>
        <div className='Text'>Project</div>
      </div>

      <Footer />
    </div>
  )
}

export default Home