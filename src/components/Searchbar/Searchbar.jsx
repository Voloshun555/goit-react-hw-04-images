import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { AiOutlineCheck } from 'react-icons/ai';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Searchbar({ onSubmit }) {
  const [name, setName] = useState('');

  const hendleSubmit = e => {
    e.preventDefault();

    if (name.trim() === '') {
      toast.error('Ви нічого не написали!');
      return;
    }

    onSubmit(name);
    setName('');
  };

  const handleChange = e => {
    const value = e.target.value;
    setName(value);
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={hendleSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <AiOutlineCheck className={css.SearchFormButtonLabel} />
        </button>
        <input
          value={name}
          type="text"
          autoComplete="off"
          onChange={handleChange}
          className={css.SearchFormInput}
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
