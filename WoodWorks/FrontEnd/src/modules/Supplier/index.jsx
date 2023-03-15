import React from 'react';
import { useSelector } from 'react-redux';
import './Supplier.scss';

function Supplier() {
  const supplierData = useSelector(state => state.supplier);
  return (
    <div className='Supplier'>
      <div className='Top'>Welcome to your supplier dashboard, Sarfaraz!</div>

      <div className='Body'>
        <div>
          - Click on <span className='Link'>Your Products </span>to view all your listed products in one place!
        </div>
        <div>
          - To create a new product listing click on <span className='Link'>List Product</span>.
        </div>
      </div>
    </div>
  )
}

export default Supplier