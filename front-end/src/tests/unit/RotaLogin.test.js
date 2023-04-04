import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../../Pages/Login';

describe('Testando Login page', () => {
  it('Deve renderizar entradas dos inputs e botão', () => {
    const navigateMock = jest.fn();

    render(
      <MemoryRouter>
        <Login navigate={ navigateMock } />
      </MemoryRouter>,
    );

    const emailInput = screen.getByTestId('common_login__input-email');
    const passwordInput = screen.getByTestId('common_login__input-password');
    const loginButton = screen.getByRole('button', { name: /login/i });

    const email = 'zebirita@email.com';
    const password = '$#zebirita#$';
    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: password } });
    fireEvent.click(loginButton);

    // Verifica se a função navigate foi chamada com a rota correta
    // expect(navigateMock).toHaveBeenCalledWith('/customer/products');
  });
});
