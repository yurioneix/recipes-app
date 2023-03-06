import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import HeaderContext from '../context/HeaderContext';

export default function Profile() {
  const { setTitle, setShowHeader, setSearch } = useContext(HeaderContext);

  const [userEmail, setUserEmail] = useState('');
  const history = useHistory();

  const logout = () => {
    localStorage.clear();
    history.push('/');
  };

  useEffect(() => {
    setShowHeader(true);
    setTitle('Profile');
    setSearch(false);
    setUserEmail(JSON.parse(localStorage.getItem('user')));
  }, [setShowHeader, setTitle, setSearch]);

  return (
    <div>
      Profile

      <h2 data-testid="profile-email">
        { userEmail.email }
      </h2>

      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ () => logout() }
      >
        Logout
      </button>

      <Footer />
    </div>
  );
}
