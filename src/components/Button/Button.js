import PropTypes from 'prop-types';
import styles from '../Button/button.module.css';

const Button = ({ onClick }) => (
  <div>
    <button type="button" className={styles.button} onClick={onClick}>
      Load more
    </button>
  </div>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;