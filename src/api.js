const searchPokemonData = async (pokemon) => {
  try {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    const response = await fetch(url);
    return await response.json();
  } catch (err) {
    console.log(`ERROR: ${err}`);
  };
};

const getPokemons = async (limit, offset = 0) => {
  try {
    let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    const response = await fetch(url);
    return await response.json();
  } catch (err) {
    console.log(`ERROR: ${err}`);
  };
};

const getPokemonData = async (url) => {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (err) {
    console.log(`ERROR: ${err}`);
  };
};

export { searchPokemonData, getPokemons, getPokemonData };