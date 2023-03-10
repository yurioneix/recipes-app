import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function ProfileNavegation() {
  const history = useHistory();
  const [userEmail, setUserEmail] = useState('');
  useEffect(() => {
    setUserEmail(JSON.parse(localStorage.getItem('user')));
  }, []);

  const logout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      { userEmail && (
        <main>
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
        </main>)}
    </div>
  );
}
