import { VscGithubInverted } from 'react-icons/vsc';
import './Header.css';

const Header = (props) => {
  const { search, setSearch } = props;

  return (
    <div className="header">
      <div className="center">
        <div className="header__logo">
          <a href="/"><img src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" alt="logo-pokemon" /></a>
        </div>
        <div className="header__search">
          <input onChange={(e) => setSearch(e.target.value)} value={search} type="text" placeholder="Buscar"/>
        </div>
        <div className="header__social-network">
          <a href="https://github.com/maykeasilva" target="_black"><VscGithubInverted className="github__icon" /></a>
        </div>
      </div>
    </div>
  );
};

export default Header;