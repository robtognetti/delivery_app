import React, { useContext } from 'react';
import Navbar from '../Components/Navbar';
import Descriptions from '../Components/Descriptions';
import { Context } from '../Context/Context';
import Address from '../Components/Address';

function Checkout() {
  const { total } = useContext(Context);
  const cart = JSON.parse(localStorage.getItem('carrinho')) || [];
  return (
    <main className="Checkout">
      <Navbar />
      <section className="Checkout__container">
        <h3>Finalizar Pedido</h3>
        <table>
          <thead>
            <Descriptions />
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={ index }>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-item-number-${index}`
                  }
                >
                  {index + 1 }
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-name-${index}`
                  }
                >
                  {item.name}
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-quantity-${index}`
                  }
                >
                  {item.quantity}
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-unit-price-${index}`
                  }
                >
                  {item.unitPrice}
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-sub-total-${index}`
                  }
                >
                  {(item.unitPrice * item.quantity).toFixed(2)}
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-remove-${index}`
                  }
                >
                  <button type="button">Remover</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          data-testid="customer_checkout__element-order-total-price"
          type="button"
        >
          {total}

        </button>
        <h1>Detalhes e Endereço para Entrega</h1>
        <Address />
      </section>
    </main>
  );
}

export default Checkout;
