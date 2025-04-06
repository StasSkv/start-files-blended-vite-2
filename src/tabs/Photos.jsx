import { useEffect, useState } from 'react';
import Form from '../components/Form/Form';
import Text from '../components/Text/Text';
import { getPhotos } from '../apiService/photos';
import Loader from '../components/Loader/Loader';
import PhotosGallery from '../components/PhotosGallery/PhotosGallery';
import Button from '../components/Button/Button';
import ImageModal from '../components/ImageModal/ImageModal';

const Photos = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoadig] = useState(false);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalSrc, setModalSrc] = useState('');
  const [modalAlt, setModalAlt] = useState('');

  useEffect(() => {
    if (!query) return;
    const fetchImages = async () => {
      setIsLoadig(true);
      try {
        const { photos, per_page, total_results } = await getPhotos(
          query,
          page
        );

        if (!photos.length) {
          return setIsEmpty(true);
        }
        setImages(prevImages => [...prevImages, ...photos]);
        setVisible(page < Math.ceil(total_results / per_page));
      } catch (error) {
        setError(error);
      } finally {
        setIsLoadig(false);
      }
    };
    fetchImages();
  }, [page, query]);

  const onHandleSubmit = value => {
    setQuery(value);
    setPage(1);
    setImages([]);
    setError(null);
    setIsEmpty(false);
    setVisible(false);
  };

  const onLoadingMore = () => setPage(prevPage => prevPage + 1);

  const isModalOpen = (src, alt) => {
    setModalIsOpen(true);
    setModalAlt(alt);
    setModalSrc(src);
  };

  const isModalClose = () => {
    setModalIsOpen(false);
    setModalAlt('');
    setModalSrc('');
  };

  return (
    <>
      <Form onSubmit={onHandleSubmit} />
      {!error && !isEmpty && !images.length && (
        <Text textAlign="center">Let`s begin search 🔎</Text>
      )}
      {isLoading && <Loader />}
      {error && <Text textAlign="center">Ooops! </Text>}
      {images.length > 0 && (
        <PhotosGallery images={images} openModal={isModalOpen} />
      )}
      {isEmpty && <Text textAlign="center">Soory, we dont found! </Text>}
      {isVisible && images.length > 0 && (
        <Button onClick={onLoadingMore} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Load more'}
        </Button>
      )}
      <ImageModal
        modalIsOpen={modalIsOpen}
        modalSrc={modalSrc}
        modalAlt={modalAlt}
        closeModal={isModalClose}
      />
    </>
  );
};

export default Photos;
