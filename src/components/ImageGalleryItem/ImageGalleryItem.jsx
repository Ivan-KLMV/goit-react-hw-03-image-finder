export const ImageGalleryItem = ({ images }) => {
  return images.map(image => (
    <li key={image.id} className="gallery-item">
      <img src={image.webformatURL} alt="" />
    </li>
  ));
};
