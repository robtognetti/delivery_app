// import React from 'react';
// import { MemoryRouter, Route } from 'react-router-dom';
// import { render } from '@testing-library/react';
// import { Context } from '../../Context/Context';
// import Checkout from '../../Pages/Checkout';

// const products = [
//   {
//     id: 1,
//     name: 'Product 1',
//     price: 10,
//     quantity: 2,
//   },
//   {
//     id: 2,
//     name: 'Product 2',
//     price: 5,
//     quantity: 3,
//   },
// ];
// const values = [{
//   productId: 1,
//   name: 'Skol Lata 250ml',
//   price: 2.20,
//   quantity: 4,
//   url_image: 'http://localhost:3001/images/skol_lata_350ml.jpg',
// },
// {
//   productId: 2,
//   name: 'Heineken 600ml',
//   price: 7.50,
//   quantity: 2,
//   url_image: 'http://localhost:3001/images/heineken_600ml.jpg',
// },
// {
//   productId: 3,
//   name: 'Antarctica Pilsen 300ml',
//   price: 2.49,
//   quantity: 1,
//   url_image: 'http://localhost:3001/images/antarctica_pilsen_300ml.jpg',
// }];

// beforeEach(() => {
//   localStorage.setItem('user', JSON.stringify(
//     {
//       name: 'Zé Birita rei delas',
//       role: 'customer',
//     },
//   ));
//   localStorage.setItem('carrinho', JSON.stringify(values));
// });

// afterEach(() => {
//   localStorage.clear();
// });

// describe('Checkout', () => {
//   render(
//     <MemoryRouter initialEntries={ ['/customer/checkout'] }>
//       <Context.Provider value={ values }>
//         <Route path="/customer/products">
//           <Checkout />
//         </Route>
//       </Context.Provider>
//     </MemoryRouter>,
//   );

//   it('Renderizar a tabela de produtos', async () => {
//     const { getByTestId } = render(

//       <MemoryRouter initialEntries={ ['/customer/checkout'] }>
//         <Context.Provider value={ values }>
//           <Route path="/customer/products">
//             <CheckoutTable products={ products } />
//           </Route>
//         </Context.Provider>
//       </MemoryRouter>,
//     );

//     expect(getByTestId('customer_element-order-table'))
//       .toBeInTheDocument();
//     expect(getByTestId('customer_checkout__element-order-table-item-number-0'))
//       .toHaveTextContent('1');
//     expect(getByTestId('customer_checkout__element-order-table-name-0'))
//       .toHaveTextContent('Product 1');
//     expect(getByTestId('customer_checkout__element-order-table-quantity-0'))
//       .toHaveTextContent('2');
//     expect(getByTestId('customer_checkout__element-order-table-unit-price-0'))
//       .toHaveTextContent('10,00');
//     expect(getByTestId('customer_checkout__element-order-table-sub-total-0'))
//       .toHaveTextContent('20,00');
//     expect(getByTestId('customer_checkout__element-order-table-item-number-1'))
//       .toHaveTextContent('2');
//     expect(getByTestId('customer_checkout__element-order-table-name-1'))
//       .toHaveTextContent('Product 2');
//     expect(getByTestId('customer_checkout__element-order-table-quantity-1'))
//       .toHaveTextContent('3');
//     expect(getByTestId('customer_checkout__element-order-table-unit-price-1'))
//       .toHaveTextContent('5,00');
//     expect(getByTestId('customer_checkout__element-order-table-sub-total-1'))
//       .toHaveTextContent('15,00');
//   });
// });
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Checkout from '../../Pages/Checkout';
import { Context } from '../../Context/Context';

describe('Checkout', () => {
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

  it('renders checkout page', () => {
    render(
      <Context.Provider value={ mockContext }>
        <Checkout />
      </Context.Provider>,
    );

    expect(screen.getByText('Finalizar Pedido')).toBeInTheDocument();
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('5,00')).toBeInTheDocument();
    expect(screen.getByText('10,00')).toBeInTheDocument();
  });

  it('removes item from cart', () => {
    render(
      <Context.Provider value={ mockContext }>
        <Checkout />
      </Context.Provider>,
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
