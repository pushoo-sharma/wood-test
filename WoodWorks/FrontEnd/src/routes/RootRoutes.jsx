import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../modules/Home';
import Signup from '../modules/Signup';

import Portal from '../Categories/Customer_portal'
import Supplier from '../modules/Supplier';
import List from '../modules/Supplier/pages/List';
import Products from '../modules/Products';
import SupplierRoutes from './SupplierRoutes';
import Doors from '../Categories/Doors';
import Handrails from '../Categories/Handrails';
import Deck from '../Categories/Deck';
import Boundary_Wall from '../Categories/Boundary-Wall';
import Flooring from '../Categories/Flooring';
import Doors_Details from '../Categories/More_Details/Doors_more'
import Order from '../Categories/Order';
import Sale from '../Categories/Sale';
import Feed from '../Categories/Feed';

function RootRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/signin' element={<Signup isSignIn />} />

      <Route path="/supplier" element={<SupplierRoutes />}>
        <Route path="/supplier/home" element={<Supplier />} />
        <Route path="/supplier/products" element={<Products />} />
        <Route path="/supplier/list" element={<List />} />
      </Route>
      
      <Route path="Order" element={<Order/>} />
      <Route path="Sale" element={<Sale/>} />
      <Route path="Feed" element={<Feed/>} />
      <Route path="Doors" element={<Doors/>} />
      <Route path="Portal" element={<Portal/>} />
      <Route path="Handrails" element={<Handrails/>} />
      <Route path="Deck" element={<Deck/>} />
      <Route path="Boundary_Wall" element={<Boundary_Wall/>} />
      <Route path="Flooring" element={<Flooring/>} />
      <Route path="Doors_Details" element={<Doors_Details/>} />
      <Route path='/Signup' element={<Signup />} />
      <Route path="/products/:category" element={<Products />}>
        
      </Route>
    </Routes>
  )
}

export default RootRoutes;