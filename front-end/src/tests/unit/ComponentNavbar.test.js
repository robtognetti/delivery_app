import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../../Components/Navbar';

const time = 1000;
const testIdSellerOrders = 'customer_products__element-navbar-link-orders';

describe('Testando Navbar', () => {
  beforeEach(() => {
    localStorage
      .setItem('user', JSON.stringify({ name: 'Cliente Zé Birita', role: 'customer' }));
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('Deve renderizar os elementos corretos', () => {
    const navigateMock = jest.fn();

    render(
      <MemoryRouter>
        <Navbar navigate={ navigateMock } />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('customer_products__element-navbar-link-products'))
      .toBeInTheDocument();
    expect(screen.getByTestId(testIdSellerOrders))
      .toBeInTheDocument();
    expect(screen.getByTestId('customer_products__element-navbar-user-full-name'))
      .toHaveTextContent('Cliente Zé Birita');
    expect(screen.getByTestId('customer_products__element-navbar-link-logout'))
      .toBeInTheDocument();
  });

  it('Deve desconectar o usuário quando o botão de logout é clicado', () => {
    const navigateMock = jest.fn();
    const { getByTestId } = render(
      <MemoryRouter>
        <Navbar navigate={ navigateMock } />
      </MemoryRouter>,
    );
    fireEvent.click(getByTestId('customer_products__element-navbar-link-logout'));
    expect(localStorage.getItem('user')).toBeNull();
  });

  it('Deve navegar para a página correta quando o botão de produtos é clicado', () => {
    const navigateMock = jest.fn();
    const { getByTestId } = render(
      <MemoryRouter>
        <Navbar navigate={ navigateMock } />
      </MemoryRouter>,
    );
    fireEvent.click(getByTestId('customer_products__element-navbar-link-products'));
    setTimeout(() => {
      expect(window.location.pathname).toBe('/seller/products');
    }, time);
  });

  it('Deve navegar para a página correta quando o botão de pedidos é clicado', () => {
    const navigateMock = jest.fn();
    const { getByTestId } = render(
      <MemoryRouter>
        <Navbar navigate={ navigateMock } />
      </MemoryRouter>,
    );
    fireEvent.click(getByTestId(testIdSellerOrders));
    setTimeout(() => {
      expect(window.location.pathname).toBe('/customer/orders');
    }, time);
  });

  it('Deve navegar para "/seller/orders" quando clicado', () => {
    const navigateMock = jest.fn();
    const { getByTestId } = render(
      <MemoryRouter>
        <Navbar navigate={ navigateMock } />
      </MemoryRouter>,
    );
    fireEvent.click(getByTestId(testIdSellerOrders));
    setTimeout(() => {
      expect(window.location.pathname).toBe('/seller/orders');
    }, time);
  });
});
