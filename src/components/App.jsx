import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends Component {
  state = { searchValue: '' };

  seachQeryHandle = qery => {
    this.setState({ searchValue: qery });
  };

  render() {
    return (
      <>
        <Searchbar onSubmitProp={this.seachQeryHandle} />
        <ImageGallery searchValue={this.state.searchValue} />
      </>
    );
  }
}
