import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#root_modal');

function Modal({ onCloseModal, largeImageURL, tags }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onCloseModal();
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  },[onCloseModal]
  );

  
  const handleBacdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      onCloseModal();
    }
  };

  return createPortal(
    <div className={css.Overlay} onClick={handleBacdropClick}>
      <div className={css.Modal}>
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>,
    modalRoot
  );
}

export default Modal;

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  tags: PropTypes.string.isRequired,
};
