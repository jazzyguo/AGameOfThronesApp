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

  render() {

    return (
      <div className="book-list__container">
        <Navbar />
        BOOKS 
      </div>
    );
  }
}

BookList.propTypes = {
  
};

const mapStateToProps = state => {
  return {
    fetching: state.books.fetching,
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