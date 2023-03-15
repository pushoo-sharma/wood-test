import React from 'react';
import { product_categories } from '../../../../store/constants';

import ProductCard from '../../../../common/ProductCard';
import './SupplierProducts.scss';

function SupplierProducts() {

  return (
    <div className='SupplierProducts'>
      <div className='Top'>Your Products</div>

      <div className='Body'>

        <div className='CardsContainer'>
          {product_categories.map((product, index) => (
            <ProductCard data={product} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SupplierProducts;