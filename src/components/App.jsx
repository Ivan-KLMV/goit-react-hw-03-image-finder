import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { LoadMoreButton } from './LoadMoreButton/LoadMoreButton';

export class App extends Component {
  state = { searchValue: '', images: [], currentPage: 1, isLoading: false };

  componentDidUpdate(_, nextState) {
    if (
      this.state.searchValue !== nextState.searchValue ||
      this.state.currentPage !== nextState.currentPage
    ) {
      this.setState({ isLoading: true });
      fetch(
        `https://pixabay.com/api/?q=${this.state.searchValue}&page=${this.state.currentPage}&key=34585976-51a68d3a5f9444fd8119e93c8&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => res.json())
        .then(data => {
          return this.setState(prevState => ({
            images: [...prevState.images, ...data.hits],
            isLoading: false,
          }));
        });
    }
  }

  seachQeryHandle = qery => {
    this.setState({ searchValue: qery, images: [], currentPage: 1 });
  };

  loadMoreHandle = () => {
    this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
  };

  render() {
    return (
      <>
        <Searchbar onSubmitProp={this.seachQeryHandle} />
        <ImageGallery>
          <ImageGalleryItem images={this.state.images} />
          {this.state.isLoading && <div>Loading...</div>}
        </ImageGallery>
        {this.state.images.length > 0 && (
          <LoadMoreButton loadMoreHandle={this.loadMoreHandle} />
        )}
      </>
    );
  }
}
