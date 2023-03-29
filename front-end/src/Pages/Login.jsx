import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:3001/login',
        {
          email,
          password,
        },
      );
      const { role } = res.data;
      console.log(role);
      if (role === 'customer') {
        navigate('/customer/products');
      }
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const validateInputs = () => {
    const MIN_PASSWORD_LENGTH = 6;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const emailIsValid = emailRegex.test(email);
    console.log(emailIsValid);
    if (password.length >= MIN_PASSWORD_LENGTH && emailIsValid) {
      setIsValid(true);
    }
  };

  useEffect(() => {
    validateInputs();
  }, [email, password]);

  return (
    <div className="Login">
      <form onSubmit={ handleSubmit }>
        <h1>Login</h1>
        <label htmlFor="email">
          Email
          <input
            data-testid="common_login__input-email"
            name="email"
            type="text"
            placeholder="Email"
            onChange={ (e) => setEmail(e.target.value) }
          />
        </label>

        <label htmlFor="password">
          Password
          <input
            data-testid="common_login__input-password"
            name="password"
            type="password"
            placeholder="Password"
            onChange={ (e) => setPassword(e.target.value) }
          />
        </label>
        <button
          data-testid="common_login__button-login"
          type="submit"
          disabled={ !isValid }
        >
          Login
        </button>
        <button data-testid="common_login__button-register" type="button" onClick={()=>navigate("/register")}>
          Ainda não tenho conta
        </button>
        {error && (
          <p
            data-testid="common_login__element-invalid-email"
            className="error"
          >
            {error}
          </p>
        )}
      </form>
    </div>
  );
}

export default Login;
