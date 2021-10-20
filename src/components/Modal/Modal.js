import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import styles from './modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, largeImage }) {
    
    useEffect(() => {
        window.addEventListener('keydown', handleKeydown)
        return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
    },[])

    const handleKeydown = e => {
        if (e.code === 'Escape') {
            // console.log('нажали Escape');
            onClose();
        }
    }
    
    const handleOverleyClick = e => {
        // console.log('currentTarget', e.currentTarget);
        // console.log('target', e.target);
        if (e.currentTarget === e.target) {
            onClose();
        }
    }

    return createPortal(
            <div className={styles.modal__overley} onClick={handleOverleyClick}>
                <div className={styles.modal}>
                    <img src={largeImage} alt='' /></div>
        
            </div>,
            modalRoot);
    
}

Modal.propTypes = {
    onClose: PropTypes.func,
    largeImage: PropTypes.string,
}



 