import React, { useState, useEffect } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';

import RootRoutes from './routes/RootRoutes';
import Navbar from './common/Navbar/Navbar';
import './App.scss';



function App() {
  Object.defineProperty(String.prototype, 'capitalize', {
    value: function () {
      return this.charAt(0).toUpperCase() + this.slice(1);
    },
    enumerable: false
  });
  return (
    <div className="App">
      <BrowserRouter>
        <RootRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;