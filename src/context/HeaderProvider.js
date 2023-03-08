import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import HeaderContext from './HeaderContext';

function HeaderProvider({ children }) {
  const [showHeader, setShowHeader] = useState(false); // define se vai ou não ser renderizado o header
  const [title, setTitle] = useState(''); // titulo, deve mudar de acordo com a pagina renderizada
  const [search, setSearch] = useState(false); // Icone, deve ser exibido somente em algumas paginas
  const [searchBar, setSearchBar] = useState(false); // COntrola a barra para ser mostrada somente qd é clicada
  const [selected, setSelected] = useState({ // cria um objeto com o valor digitado e radio button selecionado pelo usuário
    searchInput: '',
    searchRadio: '',
  });
  const [result, setResult] = useState({}); // seta o resultado da requisição api filtrada pela função handleFilter

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
      selected,
      setSelected,
      result,
      setResult,
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
      selected,
      setSelected,
      result, // resultado da filtragem ocorrida na função handleFilter que faz requisições a API
      setResult,
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
