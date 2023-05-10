import { Component } from 'react';

export class Searchbar extends Component {
  state = {
    input: '',
  };

  handleChange = e => {
    this.setState({ [e.currentTarget.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.input.trim() === '') {
      alert('Enter a request');
      return;
    }

    this.props.onSubmitProp(this.state.input);
    this.setState({ input: '' });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search_</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            name="input"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={this.state.input}
          />
        </form>
      </header>
    );
  }
}
