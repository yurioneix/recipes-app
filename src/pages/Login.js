import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import HeaderContext from '../context/HeaderContext';
import brand from '../images/recipes-logo.png';

function Login() {
  const { setShowHeader } = useContext(HeaderContext);
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    setShowHeader(false);
  }, [setShowHeader]);

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
    <form
      className=" w-full flex-col border bg-white
    px-6 py-14 shadow-md rounded-[4px] md:w-2/6 mx-auto mt-[20vh]"
    >
      <div className="mb-8 flex justify-center">
        <img className="w-3/6" src={ brand } alt="brand as drink" />
      </div>
      <div className="flex flex-col text-sm rounded-md">
        <label htmlFor="email-input">
          <input
            className="mb-5 rounded-[4px] border p-3 hover:outline-none
            focus:outline-none hover:border-yellow-500 w-full"
            id="email-input"
            data-testid="email-input"
            type="email"
            placeholder="Email"
            value={ email }
            onChange={ (e) => setEmail(e.target.value) }
          />
        </label>
        <label htmlFor="password-input">
          <input
            className="border rounded-[4px] p-3 hover:outline-none
            focus:outline-none hover:border-yellow-500 w-full"
            id="password-input"
            placeholder="Password"
            data-testid="password-input"
            type="password"
            value={ password }
            onChange={ (e) => setPassword(e.target.value) }
          />
        </label>
      </div>
      <button
        className="mt-5 w-full border p-2 bg-gradient-to-r
         from-gray-800 bg-gray-500 text-white rounded-[4px]
         hover:bg-slate-400 scale-105 duration-300 disabled:text-gray-500"
        data-testid="login-submit-btn"
        type="button"
        disabled={ isDisabled }
        onClick={ handleLogin }
      >
        Entrar
      </button>
    </form>
  );
}

export default Login;
