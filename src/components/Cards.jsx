import { useState } from 'react';
import './Cards.css';

const Cards = ({ pokemons }) => {
  const [hoverCard, setHoverCard] = useState(null);

  return (
    <ul className='pokedex__cards'>
      {
        pokemons.map((pokemon, index) => {
          let formatName = pokemon.name.replace(/-/g, ' ')
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

          let types = pokemon.types.map((value, index) => {
            let formatTypes = value.type.name.charAt(0).toUpperCase() + value.type.name.slice(1);
            return <li key={index} className={'type-' + value.type.name} >{formatTypes}</li>
          });

          let classType = pokemon.types.map((value) => value.type.name)[0];
          let classScale = (index) === hoverCard ? 'card__scale' : '';

          return (
            <li
              key={index}
              className={classType + ' card__single ' + classScale}
              onMouseOver={() => setHoverCard(index)}
              onMouseOut={() => setHoverCard(null)}
            >
              <img className='card__image' src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} />
              <h2 className='card__name'>{formatName}</h2>
              <ul className='card__types'>{types}</ul>
            </li>
          );
        })
      }
    </ul>
  );
};

export default Cards;