import { useState, useEffect } from 'react';
import { getPokemons, getPokemonData, searchPokemonData } from './api';
import Header from './components/Header';
import Pokedex from './components/Pokedex';
import Footer from './components/Footer';

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonsNames, setPokemonsNames] = useState([]);
  const [page, setPage] = useState(0);
  const [allPages, setAllPages] = useState(0);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  
  const itensPerPage = 48;

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
        return await getPokemonData(pokemon.url);
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
        setPokemonsNames(results);
      }
    } catch (err) {
      console.log(`ERROR: ${err}`);
    };
  };

  const searchPokemons = async (pokemon) => {
    if (!pokemon) {
      return fetchPokemons();
    };

    setLoading(true);
    setNotFound(false);
    const result = await searchPokemonData(pokemon);

    if (!result) {
      setNotFound(true);
    } else {
      setPokemons([result])
      setPage(0);
      setAllPages(1);
    };
    setLoading(false);
  }

  return (
    <>
      <Header searchPokemons={searchPokemons} pokemonsNames={pokemonsNames} />
      
      {(notFound)
        ? (<div><p>Nenhum pokemon encontrado</p></div>) 
        : (<Pokedex pokemons={pokemons} loading={loading} page={page} setPage={setPage} allPages={allPages} />)
      }
      
      <Footer />
    </>
  );
};

export default App;
