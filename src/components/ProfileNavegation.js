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
      {userEmail && (
        <main>
          <h2 data-testid="profile-email" className="text-center mt-5 italic">
            {userEmail.email}
          </h2>
          <div className="flex flex-col items-center mt-5 bg-slate-50">
            <button
              type="button"
              data-testid="profile-done-btn"
              onClick={ () => history.push('/done-recipes') }
              className="bg-green-500
              hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl w-52"
            >
              Done Recipes
            </button>
            <button
              type="button"
              data-testid="profile-favorite-btn"
              onClick={ () => history.push('/favorite-recipes') }
              className="bg-blue-500
              hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl w-52 my-5"
            >
              Favorite Recipes
            </button>
            <button
              type="button"
              data-testid="profile-logout-btn"
              onClick={ () => logout() }
              className="bg-red-500
              hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl w-52"
            >
              Logout
            </button>
          </div>
        </main>
      )}
    </div>
  );
}
