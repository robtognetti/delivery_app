import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import Admin from '../../Pages/Admin';

jest.mock('axios');

const buttonRegister = 'admin_manage__button-register';
const MAX_LENGTH = 4;
const zeBiritaEmail = 'zebirita@email.com';

describe('Admin', () => {
  it('should render Admin component', () => {
    render(<Admin />);
    expect(
      screen.getByTestId(buttonRegister),
    ).toBeInTheDocument();
  });

  it('should render table headers', () => {
    render(<Admin />);
    expect(screen.queryAllByRole('columnheader')).toHaveLength(MAX_LENGTH);
  });

  it('should disable button on invalid form input', () => {
    render(<Admin />);
    const nameInput = screen.getByTestId('admin_manage__input-name');
    const emailInput = screen.getByTestId('admin_manage__input-email');
    const passwordInput = screen.getByTestId('admin_manage__input-password');
    const registerButton = screen.getByTestId('admin_manage__button-register');
    fireEvent.change(nameInput, { target: { value: 'Delivery App Admin' } });
    fireEvent.change(emailInput, { target: { value: 'johndoe@' } });
    fireEvent.change(passwordInput, { target: { value: '1234' } });
    expect(registerButton).toBeDisabled();
  });

  it('should enable button on valid form input', () => {
    render(<Admin />);
    const nameInput = screen.getByTestId('admin_manage__input-name');
    const emailInput = screen.getByTestId('admin_manage__input-email');
    const passwordInput = screen.getByTestId('admin_manage__input-password');
    const registerButton = screen.getByTestId(buttonRegister);
    fireEvent.change(nameInput, { target: { value: 'Zé Birita' } });
    fireEvent.change(emailInput, { target: { value: zeBiritaEmail } });
    fireEvent.change(passwordInput, { target: { value: '$#zebirita#$' } });
    expect(registerButton).toBeEnabled();
  });

  it('should fetch users from server and render them in table', async () => {
    const users = [
      { id: 1, name: 'Cliente Zé Birita', email: zeBiritaEmail, role: 'customer' },
      { id: 2, name: 'Fulana Pereira', email: 'fulana@deliveryapp.com', role: 'seller' },
    ];
    axios.get.mockResolvedValue({ data: users });
    render(<Admin />);
    await waitFor(() => {
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
