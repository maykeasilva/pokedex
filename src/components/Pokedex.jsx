import { useState } from 'react';
import Loading from './Loading';
import Pagination from './Pagination';
import './Pokedex.css';

const Pokedex = (props) => {
  const { pokemons, loading, page, setPage, allPages } = props;
  const [hoverCard, setHoverCard] = useState('');

  return (
    <div className="pokedex">
      <div className="center">
        {
          (loading) 
            ? <Loading />
            : <>
              <div className="pokedex__title">
                <h1>Pokedex</h1>
                <Pagination page={page} setPage={setPage} allPages={allPages} />
              </div>

              <ul className="pokedex__cards">
                {
                  pokemons.map((pokemon, index) => {
                    let formatName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
                    let types = pokemon.types.map((typeInfo, index) => {
                      let formatTypes = typeInfo.type.name.charAt(0).toUpperCase() + typeInfo.type.name.slice(1);
                      return <li key={index} className={typeInfo.type.name} >{formatTypes}</li>
                    });

                    let classType = pokemon.types.map((val) => val.type.name)[0];
                    let classScale = index === hoverCard ? 'card__scale' : '';

                    return (
                      <li 
                        key={index}
                        className={classType + " card__single " + classScale}
                        onMouseOver={() => setHoverCard(index)}
                        onMouseOut={() => setHoverCard('')}
                      >
                        <img className="card__image" src={pokemon.sprites.other["official-artwork"].front_default} alt={pokemon.name} />
                        <ul className="card__content">
                          <h2 className="card__name">{formatName}</h2>
                          <ul className="card__types">{types}</ul>
                        </ul>
                      </li>
                    );
                  })
                }
              </ul>

              <Pagination page={page} setPage={setPage} allPages={allPages} />
              </>
        }
      </div>
    </div>
  );
};

export default Pokedex;