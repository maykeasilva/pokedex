import { useState, useEffect, useMemo } from 'react';
import { getPokemons, getPokemonData } from './api';
import Header from './components/Header';
import Pokedex from './components/Pokedex';
import Footer from './components/Footer';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(0);
  const [allPages, setAllPages] = useState(0);
  const [search, setSearch] = useState('');

  const [pokemonsCount, setPokemonsCount] = useState(0);
  const [pokemonsNames, setPokemonsNames] = useState([]);

  const itensPerPage = 48;

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPokemons();
  }, [page]);
  
  useEffect(() => {
    fetchPokemonsNames();
  }, [pokemonsCount]);

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
      setPokemonsCount(data.count);
    } catch (err) {
      console.log(`ERROR: ${err}`);
    };
  };

  const fetchPokemonsNames = async () => {
    try {
      if (pokemonsCount != 0) {
        const data = await getPokemons(pokemonsCount);
        const promises = data.results.map(async (pokemon) => {
          return await pokemon.name;
        })
        const results = await Promise.all(promises);
        setPokemonsNames(results);
      }
    } catch (err) {
      console.log(`ERROR: ${err}`);
    };
  };

  const filteredPokemons = useMemo(() => {
    let searchLowerCase = search.toLowerCase();
    return pokemonsNames.filter((name) => name.toLowerCase().includes(searchLowerCase));
  }, [search, pokemonsNames]);

  return (
    <>
      <Header 
        search={search} 
        setSearch={setSearch} 
      />
      <Pokedex
        pokemons={pokemons}
        loading={loading}
        page={page}
        setPage={setPage}
        allPages={allPages}
      />
      <Footer />
    </>
  );
};

export default App;
