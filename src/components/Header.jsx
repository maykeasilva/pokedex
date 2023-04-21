const Header = () => {
  return (
    <div className="header">
      <div className="center">
        <a href="/"><h1>Logo</h1></a>

        <div className="header__search">
          <input type="text" placeholder="Buscar"/>
        </div>
      </div>
    </div>
  );
};

export default Header;