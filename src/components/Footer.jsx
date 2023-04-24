import { VscCode } from 'react-icons/vsc';
import './Footer.css';

const Footer = () => {

  return (
    <div className='footer'>
      <div className='center'>
        <p><VscCode className='footer__icon' /> Projeto em desenvolvimento <VscCode className='footer__icon' /></p>
      </div>
    </div>
  );
};

export default Footer;