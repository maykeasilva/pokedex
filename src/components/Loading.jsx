import { VscLoading } from 'react-icons/vsc';
import './Loading.css';

const Loading = () => {

  return (
    <div className='loading'>
      <VscLoading className='loading__icon' />
    </div>
  );
};

export default Loading;