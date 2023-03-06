import React from 'react';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer
      data-testid="footer"
      style={ {
        position: 'fixed',
        bottom: '0px',
      } }
    >
      <a href="/drinks">
        <img src={ drinkIcon } alt="drinkIcon" data-testid="drinks-bottom-btn" />
      </a>
      <a href="/meals">
        <img src={ mealIcon } alt="mealIcon" data-testid="meals-bottom-btn" />
      </a>
    </footer>
  );
}

export default Footer;
