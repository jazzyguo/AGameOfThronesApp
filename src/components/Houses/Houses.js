import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Navbar from '../Navbar/Navbar';
import HouseItem from './HouseItem';
import Pagination from '../Pagination/Pagination';
import { bindAll } from 'lodash';
import './Houses.css';

class Houses extends PureComponent {  

  constructor(props, context) {

	  super(props);

    bindAll(this, [
      '_goToPage'
    ]);

    this.state = {
      sortedHouses: null
    }
  }

  componentWillMount() {
    const { requestHouses } = this.props;

    requestHouses(1);
  }

  componentWillReceiveProps(nextProps) {
    const { page, houses } = nextProps;
    this.setState({
      sortedHouses: houses,
      page
    });
  }

  _goToPage(page) {
    const { requestHouses } = this.props;

    requestHouses(page);
  }

  _renderHouses() {
    const { sortedHouses } = this.state;

    return sortedHouses.map((house, index) => {
      return <HouseItem key={index} house={house} />
    });
  }

  render() {
    const { page, loading, error } = this.props;
    const { sortedHouses } = this.state;

    return (
      <div className="houses__container">
        <Navbar />
        { loading &&
          'LOADING!!'
        }
        { !loading && !error && sortedHouses &&
          this._renderHouses()
        }
        { error &&
          'ERROR'
        }
        <Pagination currPage={page} 
                    goToPage={this._goToPage} 
                    totalPages={45} />
      </div>
    );
  }
}
/*
 * {loading} - loading state for api request
 * {page} - current page in pagination 
 * {houses} - array of house objects
 * {error} - error message
 */
Houses.propTypes = {
  loading: PropTypes.bool,
  page: PropTypes.number,
  houses: PropTypes.array,
  error: PropTypes.string
};

const mapStateToProps = state => {
  return {
    loading: state.houses.loading,
    page: state.houses.page,
    houses: state.houses.houses,
    error: state.houses.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestHouses: (page) => dispatch({ 
      type: 'GET_HOUSES', 
      page,
      pageSize: 10
    } )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Houses);