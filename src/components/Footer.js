import React from 'react';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer
      data-testid="footer"
      className="flex justify-around fixed bottom-0 w-full bg-slate-300 p-2"
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
