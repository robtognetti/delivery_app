import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Register from '../../Pages/Register';

describe('Testando Register page', () => {
  it('Deve renderizar entradas de formulário e botão', () => {
    const navigateMock = jest.fn();

    render(
      <MemoryRouter>
        <Register navigate={ navigateMock } />
      </MemoryRouter>,
    );

    const nameInput = screen.getByTestId('common_register__input-name');
    const emailInput = screen.getByTestId('common_register__input-email');
    const passwordInput = screen.getByTestId('common_register__input-password');
    const registerButton = screen.getByTestId('common_register__button-register');

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });

  it('Deve enviar o formulário quando dados válidos são inseridos', async () => {
    const navigateMock = jest.fn();

    render(
      <MemoryRouter>
        <Register navigate={ navigateMock } />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByTestId('common_register__input-name'), {
      target: { value: 'Cliente Zé Birita' },
    });
    fireEvent.change(screen.getByTestId('common_register__input-email'), {
      target: { value: 'zebirita@email.com' },
    });
    fireEvent.change(screen.getByTestId('common_register__input-password'), {
      target: { value: '$#zebirita#$' },
    });
    fireEvent.click(screen.getByTestId('common_register__button-register'));

    await screen.findByText('Nova conta:');

    // expect(mockUseNavigate).toHaveBeenCalled();
    // expect(mockNavigate).toHaveBeenCalledWith('/customer/products');
  });

  it('deve verificar se existe um botão cadastrar e o click no mesmo', () => {
    const navigateMock = jest.fn();

    render(
      <MemoryRouter>
        <Register navigate={ navigateMock } />
      </MemoryRouter>,
    );
    const submitButton = screen.getByRole('button', { name: 'Cadastrar' });
    userEvent.click(submitButton);
  });
});
