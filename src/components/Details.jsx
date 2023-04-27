import { VscChromeClose } from 'react-icons/vsc';
import Loading from './Loading';
import './Details.css';

const Details = ({ details, loading, setAllPokemons }) => {

  return (
    <div className='details'>
      { (loading)
          ? <Loading />
          : (
            <>
              {
                details.map((pokemon, index) => {
                  const formatName = pokemon.name.replace(/-/g, ' ')
                    .split(' ')
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');

                  const abilities = pokemon.abilities.map((value, index) => {
                    let isHidden = value.is_hidden;

                    if (isHidden == false) {
                      let formatAbilities = value.ability.name.replace('-', ' ')
                        .split(' ')
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ');

                      return <li key={index}>{formatAbilities}</li>;
                    }
                  });

                  const types = pokemon.types.map((value, index) => {
                    let formatTypes = value.type.name.charAt(0).toUpperCase() + value.type.name.slice(1);

                    return <li key={index} className={`type-${value.type.name}`} >{formatTypes}</li>
                  });

                  const stats = pokemon.stats.map((value, index) => {
                    let formatStats = value.stat.name.replace(/-/g, ' ')
                      .split(' ')
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(' ');

                    let calculatedWidth = (value.base_stat / 255) * 60;

                    return (
                      <li key={index}>
                        <p>{formatStats}:</p>
                        <span style={{ width: calculatedWidth + '%' }}></span>
                        <span>{value.base_stat}</span>
                      </li>
                    )
                  });

                  let classType = pokemon.types.map((value) => value.type.name)[0];

                  return (
                    <div key={index} className={`details__single ${classType}`}>
                      <div className='content'>
                        <div>
                          <h2 className='details__name'>{formatName}</h2>
                          <img className='details__image' src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} />
                        </div>
                        <div className='characteristics'>
                          <h2>Abilities</h2>
                          <ul className='details__abilities'>{abilities}</ul>
                          <h2>Types</h2>
                          <ul className='details__types'>{types}</ul>
                        </div>
                      </div>

                      <h2>Stats</h2>
                      <ul className='details__stats'>{stats}</ul>

                      <button onClick={() => setAllPokemons(true)}><VscChromeClose className='close__icon' /></button>
                    </div>
                  );
                })
              }
            </>
          )
      }
    </div>
  );
};

export default Details;

/*

  const name = pokemons[currentIndex].name.charAt(0).toUpperCase() + pokemons[currentIndex].name.slice(1);




*/