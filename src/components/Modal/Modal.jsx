import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#root_modal');

class Modal extends Component {
  static propTypes = {
    largeImage: PropTypes.string.isRequired,
    onCloseModal: PropTypes.func.isRequired,
    tags: PropTypes.string.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  handleBacdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      this.props.onCloseModal();
    }
  };

  render() {
    return createPortal(
      <div className={css.Overlay} onClick={this.handleBacdropClick}>
        <div className={css.Modal}>
          <img src={this.props.largeImage} alt={this.props.tags} />
        </div>
      </div>,
      modalRoot
    );
  }
}
export default Modal;
