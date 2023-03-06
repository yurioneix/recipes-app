import React from 'react';
import HeaderProvider from './context/HeaderProvider';
import RecipesProvider from './context/RecipesProvider';
import Routes from './Routes';

function App() {
  return (
    <HeaderProvider>
      <RecipesProvider>
        <Routes />
      </RecipesProvider>
    </HeaderProvider>
  );
}
export default App;
