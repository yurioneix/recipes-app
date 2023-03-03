import React, { useContext, useEffect } from 'react';
import HeaderContext from '../context/HeaderContext';

export default function Profile() {
  const { setTitle, setShowHeader, setSearch } = useContext(HeaderContext);

  useEffect(() => {
    setShowHeader(true);
    setTitle('Profile');
    setSearch(false);
  }, [setShowHeader, setTitle, setSearch]);

  return (
    <div>Profile</div>
  );
}