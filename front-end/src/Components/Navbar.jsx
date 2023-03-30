import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const handleLougout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };
  const currentUser = JSON.parse(localStorage.getItem('user'));
  return (
    <nav className="Navbar">
      <div
        className="Navbar__container"
        style={
          ({ display: 'flex' })
        }
      >
        <h4 data-testid="customer_products__element-navbar-link-products">
          Produtos
        </h4>
        <h4 data-testid="customer_products__element-navbar-link-orders">
          Meus Pedidos
        </h4>
        <h4 data-testid="customer_products__element-navbar-user-full-name">
          {currentUser ? currentUser.name : 'Nome do Usuário'}
        </h4>
        <button
          type="button"
          onClick={ handleLougout }
          data-testid="customer_products__element-navbar-link-logout"
        >
          Sair
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
