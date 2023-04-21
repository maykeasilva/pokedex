import { useState, useEffect } from 'react';
import { getPokemons, getPokemonData } from './api';
import Header from './components/Header';
import Pokedex from './components/Pokedex';
import './App.css';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = async () => {
    try {
      setLoading(true);
      const data = await getPokemons();
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url);
      });

      const results = await Promise.all(promises);
      setPokemons(results);
      setLoading(false);
    } catch (err) {
      console.log(`ERROR: ${err}`);
    };
  };

  return (
    <div className="App">
      <Header />
      <Pokedex
        pokemons={pokemons}
        loading={loading}
      />
    </div>
  );
};

export default App;
