import { useState, useEffect } from 'react';
import { getPokemons, getPokemonData } from './api';
import Header from './components/Header';
import Pokedex from './components/Pokedex';
import Footer from './components/Footer';
import './App.css';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(0);
  const [allPages, setAllPages] = useState(0);

  const itensPerPage = 45;

  useEffect(() => {
    fetchPokemons();
  }, [page]);

  const fetchPokemons = async () => {
    try {
      setLoading(true);
      const data = await getPokemons(itensPerPage, itensPerPage * page);
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url);
      });

      const results = await Promise.all(promises);
      setPokemons(results);
      setLoading(false);
      setAllPages(Math.ceil(data.count / itensPerPage));
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
        page={page}
        setPage={setPage}
        allPages={allPages}
      />
      <Footer />
    </div>
  );
};

export default App;
