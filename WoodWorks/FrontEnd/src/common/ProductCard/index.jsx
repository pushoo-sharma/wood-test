import React from 'react';
import './ProductCard.scss';

function ProductCard({ data, onClick }) {
  return (
    <div className='Card' onClick={onClick}>
      <div className='Top'>
        <img src={data.icon} alt="icon" width="100%" height="150px" />
      </div>
      <div className='Bottom'>
        <div className='Title'>{data.name}</div>
        <div className='Desc'>{data.description}</div>
      </div>
    </div>
  )
}

export default ProductCard