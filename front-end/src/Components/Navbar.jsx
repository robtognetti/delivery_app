import React from 'react';

function Navbar() {
  return (
    <nav className="Navbar">
      <div
        className="Navbar__container"
        style={
          ({ display: 'flex' },
          { justifyContent: 'space-around' },
          { flexDirection: 'row' })
        }
      >
        <h4 data-testid="customer_products__element-navbar-link-products">
          Produtos
        </h4>
        <h4 data-testid="customer_products__element-navbar-link-orders">
          Meus Pedidos
        </h4>
        <h4 data-testid="customer_products__element-navbar-user-full-name">
          Usuário
        </h4>
        <h4 data-testid="customer_products__element-navbar-link-logout">
          Sair
        </h4>
      </div>
    </nav>
  );
}

export default Navbar;
