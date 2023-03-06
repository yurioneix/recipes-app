import React, { useContext, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import HeaderContext from '../context/HeaderContext';

export default function Profile() {
  const { setTitle, setShowHeader, setSearch } = useContext(HeaderContext);
  
  const [userEmail, setUserEmail] = useState('');

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
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
      >
        Logout
      </button>

      <Footer />
    </div>
  );
}
