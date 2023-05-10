export const ImageGalleryItem = ({ images }) => {
  return images.map(image => (
    <li key={image.id} className="ImageGalleryItem-image">
      <a href={image.largeImageURL}>
        <img src={image.webformatURL} alt={image.tags} />
      </a>
    </li>
  ));
};
