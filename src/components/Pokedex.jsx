import Loading from './Loading';
import Pagination from './Pagination';
import './Pokedex.css';

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
            ? <Loading />
            : <>
              <Pagination 
                page={page}
                allPages={allPages}
                onLeftClick={onLeftClick}
                onRightClick={onRightClick}
              />
              <ul className="cards">
                {
                  pokemons.map((pokemon, index) => {
                    const types = pokemon.types.map((typeInfo, index) => {
                      return <li key={index} className={typeInfo.type.name} >{typeInfo.type.name}</li>
                    });

                    return (
                      <li key={index} className={pokemon.types.map((val) => val.type.name)[0]} >
                        <ul className="card-content">
                          <h2 className="card-name">{pokemon.name}</h2>
                          <ul className="card-types">{types}</ul>
                        </ul>                        
                        <img className="card-image" src={pokemon.sprites.other["official-artwork"].front_default} alt={pokemon.name} />
                      </li>
                    );
                  })
                }
              </ul>
              <Pagination 
                page={page}
                allPages={allPages}
                onLeftClick={onLeftClick}
                onRightClick={onRightClick}
              />
              </>
        }
      </div>
    </div>
  );
};

export default Pokedex;