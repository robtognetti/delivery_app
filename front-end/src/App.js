import React from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import rockGlass from './images/rockGlass.svg';
import Products from './Pages/Products';


function App() {
  {/* <span className="logo">TRYBE</span>
  <object className="rocksGlass" type="image/svg+xml" data={ rockGlass }>
    Glass
  </object> */}
  return(
  <Routes>
  <Route path="/" element={ <Navigate to="/login" /> } />
  <Route path="/login" element={ <Login /> } />
  <Route path="/customer/products" element={ <Products /> } />
  </Routes>

)}

export default App;