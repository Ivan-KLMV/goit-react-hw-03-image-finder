import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';

export class App extends Component {
  state = { searchValue: '', images: [] };

  componentDidUpdate(_, nextState) {
    console.log('this.state.searchValue', this.state.searchValue);
    console.log('nextState', nextState.searchValue);
    if (this.state.searchValue !== nextState.searchValue) {
      fetch(
        `https://pixabay.com/api/?q=${this.state.searchValue}&page=1&key=34585976-51a68d3a5f9444fd8119e93c8&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => res.json())
        .then(data => {
          // console.log(data.hits);
          return this.setState({ images: data.hits });
        });
    }
  }

  seachQery = qery => {
    this.setState({ searchValue: qery });
  };

  render() {
    return (
      <>
        <Searchbar onSubmitProp={this.seachQery} />
        <ImageGallery>
          <ImageGalleryItem images={this.state.images} />
        </ImageGallery>
      </>
    );
  }
}
