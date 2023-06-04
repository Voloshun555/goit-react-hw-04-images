import { useState, useEffect } from 'react';
import React from 'react';
import css from './App.module.css';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ToastContainer, toast } from 'react-toastify';
import { ButtonSeeMore } from 'components/Button/Button';
import { imgApiService } from '../services/img-api';
import { Loader } from './Loader/Loader';
import Modal from 'components/Modal/Modal';

function App () {
  const [images, setImages] = useState([])
  const [tags, setTags] = useState('')
  const [largeImage, setLargeImage] = useState('')
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [spiner, setSpiner] = useState(false)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    if (query !== '') {
      fetchImages(query, page)
    }
  }, [query, page])
  

 const fetchImages = async (query, page) => {
    try {
      setSpiner(true)
      const data = await imgApiService(query, page);
      if (data.totalHits === 0) {
        toast.warning(
          `Вибачте, немає зображень, які відповідають вашому пошуковому запиту. Будь ласка спробуйте ще раз`
        );
      }
      setImages(prevState => [...prevState, ...data.hits])
      setTotal(data.totalHits)
    } catch (error) {
      
    } finally {
      setSpiner(false)
    }
  };

 const onSeeMore = () => {
  setPage(prevState => prevState + 1)
   
  };

 const onOpenModal = (largeImage, tags) => {
    setShowModal(true)
    setLargeImage(largeImage)
    setTags(tags)
  };
 const onCloseModal = () => {
  setShowModal(false)
  setLargeImage(largeImage)
  setTags(tags)
  };

  const handlaSubmit = query => {
    setQuery(query)
    setPage(1)
    setImages([])
  };

    const totalPage = total / images.length;
    return (
      <section className={css.App}>
        <Searchbar onSubmit={handlaSubmit} />
        {spiner && Loader()}
        {images.length === 0 && (<h1 className={css.TitlePreview}>Напишіть назву картинки яка вас цікавить </h1>)}
        {images.length !== 0 && (
          <ImageGallery galary={images} openModal={onOpenModal} />
        )}
        {totalPage > 1 && !spiner && images.length !== 0 && (
          <ButtonSeeMore onClick={onSeeMore} />
        )}
        {showModal && (
          <Modal
            tags={tags}
            largeImageURL={largeImage}
            onCloseModal={onCloseModal}
          />
        )}
        <ToastContainer/>
      </section>
    );
  }


export default App;
