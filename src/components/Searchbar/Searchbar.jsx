import { Component } from 'react';
import { SearchbarStyled } from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    input: '',
  };

  handleChange = e => {
    this.setState({ [e.currentTarget.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { input } = this.state;

    if (input.trim() === '') {
      alert('Enter a request');
      return;
    }

    this.props.onSubmitProp(input);
    this.setState({ input: '' });
  };

  render() {
    return (
      <SearchbarStyled>
        <form onSubmit={this.handleSubmit}>
          <button type="submit">
            <span>Search_</span>
          </button>

          <input
            type="text"
            name="input"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={this.state.input}
          />
        </form>
      </SearchbarStyled>
    );
  }
}
