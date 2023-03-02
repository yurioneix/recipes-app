import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const validateLogin = () => {
      const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
      const limit = 6;
      setIsDisabled(!(regex.test(email) && password.length > limit));
    };
    validateLogin();
  }, [email, password]);

  const handleLogin = () => {
    localStorage.setItem('user', JSON.stringify({ email }));

    history.push('/meals');
  };

  return (
    <form>
      <label htmlFor="email-input">
        Email
        <input
          id="email-input"
          data-testid="email-input"
          type="email"
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
        />
      </label>
      <label htmlFor="password-input">
        Password
        <input
          id="password-input"
          data-testid="password-input"
          type="password"
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
        />
      </label>
      <button
        data-testid="login-submit-btn"
        type="button"
        disabled={ isDisabled }
        onClick={ handleLogin }
      >
        Enter

      </button>
    </form>
  );
}

export default Login;
