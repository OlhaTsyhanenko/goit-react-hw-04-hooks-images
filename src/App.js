import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../src/app.module.css';
import * as dataApi from './api';
import Modal from './components/Modal/Modal';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import Loader from './components/Loader/Loader';


class App extends Component {
  state = {
    data: [],
    showModal: false,
    isLoading: false,
    query: '',
    page: 1,
    largeImage: '',
    error: null,
    showMessage: false
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.fetchData();
    }
  }

  handleFormSubmit = query => {
    this.setState({
      query,
      page: 1,
      data: []
    });
  }

  fetchData = () => {
    this.setState({ isLoading: true, showMessage: false })
    const { query, page } = this.state;
    dataApi
      .fetchData(query, page)
      .then(data => {
        this.setState(state => ({
          data: [...state.data, ...data],
          page: state.page + 1,
        }));
        if (page !== 1) {
          this.scrollOnLoadButton();
        }
        
      })
      .catch(error => this.setState({ error }))
      .finally(() => {
        const { data, query } = this.state;
        this.setState({ isLoading: false })
        if (data.length === 0 && query !== '') {
         this.setState({showMessage: true})
        }
      })
  }

  handleGalleryItem = fullImageUrl => {
    this.setState({
      largeImage: fullImageUrl,
      showModal: true,
    });
  };

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      largeImage: '',
    }));
  };

  scrollOnLoadButton = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };


  render() {
    console.log(this.state.data);
    const { showModal, data, largeImage, showMessage, isLoading } = this.state;
    const {handleFormSubmit, handleGalleryItem, fetchData, toggleModal} = this;
    const showLoadMore = data.length > 0 && data.length >= 12;
    
    return (
      <div className={styles.app}>
        <Searchbar onSubmit={handleFormSubmit} />
        <ImageGallery onImageClick={handleGalleryItem} data={data} />
        {isLoading && <Loader />}
        {showMessage && <h2 className={styles.emptyGallery}>The gallery is empty! Try another query!</h2>}
        {showLoadMore && <Button onClick={fetchData} />}
        {showModal && <Modal onClose={toggleModal} largeImage={largeImage} />}
        {this.error && <h2>{this.error.message}</h2>}
        <ToastContainer autoClose={2000}/>
    </div>  
    )
  }
}

export default App;
