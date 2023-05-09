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
    this.props.onSubmitProp(this.state.input);
    console.log(this.state.input);
    this.setState({ input: '' });
  };

  render() {
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.handleSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search_</span>
          </button>

          <input
            className="input"
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
