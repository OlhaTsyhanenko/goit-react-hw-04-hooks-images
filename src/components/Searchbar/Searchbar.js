import { Component } from "react";
import { toast } from 'react-toastify';
import styles from '../Searchbar/searchbar.module.css'



class Searchbar extends Component {
    state = {
        query: '',
    }

    handleQueryChange = e => {
        this.setState({ query: e.currentTarget.value.toLowerCase() });
    }
    
    handleSubmit = e => {
        e.preventDefault();

        if (this.state.query.trim() === '') {
            toast("Введите запрос");
            return;
        }

        this.props.onSubmit(this.state.query);
        this.setState({ query: '' });
    }

    render() {
        return (
            <header className={styles.searchbar}>
                <form className={styles.searchForm} onSubmit={this.handleSubmit}>
                    <button type="submit" className={styles.searchForm__button} >
                        <span className={styles.searchForm__button_label}>Search</span>
                    </button>
                    <input
                        className={styles.searchForm__input}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        name="query"
                        value={this.state.query}
                        onChange={this.handleQueryChange}
                    />
                </form>
            </header>
        )
    }
}

export default Searchbar;