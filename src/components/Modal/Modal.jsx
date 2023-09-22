import { Component } from 'react';
import css from './Modal.module.css';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };
  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.closeModal();
    }
  };
  render() {
    return (
      <div className={css.Modal_backdrop} onClick={this.handleBackdropClick}>
        <div className={css.Modal_content}>{this.props.children}</div>
      </div>
    );
  }
}
export default Modal;
