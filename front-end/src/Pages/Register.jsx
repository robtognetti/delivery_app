import React, { useState } from 'react';

function Register() {
  const [error, seterror] = useState(null);
  const handleSubmit = () => {
    console.log('q');
  };

  const handleChange = () => {
    console.log('asda');
  };
  return (
    <div className="register">
      <form onSubmit={ handleSubmit }>
        <h1>Create a new account</h1>

        <label htmlFor="nome">
          Nome
          <input
            data-testid="common_register__input-name"
            name="nome"
            type="text"
            placeholder="Seu nome"
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            data-testid="common_register__input-email"
            name="email"
            type="email"
            placeholder="email"
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="passowrd">
          Password
          <input
            data-testid="common_register__input-password"
            name="password"
            type="password"
            onChange={ handleChange }
          />
        </label>
        <button data-testid="common_register__button-register" type="submit">
          Cadastrar
        </button>

        {error && (
          <p
            data-testid="common_register__element-invalid_register"
            className="error"
          >
            {error}
          </p>
        )}
      </form>
    </div>
  );
}

export default Register;
