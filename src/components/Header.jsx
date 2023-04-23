import { VscGithubInverted } from 'react-icons/vsc';
import './Header.css';

const Header = (props) => {
  const { search, setSearch, classSearch, setClassSearch, filteredPokemons } = props;

  return (
    <div className="header">

      <div className="center">
        <div className="header__logo">
          <a href="/"><img src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" alt="logo-pokemon" /></a>
        </div>
        <div className="header__search">
          <input
            onFocus={() => setClassSearch('show__filtereds')}
            onBlur={() => setClassSearch('hide__filtereds')}
            onChange={(e) => setSearch(e.target.value)} 
            value={search} 
            type="text" 
            placeholder="Buscar"
          />

          <ul className={classSearch}>
            {
              filteredPokemons.length 
                ? filteredPokemons.map((value, index) => {
                  let formatName = value.charAt(0).toUpperCase() + value.slice(1);
                  return <li key={index}>{formatName}</li>;
                })
                : <li>Nenhum resultado encontrado.</li>
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