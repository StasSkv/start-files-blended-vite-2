import styles from './PhotosGalleryItem.module.css';

const PhotosGalleryItem = ({ image, openModal }) => {
  const handleClick = () => {
    openModal(image.src.large, image.alt);
  };

  return (
    <div
      onClick={handleClick}
      className={styles.thumb}
      style={{ backgroundColor: image.avg_color, borderColor: image.avg_color }}
    >
      <img
        src={image.src.large}
        alt={image.alt}
        onClick={() => openModal(image.src.large, image.alt)}
      />
    </div>
  );
};

export default PhotosGalleryItem;
