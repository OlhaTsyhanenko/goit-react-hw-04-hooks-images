import { useState } from "react";
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import styles from '../Searchbar/searchbar.module.css'


export default function Searchbar({onSubmit}) {
    const [query, setQuery] = useState('');

    const handleQueryChange = e => {
        setQuery( e.currentTarget.value.toLowerCase());
    }
    
    const handleSubmit = e => {
        e.preventDefault();

        if (query.trim() === '') {
            toast("Введите запрос");
            return;
        }

        onSubmit(query);
        setQuery('');
    }
    return (
        <header className={styles.searchbar}>
            <form className={styles.searchForm} onSubmit={handleSubmit}>
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
                    value={query}
                    onChange={handleQueryChange}
                />
            </form>
        </header>
    )
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func,
}