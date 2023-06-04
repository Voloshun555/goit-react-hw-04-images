import { Component } from 'react';
import React from 'react';
import css from './App.module.css';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ToastContainer, toast } from 'react-toastify';
import { ButtonSeeMore } from 'components/Button/Button';
import { imgApiService } from '../services/img-api';
import { Loader } from './Loader/Loader';
import Modal from 'components/Modal/Modal';

class App extends Component {
  state = {
    images: [],
    tags: '',
    largeImage: '',
    query: '',
    page: 1,
    showModal: false,
    total: 0,
    spiner: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    const prevQuery = prevState.query;
    const prevPage = prevState.page;
    if (prevQuery !== query || prevPage !== page) {
      this.fetchImages(query, page);
    }
  }

  fetchImages = async (query, page) => {
    try {
      this.setState({ spiner: true });
      const data = await imgApiService(query, page);
      if (data.totalHits === 0) {
        toast.warning(
          `Вибачте, немає зображень, які відповідають вашому пошуковому запиту. Будь ласка спробуйте ще раз`
        );
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
        total: data.totalHits,
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({
        spiner: false,
      });
    }
  };

  onSeeMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  onOpenModal = (largeImage, tags) => {
    this.setState({
      showModal: true,
      largeImage,
      tags,
    });
  };
  onCloseModal = () => {
    this.setState({
      showModal: false,
      largeImage: '',
      tags: '',
    });
  };

  handlaSubmit = query => {
    this.setState({ query, page: 1, images: [] });
  };

  render() {
    const {
      showModal,
      spiner,
      total,
      largeImage,
      tags,
      images,
    } = this.state;


    const totalPage = total / images.length;
    return (
      <section className={css.App}>
        <Searchbar onSubmit={this.handlaSubmit} />
        {spiner && Loader()}
        {images.length === 0 && (<h1 className={css.TitlePreview}>Напишіть назву картинки яка вас цікавить </h1>)}
        {images.length !== 0 && (
          <ImageGallery galary={images} openModal={this.onOpenModal} />
        )}
        {totalPage > 1 && !spiner && images.length !== 0 && (
          <ButtonSeeMore onClick={this.onSeeMore} />
        )}
        {showModal && (
          <Modal
            tags={tags}
            largeImage={largeImage}
            onCloseModal={this.onCloseModal}
          />
        )}
        <ToastContainer/>
      </section>
    );
  }
}

export default App;
