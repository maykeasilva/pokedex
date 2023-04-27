import { useState, useEffect } from 'react';
import { getPokemons, getPokemonsData, searchPokemonData } from './api';
import Header from './components/Header';
import Pokedex from './components/Pokedex';
import Footer from './components/Footer';

const App = () => {
  const [allNames, setAllNames] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [allPages, setAllPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [allPokemons, setAllPokemons] = useState(true);
  
  const itensPerPage = 60;

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPokemons();
  }, [page]);
  
  useEffect(() => {
    fetchPokemonsNames();
  }, [count]);

  const fetchPokemons = async () => {
    try {
      setLoading(true);

      const data = await getPokemons(itensPerPage, itensPerPage * page);
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonsData(pokemon.url);
      });
      const results = await Promise.all(promises);

      setCount(data.count);
      setPokemons(results);
      setAllPages(Math.ceil(data.count / itensPerPage));
      setLoading(false);
    } catch (err) {
      console.log(`ERROR: ${err}`);
    };
  };

  const fetchPokemonsNames = async () => {
    try {
      if (count != 0) {
        const data = await getPokemons(count);
        const promises = data.results.map(async (pokemon) => {
          return await pokemon.name;
        })
        const results = await Promise.all(promises);
        setAllNames(results);
      }
    } catch (err) {
      console.log(`ERROR: ${err}`);
    };
  };

  const searchPokemons = async (pokemon) => {
    try {
      setLoading(true);
      const result = await searchPokemonData(pokemon);
  
      setAllPokemons(false);
      setPokemons([result])
      setLoading(false);
    } catch (err) {
      console.log(`ERROR: ${err}`);
    };
  };

  return (
    <>
      <Header searchPokemons={searchPokemons} allNames={allNames} />

      { (allPokemons)
          ? <Pokedex pokemons={pokemons} loading={loading} page={page} setPage={setPage} allPages={allPages} />
          : <Pokedex pokemons={pokemons} loading={loading} />
      }

      <Footer />
    </>
  );
};

export default App;
