import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const Pagination = (props) => {
  const { page, allPages, onLeftClick, onRightClick } = props;
  
  return (
    <div className="pokedex__pagination">
      <button onClick={onLeftClick}><FaAngleLeft /></button>
      <p>{page + 1} de {allPages}</p>
      <button onClick={onRightClick}><FaAngleRight /></button>
    </div>
  );
};

export default Pagination;