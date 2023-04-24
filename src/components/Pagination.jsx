import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';
import './Pagination.css';

const Pagination = ({ page, setPage, allPages }) => {

  const onLeftClick = () => {
    if (page > 0)
      setPage(page - 1);
  };

  const onRightClick = () => {
    if (page + 1 !== allPages)
      setPage(page + 1);
  };

  return (
    <div className='pagination'>
      <button onClick={onLeftClick}><VscChevronLeft className='pagination__icon' /></button>
      <p>{page + 1} de {allPages}</p>
      <button onClick={onRightClick}><VscChevronRight className='pagination__icon' /></button>
    </div>
  );
};

export default Pagination;