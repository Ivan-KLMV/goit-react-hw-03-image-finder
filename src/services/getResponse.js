const API_KEY = '34585976-51a68d3a5f9444fd8119e93c8';
const BASE_URL =
  'https://pixabay.com/api/?image_type=photo&orientation=horizontal&per_page=12';

export const getImagesApi = (searchValue, page) => {
  return fetch(`${BASE_URL}&key=${API_KEY}&q=${searchValue}&page=${page}`).then(
    res => {
      return res.json();
    }
  );
};
