import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Navbar from '../Navbar/Navbar';
import './Houses.css';

class Houses extends PureComponent {  

  constructor(props, context) {
	 super(props);
  }

  componentWillMount() {

  }

  render() {

    return (
      <div className="houses__container">
        <Navbar />
        HOUSES
      </div>
    );
  }
}

Houses.propTypes = {
  
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

export default connect(mapStateToProps, mapDispatchToProps)(Houses);