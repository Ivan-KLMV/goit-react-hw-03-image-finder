import { Component } from 'react';
import { createPortal } from 'react-dom';
import { ModalStyled } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    // console.log('componentDidMount');
    window.addEventListener('keydown', this.escCloseHandle);
  }

  componentWillUnmount() {
    // console.log('componentWillUnmount');
    window.removeEventListener('keydown', this.escCloseHandle);
  }

  escCloseHandle = e => {
    if (e.code === 'Escape') {
      //   console.log(e.code);
      this.props.onClickProp();
    }
  };

  backDropClick = e => {
    if (e.target === e.currentTarget) {
      //   console.log(e.target === e.currentTarget);
      this.props.onClickProp();
    }
  };

  render() {
    return createPortal(
      <ModalStyled onClick={this.backDropClick}>
        <div>{this.props.children}</div>
      </ModalStyled>,
      modalRoot
    );
  }
}
