import { useState, useMemo } from 'react';
import { VscHeartFilled, VscGithubInverted } from 'react-icons/vsc';
import Logo from '../assets/logo.webp';
import './Header.css';

const Header = ({ onSearch, names }) => {
  const [search, setSearch] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  
  const handleAutocomplete = (event) => {
    onSearch(event.target.textContent);
    setSearch('');
  };

  const autocomplete = useMemo(() => {
    let searchLowerCase = search.toLowerCase();
    return names.filter((value) => value.toLowerCase().includes(searchLowerCase));
  }, [search, names]);

  return (
    <div className='header'>
      <div className='center'>
        <div className='header__logo'>
          <a href='/'><img src={Logo} alt='logo-pokemon' /></a>
        </div>
        <div className='header__search'>
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
                        return <li key={index} onClick={handleAutocomplete}>{value}</li>;
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