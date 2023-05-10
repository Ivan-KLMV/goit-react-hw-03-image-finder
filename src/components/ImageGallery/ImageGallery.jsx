import { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { LoadMoreButton } from 'components/LoadMoreButton/LoadMoreButton';

export class ImageGallery extends Component {
  state = {
    searchValue: '',
    images: [],
    currentPage: 1,
    isLoading: false,
    totalHits: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchValue !== this.props.searchValue) {
      this.setState({
        searchValue: this.props.searchValue,
        images: [],
        currentPage: 1,
        error: null,
      });
      return;
    }

    if (
      this.state.searchValue !== prevState.searchValue ||
      this.state.currentPage !== prevState.currentPage
    ) {
      this.setState({ isLoading: true });

      fetch(
        `https://pixabay.com/api/?q=${this.state.searchValue}&page=${this.state.currentPage}&key=34585976-51a68d3a5f9444fd8119e93c8&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => {
          return res.json();
        })
        .then(data => {
          // console.log(data);
          if (data.hits.length > 0) {
            this.setState(prevState => ({
              images: [...prevState.images, ...data.hits],
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
    this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
  };

  render() {
    return (
      <>
        <ul className="ImageGallery">
          {this.state.error && <h1>{this.state.error.message}</h1>}
          {<ImageGalleryItem images={this.state.images} />}
          {this.state.isLoading && <div>Loading...</div>}
        </ul>
        {this.state.images.length > 0 &&
          this.state.totalHits !== this.state.images.length && (
            <LoadMoreButton loadMoreHandle={this.loadMoreHandle} />
          )}
        {this.state.images.length > 0 &&
          this.state.totalHits === this.state.images.length && (
            <div>
              "We're sorry, but you've reached the end of search results."
            </div>
          )}
      </>
    );
  }
}
