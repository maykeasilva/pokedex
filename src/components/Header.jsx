import { useState, useMemo } from 'react';
import { VscGithubInverted } from 'react-icons/vsc';
import './Header.css';

const Header = (props) => {
  const { pokemonsNames } = props;
  
  const [search, setSearch] = useState('');
  const [classAutocomplete, setClassAutocomplete] = useState('hide__filtereds');
  
  const autocomplete = useMemo(() => {
    let searchLowerCase = search.toLowerCase();
    return pokemonsNames.filter((name) => name.toLowerCase().includes(searchLowerCase));
  }, [search, pokemonsNames]);

  return (
    <div className="header">
      <div className="center">
        <div className="header__logo">
          <a href="/"><img src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" alt="logo-pokemon" /></a>
        </div>
        <div className="header__search">
          <input
            type="text"
            placeholder="Buscar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setClassAutocomplete('show__filtereds')}
            onBlur={() => setClassAutocomplete('hide__filtereds')}
          />

          <ul className={classAutocomplete}>
            {
              autocomplete.length
                ? autocomplete.map((value, index) => {
                  let formatName = value.charAt(0).toUpperCase() + value.slice(1);
                  return <li key={index}>{formatName}</li>;
                })
                : <li>Nenhum pokemon encontrado.</li>
            }
          </ul>
        </div>
        <div className="header__social-network">
          <a href="https://github.com/maykeasilva" target="_black"><VscGithubInverted className="github__icon" /></a>
        </div>
      </div>
    </div>
  );
};

export default Header;