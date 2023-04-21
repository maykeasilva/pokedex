const Pokedex = (props) => {
  const { pokemons, loading } = props;

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
                        <img className="list__sprite" src={pokemon.sprites.front_default} alt="" />
                        <h2 className="list__name">{pokemon.name}</h2>
                        <ul className="list__types">{types}</ul>
                      </li>
                    );
                  })
                }
              </ul>
        }
      </div>
    </div>
  );
};

export default Pokedex;