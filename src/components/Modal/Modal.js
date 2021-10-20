import { Component } from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {

    componentDidMount() {
        // console.log('Modal componentDidMount');
        window.addEventListener('keydown', this.handleKeydown)
    }

    componentWillUnmount() {
        // console.log('Modal componentWillUnmount');
        window.removeEventListener('keydown', this.handleKeydown);
    }

    handleKeydown = e => {
        if (e.code === 'Escape') {
            // console.log('нажали Escape');
            this.props.onClose();
        }
    }
    
    handleOverleyClick = e => {
        // console.log('currentTarget', e.currentTarget);
        // console.log('target', e.target);
        if (e.currentTarget === e.target) {
            this.props.onClose();
        }
    }
      
    render() {
        return createPortal(
            <div className={styles.modal__overley} onClick={this.handleOverleyClick}>
                <div className={styles.modal}>
                    <img src={this.props.largeImage} alt='' /></div>
        
            </div>,
            modalRoot);
    }
}



 