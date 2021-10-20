import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../src/app.module.css';
import * as dataApi from './api';
import Modal from './components/Modal/Modal';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import Loader from './components/Loader/Loader';

export default function App() {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [largeImage, setLargeImage] = useState('');
  const [error, setError] = useState(null);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (!query) {
      return;
    }
    fetchData();
    
  },[query])

  const handleFormSubmit = query => {
    setQuery(query);
    setPage(1);
    setData([]);
  }

  const fetchData = () => {
    setIsLoading(true);
    setShowMessage(false);
    
    dataApi
      .fetchData(query, page)
      .then((data) => {
        setData(prevState => [...prevState, ...data]);
        setPage(prevState => prevState + 1);
        
        if (query !== '' && data.length === 0) {
          setShowMessage(true);
        }
        if (page !== 1) {
          scrollOnLoadButton();
        }
      })
      .catch(error => setError( error ))
      .finally(() => {
        setIsLoading(false);
    }
      )
  }

    const scrollOnLoadButton = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
    };
  
  const handleGalleryItem = fullImageUrl => {
    setLargeImage(fullImageUrl);
    setShowModal(true);
  };

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
    setLargeImage('');
    
  };
  
  const showLoadMore = data.length > 0 && data.length >= 12;
  //const message = data.length === 0 && query !== '';
    
    return (
      <div className={styles.app}>
        <Searchbar onSubmit={handleFormSubmit} />
        <ImageGallery onImageClick={handleGalleryItem} data={data} />
        {isLoading && <Loader />}
        {showMessage && <h2 className={styles.emptyGallery}>The gallery is empty! Try another query!</h2>}
        {showLoadMore && <Button onClick={fetchData} />}
        {showModal && <Modal onClose={toggleModal} largeImage={largeImage} />}
        {error && <h2>{error.message}</h2>}
        <ToastContainer autoClose={2000}/>
    </div>  
    )
}

