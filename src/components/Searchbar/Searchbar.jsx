import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { AiOutlineCheck } from 'react-icons/ai';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    name: '',
  };

  hendleSubmit = e => {
    e.preventDefault();

    if (this.state.name.trim() === '') {
      toast.error('Ви нічого не написали!');
      return;
    }

    this.props.onSubmit(this.state.name);
    this.setState({
      name: '',
    });
  };

  handleChange = e => {
    const value = e.target.value;
    this.setState({
      name: value,
    });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.hendleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <AiOutlineCheck className={css.SearchFormButtonLabel} />
          </button>
          <input
            value={this.state.name}
            type="text"
            autoComplete="off"
            onChange={this.handleChange}
            className={css.SearchFormInput}
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
