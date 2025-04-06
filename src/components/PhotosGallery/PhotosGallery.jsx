import PhotosGalleryItem from '../PhotosGalleryItem/PhotosGalleryItem';
import Grid from '../Grid/Grid';
import GridItem from '../GridItem/GridItem';

const PhotosGallery = ({ images, openModal }) => {
  console.log(images);

  return (
    <Grid>
      {images.map(image => (
        <GridItem key={image.id}>
          <PhotosGalleryItem image={image} openModal={openModal} />
        </GridItem>
      ))}
    </Grid>
  );
};

export default PhotosGallery;
