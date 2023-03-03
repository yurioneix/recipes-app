import { useHistory } from 'react-router-dom';
import Drinks from '../components/Drinks';
import Foods from '../components/Foods';

function Recipes() {
  const { location: { pathname } } = useHistory();
  return (
    <div>
      <div>Receitas</div>
      {pathname === '/meals' ? <Foods /> : <Drinks />}

    </div>
  );
}

export default Recipes;
