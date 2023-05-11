import { Component } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { ImageGalleryStyled } from './ImageGallery.styled';
import { getImagesApi } from '../../services/getResponse';
import {
  ImageGalleryItem,
  LoadMoreButton,
  Modal,
  FooterMessage,
} from '../index';

export class ImageGallery extends Component {
  state = {
    searchValue: '',
    images: [],
    currentPage: 1,
    totalHits: 0,
    isLoading: false,
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const nextPage = this.state.currentPage;
    const currentPage = prevState.currentPage;
    const newSearch = this.props.searchValue;
    const currentSearch = prevProps.searchValue;
    const newSearchInstate = this.state.searchValue;
    const prevSearchInState = prevState.searchValue;

    if (currentSearch !== newSearch) {
      this.setState({
        searchValue: newSearch,
        images: [],
        currentPage: 1,
        error: null,
      });
      return;
    }

    if (newSearchInstate !== prevSearchInState || nextPage !== currentPage) {
      this.setState({ isLoading: true });

      getImagesApi(newSearchInstate, nextPage)
        .then(data => {
          if (data.hits.length > 0) {
            this.setState(({ images }) => ({
              images: [...images, ...data.hits],
              totalHits: data.totalHits,
            }));
            return;
          }
          return Promise.reject(
            new Error(
              'Sorry, there are no images matching your search query. Please try again.'
            )
          );
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ isLoading: false }));
    }
  }

  loadMoreHandle = () => {
    this.setState(({ currentPage }) => ({ currentPage: currentPage + 1 }));
  };

  toggleModal = link => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImageURL: link,
    }));
    // return link;
  };

  render() {
    const { images, totalHits, isLoading, showModal, error, largeImageURL } =
      this.state;
    const loadMoreButtonCondition =
      images.length > 0 && totalHits !== images.length;
    const footerMessageCondition =
      images.length > 0 && totalHits === images.length;

    return (
      <>
        <ImageGalleryStyled>
          {error && <h1>{error.message}</h1>}
          {images.length > 0 && (
            <ImageGalleryItem images={images} onClick={this.toggleModal} />
          )}
        </ImageGalleryStyled>
        {isLoading && (
          <ThreeDots
            color="#3f51b5"
            ariaLabel="three-dots-loading"
            wrapperStyle={{ margin: ' 0 auto' }}
          />
        )}

        {loadMoreButtonCondition && (
          <LoadMoreButton loadMoreHandle={this.loadMoreHandle} />
        )}
        {footerMessageCondition && (
          <FooterMessage>
            We're sorry, but you've reached the end of search results.
          </FooterMessage>
        )}
        {showModal && (
          <Modal onClickProp={this.toggleModal}>
            <img src={largeImageURL} alt="big view" />
          </Modal>
        )}
      </>
    );
  }
}
