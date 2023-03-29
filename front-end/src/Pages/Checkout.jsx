import React from 'react';
import Navbar from '../Components/Navbar';
import Descriptions from '../Components/Descriptions';

function Checkout() {
  return (
    <main>
      <Navbar />
      <section>
        <h3>Finalizar Pedido</h3>
        <table>
          <thead>
            <Descriptions />
          </thead>
        </table>
      </section>
    </main>
  );
}

export default Checkout;
