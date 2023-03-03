import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import HeaderContext from './HeaderContext';

function HeaderProvider({ children }) {
  const [showHeader, setShowHeader] = useState(false); // define se vai ou não ser renderizado o header
  const [title, setTitle] = useState(''); // titulo, deve mudar de acordo com a pagina renderizada
  const [search, setSearch] = useState(false); // Icone, deve ser exibido somente em algumas paginas
  const [searchBar, setSearchBar] = useState(false); // COntrola a barra para ser mostrada somente qd é clicada

  // Função para não causar loot na renderização, ela salva o estado anterior para não precisar verificar a cada renderização
  const contextValue = useMemo(
    () => ({
      showHeader,
      setShowHeader,
      setTitle,
      title,
      search,
      setSearch,
      searchBar,
      setSearchBar,
    }),
    [
      showHeader,
      setShowHeader,
      setTitle,
      title,
      search,
      setSearch,
      searchBar,
      setSearchBar,
    ],
  );
  return (
    <HeaderContext.Provider value={ contextValue }>
      {children}
    </HeaderContext.Provider>
  );
}

HeaderProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HeaderProvider;
