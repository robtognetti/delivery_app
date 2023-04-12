import React from 'react';
import {
  render,
  // fireEvent,
  waitFor,
  screen,
  // act,
} from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import Admin from '../../Pages/Admin';

const buttonRegister = 'admin_manage__button-register';
const zeBiritaEmail = 'zebirita@email.com';

describe('Deve testar Admin', () => {
  it('Deve renderizar o componente Admin', () => {
    const navigateMock = jest.fn();

    render(
      <MemoryRouter>
        <Admin navigate={ navigateMock } />
      </MemoryRouter>,
    );
    expect(screen.getByTestId(buttonRegister)).toBeInTheDocument();
  });

  // it('Deve ativar o botão na entrada de formulário válida', () => {
  //   const navigateMock = jest.fn();

  //   render(
  //     <MemoryRouter>
  //       <Admin navigate={ navigateMock } />
  //     </MemoryRouter>,
  //   );

  //   const emailInput = screen.getByTestId('admin_manage__input-email');
  //   const passwordInput = screen.getByTestId('admin_manage__input-password');
  //   const registerButton = screen.getByTestId(buttonRegister);
  //   expect(registerButton).toBeDisabled();

  //   act(() => {
  //     fireEvent.change(emailInput, { target: { value: zeBiritaEmail } });
  //     fireEvent.change(passwordInput, { target: { value: '$#zebirita#$' } });
  //   });
  //   expect(registerButton).not.toBeDisabled();

  //   act(() => {
  //     fireEvent.submit(registerButton.closest('form'));
  //   });

  //   expect(navigateMock).toHaveBeenCalledTimes(1);
  //   expect(navigateMock).toHaveBeenCalledWith('/admin/manage');
  // });

  it('Deve buscar usuários do servidor e renderizá-los na tabela', async () => {
    const users = [
      { id: 1, name: 'Cliente Zé Birita', email: zeBiritaEmail, role: 'customer' },
      { id: 2, name: 'Fulana Pereira', email: 'fulana@deliveryapp.com', role: 'seller' },
    ];
    axios.get = jest.fn().mockResolvedValue({ data: users });

    const navigateMock = jest.fn();

    render(
      <MemoryRouter>
        <Admin navigate={ navigateMock } />
      </MemoryRouter>,
    );

    await waitFor(() => {
      // expect(axios.get).toHaveBeenCalledTimes(1);
      expect(
        screen.getByTestId('admin_manage__element-user-table-item-number-0'),
      ).toHaveTextContent('1');
      expect(
        screen.getByTestId('admin_manage__element-user-table-item-number-1'),
      ).toHaveTextContent('2');
      expect(
        screen.getByTestId('admin_manage__element-user-table-name-0'),
      ).toHaveTextContent('Cliente Zé Birita');
      expect(
        screen.getByTestId('admin_manage__element-user-table-name-1'),
      ).toHaveTextContent('Fulana Pereira');
      expect(
        screen.getByTestId('admin_manage__element-user-table-email-0'),
      ).toHaveTextContent(zeBiritaEmail);
      expect(
        screen.getByTestId('admin_manage__element-user-table-email-1'),
      ).toHaveTextContent('fulana@deliveryapp.com');
      expect(
        screen.getByTestId('admin_manage__element-user-table-role-0'),
      ).toHaveTextContent('customer');
      expect(
        screen.getByTestId('admin_manage__element-user-table-role-1'),
      ).toHaveTextContent('seller');
    });
  });
});
