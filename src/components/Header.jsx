import { useState, useMemo } from 'react';
import { VscHeartFilled, VscGithubInverted } from 'react-icons/vsc';
import Logo from '../assets/logo.webp';
import './Header.css';

const Header = ({ searchPokemons, pokemonsNames }) => {

  const [search, setSearch] = useState('');
  const [renderAutocomplete, setRenderAutocomplete] = useState(false);

  const onChangeHandler = (e) => {
    setSearch(e.target.value);
    
    if (e.target.value.length === 0) {
      searchPokemons(undefined);
    };
  };

  const handleAutocompleteClick = (e) => {
    const selectedValue = e.target.getAttribute('value');
    setSearch(selectedValue);
    setRenderAutocomplete(false);
    searchPokemons(selectedValue);
  }

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
            onChange={onChangeHandler}
            onFocus={() => setRenderAutocomplete(true)}
            onBlur={() => {
              setTimeout(() => {
                setRenderAutocomplete(false)
              }, 1000)
            }}
          />

          {
            (renderAutocomplete) &&
            <ul className='header__filtereds'>
              {
                (autocomplete.length)
                  ? autocomplete.map((value, index) => {
                    let formatName = value.charAt(0).toUpperCase() + value.slice(1);
                    return <li value={value} key={index} onClick={handleAutocompleteClick}>{formatName}</li>;
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