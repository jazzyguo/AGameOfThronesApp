import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindAll } from 'lodash';
import Navbar from '../Navbar/Navbar';
import BookListItem from './components/BookListItem';
import BookSortForm from './components/BookSortForm';
import './BookList.css';

class BookList extends PureComponent {  

  constructor(props) {
    super(props);
    
    bindAll(this, [
      '_handleSort'
    ]);

    this.state = {
      sortedBooks: null
    }
  }

  componentWillMount() {
    const { requestBooks, books } = this.props;
    if(!books) {
      requestBooks();
    } else {
      // default sort is by oldest
      this.setState({
        sortedBooks: books  
      }, () => {this._handleSort()});
    }
  }

  componentWillReceiveProps(nextProps) {
    const { books } = nextProps; 
    this.setState({
      sortedBooks: books  
    });
  }

  _renderBookList() {
    const { sortedBooks } = this.state;

    return sortedBooks.map((book, index) => {
      return <BookListItem key={index} book={book} />
    });
  }

  /* Values received from select are in the format:
        released || numberOfPages : asc||desc
   * Able to sort by date released, and the number of pages
   */
  _handleSort(value = 'oldest') {
    let { sortedBooks } = this.state;
    let sortBy;
    let order;
    if(value === 'oldest') {
      sortBy = 'released';
      order = 'asc';
    } else {
      const values = value.booksort.split(':');
      sortBy = values[0];
      order = values[1];
    }
    if(sortBy === 'numberOfPages') {
      // eslint-disable-next-line
      switch(order) {
        case 'asc':
          sortedBooks.sort((a, b) => { return a.numberOfPages - b.numberOfPages})
          break;
        case 'desc':
          sortedBooks.sort((a, b) => { return b.numberOfPages - a.numberOfPages})
          break;
      }
    }
    if(sortBy === 'released') {
      // eslint-disable-next-line
      switch(order) {
        case 'asc':
          sortedBooks.sort((a, b) => { return new Date(a.released) - new Date(b.released)})
          break;
        case 'desc':
          sortedBooks.sort((a, b) => { return new Date(b.released) - new Date(a.released)})
          break;
      }
    }
    this.setState({ ...sortedBooks });
  }

  render() {
    const { loading, error } = this.props;
    const { sortedBooks } = this.state;

    return (
      <Fragment>
        <Navbar />
        <div className="book-list__container">
          <BookSortForm onChange={ this._handleSort }/>
          { loading &&
            'LOADING!!'
          }
          { !loading && !error && sortedBooks &&
            this._renderBookList()
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