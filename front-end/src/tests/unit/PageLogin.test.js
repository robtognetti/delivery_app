import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../../App';

const emailInput = 'common_login__input-email';
const passwordInput = 'common_login__input-password';
const buttonLogin = 'common_login__button-login';
const buttonRegister = 'common_login__button-register';
const invalidEmail = 'common_login__element-invalid-email';
const buttonProducts = 'customer_products__element-navbar-link-products';
const buttonOrders = 'customer_products__element-navbar-link-orders';
const customerName = 'customer_products__element-navbar-user-full-name';
const buttonLogout = 'customer_products__element-navbar-link-logout';

describe('Testando a página de login', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  it('deve verificar se os inputs e botões estão renderizados', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const email = screen.getByTestId(emailInput);
    const password = screen.getByTestId(passwordInput);
    const btnLogin = screen.getByTestId(buttonLogin);
    const btnRegister = screen.getByTestId(buttonRegister);

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(btnLogin).toBeInTheDocument();
    expect(btnRegister).toBeInTheDocument();
  });

  it('verifica se o botão de login está desativado ao inserir dados inválidos', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const email = screen.getByTestId(emailInput);
    const password = screen.getByTestId(passwordInput);
    const btnLogin = screen.getByTestId(buttonLogin);

    userEvent.type(email, 'email@email');
    userEvent.type(password, 'password');

    expect(btnLogin).toBeDisabled();
  });

  it('verifica se aparece mensagem de erro se o usuário for inexistente', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const email = screen.getByTestId(emailInput);
    const password = screen.getByTestId(passwordInput);
    const btnLogin = screen.getByTestId(buttonLogin);

    userEvent.type(email, 'email@email.com.br');
    userEvent.type(password, '1234567890');
    userEvent.click(btnLogin);

    await waitFor(() => {
      const error = screen.getByTestId(invalidEmail);

      expect(error).toBeInTheDocument();
    }, { timeout: 5000 });
  });

  it('verifica se o login do cliente é feito corretamente', async () => {
    render(
      <MemoryRouter initialEntries={ ['/login'] }>
        <App />
      </MemoryRouter>,
    );

    const email = screen.getByTestId(emailInput);
    const password = screen.getByTestId(passwordInput);
    const btnLogin = screen.getByTestId(buttonLogin);

    userEvent.type(email, 'zebirita@email.com');
    userEvent.type(password, '$#zebirita#$');
    userEvent.click(btnLogin);

    await waitFor(() => {
      const btnProducts = screen.getByTestId(buttonProducts);
      const btnOrders = screen.getByTestId(buttonOrders);
      const name = screen.getByTestId(customerName);
      const btnLogout = screen.getByTestId(buttonLogout);
      expect(btnProducts).toBeInTheDocument();
      expect(btnOrders).toBeInTheDocument();
      expect(name).toBeInTheDocument();
      expect(btnLogout).toBeInTheDocument();
    });
  });

  it('verifica se o login do vendedor é feito corretamente', async () => {
    render(
      <MemoryRouter initialEntries={ ['/login'] }>
        <App />
      </MemoryRouter>,
    );

    const sellerEmail = screen.getByTestId(emailInput);
    const sellerPassword = screen.getByTestId(passwordInput);
    const login = screen.getByTestId(buttonLogin);

    userEvent.type(sellerEmail, 'fulana@deliveryapp.com');
    userEvent.type(sellerPassword, 'fulana@123');
    userEvent.click(login);

    await waitFor(() => {
      const btnOrders = screen.getByTestId(buttonOrders);
      const name = screen.getByTestId(customerName);
      const btnLogout = screen.getByTestId(buttonLogout);
      expect(btnOrders).toBeInTheDocument();
      expect(name).toBeInTheDocument();
      expect(btnLogout).toBeInTheDocument();
    });
  });
});
