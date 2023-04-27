import { useState, useMemo } from 'react';
import { VscMenu, VscSearch, VscHeartFilled, VscGithubInverted } from 'react-icons/vsc';
import './Header.css';

const Header = ({ searchPokemons, allNames }) => {
  const [search, setSearch] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  
  const handleAutocomplete = (event) => {
    let formatDefault = event.target.textContent.toLowerCase().replace(/\s/g, '-')
    searchPokemons(formatDefault);
    setSearch('');
  };

  const autocomplete = useMemo(() => {
    let formatSearch  = search.replace(/\s/g, '-').toLowerCase();
    return allNames.filter((value) => value.toLowerCase().includes(formatSearch));
  }, [search, allNames]);

  return (
    <div className='header'>
      <div className='center'>
        <div className='header__menu'>
          <VscMenu className='menu__icon'/>
        </div>
        <div className='header__search'>
          <VscSearch className='search__icon'/>
          <input
            type='text'
            placeholder='Pesquisar'
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            onFocus={() => setIsSearch(true)}
            onBlur={() => setTimeout(() => setIsSearch(false), 100)}
          />

          { (isSearch) 
              ? <ul className='header__filtereds'>
                  { (autocomplete.length)
                      ? autocomplete.map((value, index) => {
                        let formatName = value.replace(/-/g, ' ')
                          .split(' ')
                          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(' ');

                        return <li key={index} onClick={handleAutocomplete}>{formatName}</li>;
                      })
                      : <li>Nenhum pokemon encontrado.</li>
                  }
                </ul>
              : null
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