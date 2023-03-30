import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../Context/Context';

function ShoppingCart() {
  const navigate = useNavigate();
  const [total, settotal] = useState(0);
  const { update } = useContext(Context);
  function getTotalPriceFromCart() {
    const cartItems = JSON.parse(localStorage.getItem('carrinho'));

    const totalPrice = cartItems.reduce((acc, item) => {
      const { quantity, unitPrice } = item;
      return acc + (quantity * unitPrice);
    }, 0);
    settotal(totalPrice.toFixed(2));
    return totalPrice.toFixed(2);
  }

  useEffect(() => {
    getTotalPriceFromCart();
  }, [update]);
  return (
    <div className="ShoppingCart">
      <div className="ShoppingCart__container">
        <button
          onClick={ () => navigate('/customer/checkout') }
          type="button"
          data-testid="customer_products__button-cart"
          disabled={ +total === 0 }
        >
          <p data-testid="customer_products__checkout-bottom-value">
            {(total.toString(2)).replace(/\./g, ',')}
          </p>
        </button>
      </div>
    </div>
  );
}

export default ShoppingCart;
