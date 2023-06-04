import { Audio } from 'react-loader-spinner';
import css from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={css.Loader}>
       <Audio
      height="200"
      width="200"
      color="#4fa94d"
      ariaLabel="audio-loading"
      wrapperStyle={{
        position: 'absolute',
        top: '50%',
        left: ' 50%',
        transform: 'translate(-50%, -50%)',
      }}
      wrapperClass="wrapper-class"
      visible={true}
    />
    </div>
   
  );
};
