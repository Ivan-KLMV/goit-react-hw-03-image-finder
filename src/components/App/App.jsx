import { Component } from 'react';
import { ImageGallery, Searchbar } from '../index';
import { AppStyled } from './App.styled';

export class App extends Component {
  state = { searchValue: '' };

  seachQeryHandle = qery => {
    this.setState({ searchValue: qery });
  };

  render() {
    return (
      <AppStyled>
        <Searchbar onSubmitProp={this.seachQeryHandle} />
        <ImageGallery searchValue={this.state.searchValue} />
      </AppStyled>
    );
  }
}
