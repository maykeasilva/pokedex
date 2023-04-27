import Loading from './Loading';
import Cards from './Cards';
import Pagination from './Pagination';

const Pokedex = ({ pokemons, loading, page, setPage, allPages, openDetails }) => {

  return (
    <div className='pokedex'>
      <div className='center'>
        { (loading) 
            ? <Loading />
            : (
              <>
                <Cards pokemons={pokemons} openDetails={openDetails} />
                <Pagination page={page} setPage={setPage} allPages={allPages} />
              </>
            )
        }
      </div>
    </div>
  );
};

export default Pokedex;