import Pagination from './Pagination';

const Pokedex = (props) => {
  const { pokemons, loading, page, setPage, allPages } = props;

  const onLeftClick = () => {
    if (page > 0)
      setPage(page - 1);
  };

  const onRightClick = () => {
    if (page + 1 !== allPages)
      setPage(page + 1);
  }

  return (
    <div className="pokedex">
      <div className="center">
        {
          (loading) 
            ? <div><p>Carregado...</p></div>
            : <ul className="pokedex__list">
                {
                  pokemons.map((pokemon, index) => {
                    const types = pokemon.types.map((typeInfo, index) => {
                      return (
                        <li key={index}>{typeInfo.type.name}</li>
                      );
                    });

                    return (
                      <li key={index}>
                        <img className="list__sprite" src={pokemon.sprites.other["official-artwork"].front_default} alt="" />
                        <h2 className="list__name">{pokemon.name}</h2>
                        <ul className="list__types">{types}</ul>
                      </li>
                    );
                  })
                }
              </ul>
        }
        <Pagination 
          page={page}
          allPages={allPages}
          onLeftClick={onLeftClick}
          onRightClick={onRightClick}
        />
      </div>
    </div>
  );
};

export default Pokedex;