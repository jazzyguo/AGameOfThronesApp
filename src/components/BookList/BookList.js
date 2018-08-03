import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Navbar from '../Navbar/Navbar';
import BookListItem from './BookListItem';
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

    return books.map((book, index) => {
      return <BookListItem key={index} book={book} />
    })
  }

  render() {
    const { loading, error, books } = this.props;

    return (
      <Fragment>
        <Navbar />
        <div className="book-list__container">
          { loading &&
            'LOADING!!'
          }
          { !loading && !error && books &&
            this.renderBookList()
          }
          { error &&
            'ERROR'
          }
        </div>
      </Fragment>
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