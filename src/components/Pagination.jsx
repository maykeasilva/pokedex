import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';
import './Pagination.css';

const Pagination = (props) => {
  const { page, allPages, onLeftClick, onRightClick } = props;
  
  return (
    <div className="pagination">
      <button onClick={onLeftClick}><VscChevronLeft className="pagination__icon" /></button>
      <p>{page + 1} de {allPages}</p>
      <button onClick={onRightClick}><VscChevronRight className="pagination__icon" /></button>
    </div>
  );
};

export default Pagination;