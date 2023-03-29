import React, { useState } from 'react';

function Card({ card }) {
  const [quantity, setquantity] = useState(0);
  console.log(card);
  return (
    <div className="Card">
      <div className="Card__container">
        <div className="Card__container__top">
          <p data-testid={ `customer_products__element-card-price-${card.id}` }>
            {card.price}
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
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
