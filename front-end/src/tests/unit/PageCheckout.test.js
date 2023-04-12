import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Checkout from '../../Pages/Checkout';

describe('Deve testar Checkout', () => {
  const mockContext = {
    total: '10.00',
    update: false,
    setUpdate: jest.fn(),
    getTotalPriceFromCart: jest.fn(),
  };

  beforeEach(() => {
    localStorage.setItem(
      'carrinho',
      JSON.stringify([
        {
          productId: 1,
          name: 'Product 1',
          quantity: 2,
          unitPrice: 5.0,
        },
      ]),
    );
  });

  afterEach(() => {
    localStorage.removeItem('carrinho');
  });

  it('Deve renderizar a página de checkout', () => {
    const navigateMock = jest.fn();

    render(
      <MemoryRouter>
        <Checkout navigate={ navigateMock } />
      </MemoryRouter>,
    );

    expect(screen.getByText('Finalizar Pedido')).toBeInTheDocument();
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('5,00')).toBeInTheDocument();
    expect(screen.getByText('10,00')).toBeInTheDocument();
  });

  it('Deve remover item do carrinho', () => {
    const navigateMock = jest.fn();

    render(
      <MemoryRouter>
        <Checkout navigate={ navigateMock } />
      </MemoryRouter>,
    );

    const removeButton = screen.getByRole('button', {
      name: /remover/i,
    });
    fireEvent.click(removeButton);

    expect(localStorage.getItem('carrinho')).toBe('[]');
    expect(mockContext.setUpdate).toHaveBeenCalledTimes(1);
    expect(mockContext.getTotalPriceFromCart).toHaveBeenCalledTimes(1);
    expect(screen.getByText('Product 1')).not.toBeInTheDocument();
  });
});
