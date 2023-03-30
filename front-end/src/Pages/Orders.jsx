import React, { useContext, useState } from 'react';
import Navbar from '../Components/Navbar';
import Descriptions from '../Components/Descriptions';
import { Context } from '../Context/Context';

function Orders() {
  const [dateString] = useState(new Date().toLocaleDateString());

  const { total } = useContext(Context);
  const cart = JSON.parse(localStorage.getItem('carrinho')) || [];
  return (
    <main className="Checkout">
      <Navbar />
      <section className="Checkout__container">
        <h3>Detalhe do Pedido</h3>
        <form>
          <label
            htmlFor="id_order"
            data-testid="customer_order_details__element-order-details-label-order-id"
          >
            {/* id que vem req 20/21 */}
          </label>
          <label
            htmlFor="id_seller"
            data-testid="customer_order_details__element-order-details-label-seller-name"
          >
            {/* id que vem req 20/21 */}
          </label>
          <label
            htmlFor="sale_date"
            data-testid="customer_order_details__element-order-details-label-order-date"
          >
            { dateString }
          </label>
          <button
            // data-testid="customer_order_details__element-order-details-label-delivery-status"
            type="button"
          >
            ENTREGUE
          </button>
          <button
            data-testid="customer_order_details__button-delivery-check"
            type="button"
          >
            MARCAR COMO ENTREGUE
          </button>
        </form>
        <table>
          <thead>
            <Descriptions />
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={ index }>
                <td
                  data-testid={
                    `customer_order_details__element-order-table-item-number-${index}`
                  }
                >
                  {index + 1 }
                </td>
                <td
                  data-testid={
                    `customer_order_details__element-order-table-name-${index}`
                  }
                >
                  {item.name}
                </td>
                <td
                  data-testid={
                    `customer_order_details__element-order-table-quantity-${index}`
                  }
                >
                  {item.quantity}
                </td>
                <td
                  data-testid={
                    `customer_order_details__element-order-table-unit-price-${index}`
                  }
                >
                  {item.unitPrice}
                </td>
                <td
                  data-testid={
                    `customer_order_details__element-order-table-sub-total-${index}`
                  }
                >
                  {(item.unitPrice * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          data-testid="customer_order_details__element-order-total-price"
          type="button"
        >
          {total}

        </button>
      </section>
    </main>
  );
}

export default Orders;
