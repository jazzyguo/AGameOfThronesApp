import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Navbar from '../Navbar/Navbar';
import './BookList.css';

class BookList extends PureComponent {  

  constructor(props, context) {
	 super(props);
  }

  componentWillMount() {
    const { requestBooks } = this.props;

    requestBooks();
  }

  renderBookList() {
    const { books } = this.props;

    return (
      <div>BOOKS LOL</div>
    )
  }

  render() {
    const { loading, error } = this.props;
    return (
      <div className="book-list__container">
        <Navbar />
        { loading &&
          'LOADING!!'
        }
        { !loading && !error && 
          this.renderBookList()
        }
      </div>
    );
  }
}

/*
 * {requestBooks} - dispatches get_books
 * {loading} - loading status for books
 * {books} - array of book data
 * {error} - error message
 */
BookList.propTypes = {
  requestBooks: PropTypes.func,
  loading: PropTypes.bool,
  books: PropTypes.array,
  error: PropTypes.object 
};

const mapStateToProps = state => {
  return {
    loading: state.books.loading,
    books: state.books.books,
    error: state.books.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestBooks: () => dispatch({ type: 'GET_BOOKS' })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookList);