import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Card({ card }) {
  const [quantity, setquantity] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('carrinho'));
    const index = cart.findIndex((item) => +item.id === card.id);
    if (index >= 0) {
      setquantity(cart[index].quantity);
    } else {
      setquantity(0);
    }
  });
  const handleAddProduct = ({ target: { id } }) => {
    const cart = JSON.parse(localStorage.getItem('carrinho'));
    const index = cart.findIndex((item) => item.id === id);
    if (index < 0) {
      const newItem = { id, quantity: 1 };
      cart.push(newItem);
    } else {
      cart[index].quantity += 1;
    }
    localStorage.setItem('carrinho', JSON.stringify(cart));
    setquantity();
  };

  const handleRemoveProduct = ({ target: { id } }) => {
    console.log(id);
    const cart = JSON.parse(localStorage.getItem('carrinho'));
    const index = cart.findIndex((item) => item.id === id);
    if (index >= 0 && cart[index].quantity > 0) {
      cart[index].quantity -= 1;
    }
    localStorage.setItem('carrinho', JSON.stringify(cart));
    setquantity();
  };

  return (
    <div className="Card">
      <div className="Card__container">
        <div className="Card__container__top">
          <p data-testid={ `customer_products__element-card-price-${card.id}` }>
            {(card.price).replace(/\./g, ',')}
          </p>
          <img
            data-testid={ `customer_products__img-card-bg-image-${card.id}` }
            src={ card.urlImage }
            alt={ card.name }
          />
        </div>
        <div className="Card__container__down">
          <h2
            data-testid={ `customer_products__element-card-title-${card.id}` }
            className="Card__title"
          >
            {card.name}
          </h2>
          <div className="Card__container-buttons">
            <button
              type="button"
              data-testid={ `customer_products__button-card-rm-item-${card.id}` }
              id={ card.id }
              onClick={ handleRemoveProduct }
            >
              -
            </button>
            <input
              data-testid={ `customer_products__input-card-quantity-${card.id}` }
              type="number"
              value={ quantity }
            />
            <button
              type="button"
              data-testid={ `customer_products__button-card-add-item-${card.id}` }
              id={ card.id }
              onClick={ handleAddProduct }
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
Card.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  urlImage: PropTypes.string.isRequired,
}.isRequired;

export default Card;
