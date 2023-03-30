import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Context } from '../Context/Context';

function Address() {
  const [isLoading, setIsLoading] = useState(true);
  const { total } = useContext(Context);
  const [sellers, setSellers] = useState([]);

  const fetchSellers = async () => {
    const sellersData = await axios.get('http://localhost:3001/users/sellers');
    setSellers(sellersData.data);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchSellers();
  }, [total]);

  return (
    <div className="Address">
      {isLoading ? (
        'Carregando'
      ) : (
        <div className="Address__container">
          <label htmlFor="seller">
            P. Vendedora Responsável:
            <select
              name="seller"
              id="seller"
              type="text"
              data-testid="customer_checkout__select-seller"
            >
              {sellers.map((seller) => (
                <option key={ seller.id } value={ seller.id }>
                  {seller.name}
                </option>
              ))}
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
      )}
    </div>
  );
}

export default Address;
