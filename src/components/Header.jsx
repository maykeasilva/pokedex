import { useState, useMemo } from 'react';
import { VscGithubInverted } from 'react-icons/vsc';
import Logo from '../assets/logo.webp';
import './Header.css';

const Header = ({ pokemonsNames }) => {

  const [search, setSearch] = useState('');
  const [renderAutocomplete, setRenderAutocomplete] = useState(false);

  const autocomplete = useMemo(() => {
    let searchLowerCase = search.toLowerCase();
    return pokemonsNames.filter((name) => name.toLowerCase().includes(searchLowerCase));
  }, [search, pokemonsNames]);

  return (
    <div className='header'>
      <div className='center'>
        <div className='header__logo'>
          <a href='/'><img src={Logo} alt='logo-pokemon' /></a>
        </div>
        <div className='header__search'>
          <input
            type='text'
            placeholder='Buscar'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setRenderAutocomplete(true)}
            onBlur={() => setRenderAutocomplete(false)}
          />

          {
            (renderAutocomplete) &&
            <ul className='header__filtereds'>
              {
                (autocomplete.length)
                  ? autocomplete.map((value, index) => {
                    let formatName = value.charAt(0).toUpperCase() + value.slice(1);
                    return <li key={index}>{formatName}</li>;
                  })
                  : <li>Nenhum pokemon encontrado.</li>
              }
            </ul>
          }

        </div>
        <div className='header__contact'>
          <a href='https://github.com/maykeasilva' target='_black'><VscGithubInverted className='github__icon' /></a>
        </div>
      </div>
    </div>
  );
};

export default Header;