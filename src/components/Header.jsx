const Header = () => {
  return (
    <div className="header">
      <div className="center">
        <div className="header__logo">
          <a href="/"><img src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" alt="logo-pokemon" /></a>
        </div>

        <div className="header__search">
          <input type="text" placeholder="Buscar"/>
        </div>
      </div>
    </div>
  );
};

export default Header;