import PropTypes from 'prop-types';
import React from 'react';
import clipboardCopy from 'clipboard-copy';
import compartilhar from '../images/shareIcon.svg';

export default function ShareButton({ copied, setCopied }) {
  const handleCopy = () => {
    clipboardCopy(window.location.href);
    if (copied === false) {
      setCopied(true);
    } else {
      setCopied(false);
    }
  };

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      handleCopy();
    }
  }

  return (
    <button
      className="bg-slate-200 text-white font-bold py-2 px-4 rounded mb-2"
      data-testid="share-btn"
      onClick={ handleCopy }
      onKeyDown={ handleKeyDown }
    >
      <img src={ compartilhar } alt="share" />
    </button>
  );
}

ShareButton.propTypes = {
  copied: PropTypes.bool,
  setCopied: PropTypes.func,
}.isRequired;
