import React from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Products from './Pages/Products';
import Register from './Pages/Register';
import Orders from './Pages/Orders';
import Checkout from './Pages/Checkout';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={ <Navigate to="/login" /> } />
      <Route exact path="/login" element={ <Login /> } />
      <Route exact path="/customer/products" element={ <Products /> } />
      <Route exact path="/register" element={ <Register /> } />
      <Route exact path="/customer/orders" element={ <Orders /> } />
      <Route exact path="/customer/orders/:id" element={ <Orders /> } />
      <Route exact path="/customer/checkout" element={ <Checkout /> } />
    </Routes>

  );
}

export default App;
