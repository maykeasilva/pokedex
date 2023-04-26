import { useState } from 'react';
import Loading from './Loading';
import Pagination from './Pagination';
import Modal from './Modal';
import './Pokedex.css';

const Pokedex = ({ pokemons, loading, page, setPage, allPages }) => {

  const [hoverCard, setHoverCard] = useState(null);
  const [renderModal, setRenderModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  return (
    <div className='pokedex'>
      <div className='center'>
        { (loading)
            ? <Loading />
            : <>
                <ul className='pokedex__cards'>
                  {
                    pokemons.map((pokemon, index) => {
                      let formatName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
                      let types = pokemon.types.map((value, index) => {
                        let formatTypes = value.type.name.charAt(0).toUpperCase() + value.type.name.slice(1);
                        return <li key={index} className={'type-' + value.type.name} >{formatTypes}</li>
                      });

                      let classType = pokemon.types.map((val) => val.type.name)[0];
                      let classScale = index === hoverCard ? 'card__scale' : '';

                      return (
                        <li
                          key={index}
                          className={classType + ' card__single ' + classScale}
                          onMouseOver={() => setHoverCard(index)}
                          onMouseOut={() => setHoverCard(null)}
                          onClick={() => {
                            setRenderModal(true)
                            setCurrentIndex(index)
                          }}
                        >
                          <img className='card__image' src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} />
                          <ul className='card__content'>
                            <h2 className='card__name'>{formatName}</h2>
                            <ul className='card__types'>{types}</ul>
                          </ul>
                        </li>
                      );
                    })
                  }
                </ul>

                {
                  (renderModal) && <Modal 
                    pokemons={pokemons} 
                    setRenderModal={setRenderModal} 
                    currentIndex={currentIndex} 
                    setCurrentIndex={setCurrentIndex} 
                  />
                }

                <Pagination 
                  page={page} 
                  setPage={setPage} 
                  allPages={allPages} 
                />
              </>
        }
      </div>
    </div>
  );
};

export default Pokedex;