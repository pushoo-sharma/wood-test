import React, { useState } from 'react';
import './List.scss';
import ListModal from './Modal';

function List() {

  const [showModal, setShowModal] = useState(false);

  return (
    <div className='List'>
      <div className='Top'>Create product listings for the marketplace.</div>
      <div className='Body'>
        <div>List your product to the marketplace and gain access to thousands of customers looking for the right product.</div>
        <div className='Add'>
          Unlock the power of <span className="heavy highlight">Woodworks</span> by following these three simple steps and add your product!
          <div>- Add your product details.</div>
          <div>- Confirm the details and add product to the marketplace.</div>
          <div>- Our customers will reach out to you according to their requirements!</div>
        </div>

        <div className='Button' onClick={() => setShowModal(true)}>Add your Product</div>
      </div>

      {showModal ? (
        <ListModal open={showModal} onClose={() => setShowModal(false)} />
      ) : null}
    </div>
  )
}

export default List