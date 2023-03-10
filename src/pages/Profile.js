import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import HeaderContext from '../context/HeaderContext';
import ProfileNavegation from '../components/ProfileNavegation';

export default function Profile() {
  const { setTitle, setShowHeader, setSearch } = useContext(HeaderContext);

  useEffect(() => {
    setShowHeader(true);
    setTitle('Profile');
    setSearch(false);
  }, [setShowHeader, setTitle, setSearch]);

  return (
    <div>
      <ProfileNavegation />
      <Footer />
    </div>
  );
}
