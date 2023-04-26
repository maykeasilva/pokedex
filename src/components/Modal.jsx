import { VscChromeClose } from 'react-icons/vsc';
import './Modal.css';

const Modal = ({ pokemons, setRenderModal, currentIndex, setCurrentIndex }) => {

  const name = pokemons[currentIndex].name.charAt(0).toUpperCase() + pokemons[currentIndex].name.slice(1);

  const abilities = pokemons[currentIndex].abilities.map((value, index) => {
    let isHidden = value.is_hidden;

    if (isHidden == false) {
      let replaceAbilities = value.ability.name.replace('-', ' ').split(' ').map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1)
      });
      return <li key={index}>{replaceAbilities.join(' ')}</li>;
    }
  });

  const types = pokemons[currentIndex].types.map((value, index) => {
    let formatTypes = value.type.name.charAt(0).toUpperCase() + value.type.name.slice(1)
    return <li key={index} className={'type-' + value.type.name} >{formatTypes}</li>;
  })

  const stats = pokemons[currentIndex].stats.map((value, index) => {   
    let replaceStats = value.stat.name.replace('-', ' ').split(' ').map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });

    let test = ( value.base_stat / 255 ) * 75;

    return <li key={index}><p>{replaceStats.join(' ')}:</p><span style={{width: test + '%'}}></span><b>{value.base_stat}</b></li>;
  });

  return (
    <div className='pokedex__modal'>
      <div className={'modal__single ' + pokemons[currentIndex].types.map((val) => val.type.name)[0]}>
        <button onClick={() => {
          setRenderModal(false)
          setCurrentIndex(null)
        }}>
          <VscChromeClose className='close__icon' />
        </button>

        <div className='container'>
          <div className='left'>
            <h2 className='modal__name'>{name}</h2>
            <img className='modal__image' src={pokemons[currentIndex].sprites.other['official-artwork'].front_default} alt={pokemons[currentIndex].name} />
          </div>

          <div className='right'>
            <h2>Abilities</h2>
            <ul className='modal__abilities'>{abilities}</ul>
            
            <h2>Type</h2>
            <ul className='modal__types'>{types}</ul>
            
            <h2>Height</h2>
            <p>{pokemons[currentIndex].height}</p>
            
            <h2>Weight</h2>
            <p>{pokemons[currentIndex].weight}</p>
          </div>
        </div>

        <h2>Stats</h2>
        <ul className='modal__stats'>{stats}</ul>
      </div>
    </div>
  );
};

export default Modal;