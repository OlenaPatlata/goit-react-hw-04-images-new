import React from 'react';
import SearchForm from 'components/SearchForm/SearchForm';
import s from './Searchbar.module.css';
import PropTypes from 'prop-types';

// Для переброса двух пропсов из App в компонент SearchForm
const Searchbar = ({ onSubmit }) => {
  return (
    <header className={s.searchbar}>
      <SearchForm onSubmit={onSubmit} />
    </header>
  );
};
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
