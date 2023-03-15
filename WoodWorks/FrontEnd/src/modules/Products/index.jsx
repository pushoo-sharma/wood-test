import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../../store/products';
import ProductNavbar from './components/ProductNavbar';
import ProductSidebar from './components/ProductSidebar/index';
import './Products.scss';
// import Doors from '../../Categories/Doors';
import { Link } from 'react-router-dom';

function Products() {

  const navigate = useNavigate();

  return (
    <div className='Products'>
      <ProductNavbar />
      <ProductSidebar />
      <div className='ProductsScreen'>
        <div className='CategoriesBox'>
          {/* {Object.keys(CATEGORIES).map((category, index) => (
            <div
              className='Category'
              key={index}
              onClick={() => navigate(`/products/${CATEGORIES?.[category]}`)}
            >
              {CATEGORIES?.[category]?.capitalize()}
            </div>
          ))} */}
          <div className="Category"> <Link  to="/Doors">Doors</Link></div>
          <div className="Category"> <Link  to="/Handrails">Handrails</Link></div>
          <div className="Category"> <Link  to="/Deck">Deck</Link></div>
          <div className="Category"> <Link  to="/Boundary_Wall">Boundary Wall</Link></div>
          <div className="Category"> <Link  to="/Flooring">Flooring</Link></div>
          
          
        </div>
      </div>
    </div>
  )
}

export default Products