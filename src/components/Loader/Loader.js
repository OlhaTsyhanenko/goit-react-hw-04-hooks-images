import Spinner from "react-loader-spinner";
import styles from '../Loader/loader.module.css';

const Loader = () => (
  <div className={styles.loader}>
    <Spinner type="ThreeDots"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} />
  </div>
);
export default Loader;