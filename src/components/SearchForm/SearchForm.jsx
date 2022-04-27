import { useState } from 'react';
import s from './SearchForm.module.css';
import PropTypes from 'prop-types';

const SearchForm = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  // Записывает в состояние class SearchForm текст введенный в инпут
  const handleChange = e => {
    const { value } = e.target;
    setValue(value);
  };

  // Записывает в пропс onSubmit текущее состояние
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(value);
  };

  return (
    <form className={s.searchForm} onSubmit={handleSubmit}>
      <button type="submit" className={s.searchForm__button}>
        <span className={s.ComponentsearchForm__button__labe}>Search</span>
      </button>
      <input
        type="text"
        name="qwery"
        value={value}
        onChange={handleChange}
        placeholder="Search images and photos"
        className={s.searchForm__input}
        autoComplete="off"
        autoFocus
      ></input>
    </form>
  );
};
SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchForm;
