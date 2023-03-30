import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Context } from '../Context/Context';

function Address() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { total } = useContext(Context);
  const [address, setAddress] = useState('');
  const [door, setDoor] = useState('');
  const [seller, setSeller] = useState('');
  const [sellers, setSellers] = useState([]);
  const User = JSON.parse(localStorage.getItem('user'));
  const fetchSellers = async () => {
    const sellersData = await axios.get('http://localhost:3001/users/sellers');
    setSellers(sellersData.data);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchSellers();
  }, [total]);
  const handleSubmit = async () => {
    const newSale = {
      sellerId: seller,
      buyerId: User.id,
      totalPrice: total,
      deliveryAddress: address,
      deliveryNumber: door,
      saleDate: new Date(),
      status: 'Pendente',
    };
    const sale = await axios.post('http://localhost:3001/sales', {
      ...newSale,
    });
    console.log(sale);
    // coments
    navigate('/login');
  };
  return (
    <div className="Address">
      {isLoading ? (
        'Carregando'
      ) : (
        <div className="Address__container">
          <form action="sumbmit">
            <label htmlFor="seller">
              P. Vendedora Responsável:
              <select
                name="seller"
                id="seller"
                type="text"
                onChange={ (e) => setSeller(e.target.value) }
                data-testid="customer_checkout__select-seller"
              >
                {sellers.map((sellersData) => (
                  <option key={ sellersData.id } value={ sellersData.id }>
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
                onChange={ (e) => setAddress(e.target.value) }
              />
            </label>
            <label htmlFor="door">
              Número
              <input
                data-testid="customer_checkout__input-address-number"
                name="door"
                type="text"
                placeholder="Ex: 123"
                onChange={ (e) => setDoor(e.target.value) }
              />
            </label>
            <button
              type="button"
              className=""
              data-testid="customer_checkout__button-submit-order"
              onClick={ handleSubmit }
            >
              Finalizar pedido
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
export default Address;
