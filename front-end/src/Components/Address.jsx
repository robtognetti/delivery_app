import React from 'react';

function Address() {
  return (
    <div className="Address">
      <div className="Address__container">
        <label htmlFor="seller">
          P. Vendedora Responsável:
          <select
            name="seller"
            id="seller"
            type="text"
            data-testid="customer_checkout__select-seller"
          >
            <option>123</option>
          </select>
        </label>
        <label htmlFor="address">
          Endereço
          <input
            data-testid="customer_checkout__input-address"
            name="address"
            type="text"
            placeholder="Ex: Rua da noite"
          />
        </label>
        <label htmlFor="door">
          Número
          <input
            data-testid="customer_checkout__input-address-number"
            name="door"
            type="text"
            placeholder="Ex: 123"
          />
        </label>
        <button
          type="button"
          className=""
          data-testid="customer_checkout__button-submit-order"
        >
          Finalizar pedido

        </button>
      </div>

    </div>
  );
}

export default Address;
