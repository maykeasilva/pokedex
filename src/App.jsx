import { useState, useEffect } from 'react';
import { getPokemons, getPokemonData } from './api';
import Header from './components/Header';
import './App.css';

const App = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = async () => {
    try {
      const data = await getPokemons();
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url);
      });

      const results = await Promise.all(promises);
      setPokemons(results);
    } catch (error) {
      console.log('fetchPokemons -> ERROR: ', error);
    };
  };

  return (
    <div className="App">
      <Header />
    </div>
  );
};

export default App;
