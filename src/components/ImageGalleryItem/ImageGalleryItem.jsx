import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types'

export const ImageGalleryItem = ({webformatURL, tags, openModal, largeImageURL }) => {
  return (
    <li className={css.ImageGalleryItem} onClick={() => openModal(largeImageURL, tags)}>
      <img className={css.img} src={webformatURL} alt={tags}/>
    </li>
  );
};

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
