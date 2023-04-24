import { useState } from 'react';
import Loading from './Loading';
import Pagination from './Pagination';
import { VscChromeClose } from 'react-icons/vsc';
import './Pokedex.css';

const Pokedex = (props) => {
  const { pokemons, loading, page, setPage, allPages } = props;
  const [hoverCard, setHoverCard] = useState('');
  const [currentIndex, setCurrentIndex] = useState(null)
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className='pokedex'>
      <div className='center'>
        {
          (loading) 
            ? <Loading />
            : <>
              <div className='pokedex__title'>
                <h1>Pokedex</h1>
                <Pagination page={page} setPage={setPage} allPages={allPages} />
              </div>

              <ul className='pokedex__cards'>
                {
                  pokemons.map((pokemon, index) => {
                    let formatName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
                    let types = pokemon.types.map((typeInfo, index) => {
                      let formatTypes = typeInfo.type.name.charAt(0).toUpperCase() + typeInfo.type.name.slice(1);
                      return <li key={index} className={'type-' + typeInfo.type.name} >{formatTypes}</li>
                    });

                    let classType = pokemon.types.map((val) => val.type.name)[0];
                    let classScale = index === hoverCard ? 'card__scale' : '';

                    return (
                      <li 
                        key={index}
                        className={classType + ' card__single ' + classScale}
                        onMouseOver={() => setHoverCard(index)}
                        onMouseOut={() => setHoverCard('')}
                        onClick={() => {
                          setOpenModal(true)
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
                (openModal) &&
                  <div className='pokedex__modal'>
                    <div className={'modal__single ' + pokemons[currentIndex].types.map((val) => val.type.name)[0]}>
                      <button onClick={() => {
                        setOpenModal(false)
                        setCurrentIndex(null)
                      }}>
                        <VscChromeClose className='close__icon' />
                      </button>

                      <img className='modal__image' src={pokemons[currentIndex].sprites.other['official-artwork'].front_default} alt={pokemons[currentIndex].name} />
                      <h2 className='modal__name'>{pokemons[currentIndex].name}</h2>
                      <ul className='modal__types'>{pokemons[currentIndex].types.map((value, index) => <li key={index} className={value.type.name}>{value.type.name}</li>)}</ul>
                      <ul className='modal__stats'>{pokemons[currentIndex].stats.map((value, index) => <li key={index}>{value.stat.name}: {value.base_stat}</li>)}</ul>
                      <ul className='modal__abilities'>{pokemons[currentIndex].abilities.map((value, index) => <li key={index}>{value.ability.name}</li>)}</ul>
                      {console.log(pokemons[currentIndex])}
                    </div>
                  </div>
              }

              <Pagination page={page} setPage={setPage} allPages={allPages} />
              </>
        }
      </div>
    </div>
  );
};

export default Pokedex;

/*
  let modal = document.querySelector('.pokedex__modal');
  modal.style.display = 'none';

  const openModal = (id) => {
    let card = document.querySelector('.modal__single');
    let modal = document.querySelector('.pokedex__modal');

    let classType = pokemons[id].types.map((value) => value.type.name)[0];
    let formatName = pokemons[id].name.charAt(0).toUpperCase() + pokemons[id].name.slice(1);

    let status = pokemons[id].stats.map((value, index) => {
      return <li key={index}>{value.stat.name}: {value.base_stat}</li>
    })

    modal.style.display = 'flex';
    card.classList.add(classType);
    card.innerHTML = `
      <img className='modal__image' src=${pokemons[id].sprites.other['official-artwork'].front_default} alt=${pokemons[id].name} />
      <h2 className='modal__name'>${formatName}</h2>
      <ul className='modal__stats'>${status}</ul>
    `;

    // console.log(pokemons[id]);
    console.log(status)

    setCurrentClassModal(classType);
  };
*/