import { useState } from 'react';
import Loading from './Loading';
import Pagination from './Pagination';
import './Pokedex.css';

const Pokedex = (props) => {
  const [hoverCard, setHoverCard] = useState('');
  const { pokemons, loading, page, setPage, allPages } = props;

  const onLeftClick = () => {
    if (page > 0)
      setPage(page - 1);
  };

  const onRightClick = () => {
    if (page + 1 !== allPages)
      setPage(page + 1);
  };

  return (
    <div className="pokedex">
      <div className="center">
        {
          (loading) 
            ? <Loading />
            : <>
              <div className="pokedex__title">
                <h1>Pokedex</h1>
                <Pagination 
                  page={page}
                  allPages={allPages}
                  onLeftClick={onLeftClick}
                  onRightClick={onRightClick}
                />
              </div>
              <ul className="pokedex__cards">
                {
                  pokemons.map((pokemon, index) => {
                    const types = pokemon.types.map((typeInfo, index) => {
                      return <li key={index} className={typeInfo.type.name} >{typeInfo.type.name}</li>
                    });
                    
                    const classType = pokemon.types.map((val) => val.type.name)[0];
                    const classScale = index === hoverCard ? 'card__scale' : '';

                    return (
                      <li 
                        key={index}
                        className={classType + " card__single " + classScale}
                        onMouseOver={() => setHoverCard(index)}
                        onMouseOut={() => setHoverCard('')}
                      >
                        <img className="card__image" src={pokemon.sprites.other["dream_world"].front_default} alt={pokemon.name} />
                        <ul className="card__content">
                          <h2 className="card__name">{pokemon.name}</h2>
                          <ul className="card__types">{types}</ul>
                        </ul>                        
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

// other["official-artwork"].front_default | front_shiny
// other["dream_world"].front_default
// other["home"].front_default | front_shiny