import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindAll } from 'lodash';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CharacterCard from '../CharacterCard/CharacterCard';
import './SwornMembers.css';

/* Displays a list of the sworn members
 */
class SwornMembers extends PureComponent {  

  constructor(props, context) {
    super(props);

    bindAll(this, [
      '_renderSwornMembers',
      '_renderError',
      '_renderHouseLink'
    ]);

    this.state = {
      swornMembers: null,
      houseName: null,
      error: null
    }
  }

  componentDidMount() {
    // render the swornMembers object passed from the link
    const { requestHouse, location: { state }, 
            match: { params: { houseId } } 
          } = this.props;

    if(state) {
      this.setState({
        swornMembers: state.swornMembers, 
        houseName: state.houseName
      });
    // otherwise direct link, so send the request to get the house data
    } else {
      const houseId = houseId;
      requestHouse(houseId);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { selectedHouse, selectedHouseError } = nextProps; 

    if(selectedHouse) {
      this.setState({
        swornMembers: selectedHouse.swornMembers,
        houseName: selectedHouse.name
      });
    } else if(selectedHouseError) {
        this.setState({error: selectedHouseError});
    }
  }

  /* the sworn members array from the api is a list of urls
   * this function will dispatch an action to fetch all those urls
   */
  _fetchSwornMembers() {

  }

  _renderSwornMembers() {
    const { swornMembers } = this.state;

    return (
      <div>
        {swornMembers.map((e) => {
          return <CharacterCard url={e} charType="Sworn Member" />
        })}
      </div>
    );
  }

  _renderError() {
    const { error } = this.state;
    const { houseId } = this.props.match.params;

    return (
      <div>
        <Link to='/houses'>Back to Houses</Link>
        <div>Error fetching Sworn Members from House { houseId }</div>
      </div>
    );
  }

  _renderHouseLink() {
    const { houseName } = this.state;
    const { houseId } = this.props.match.params;

    return (
      <Link to={`/houses/${houseId}`}>
        { houseName }
      </Link>
    );
  }

  render() {
    const { swornMembers, error } = this.state;
   
    return (
      <div className="sworn-members">
        {error &&
          this._renderError()
        }
        {!error &&
          this._renderHouseLink()
        }
        {swornMembers && swornMembers.length !== 0 &&
          this._renderSwornMembers()
        }
        {swornMembers && swornMembers.length === 0 && 
          <div>This House has no Sworn Members</div>
        }
      </div>
    );
  }
}

/* {location} - object containing the passed in swornMembers object
                which contains the array of character urls from the api
 * {selectedHouse} - the current house for which these swornMembers are from
 * {selectedHouseLoading} - loading state of the api request for the house 
 * {selectedHouseError} - api error
 */
SwornMembers.propTypes = {
  location: PropTypes.object,
  selectedHouse: PropTypes.object
}

const mapStateToProps = state => {
  return {
    selectedHouse: state.houses.selectedHouse,
    selectedHouseLoading: state.houses.selectedHouseLoading,
    selectedHouseError: state.houses.selectedHouseError,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestHouse: (houseId) => dispatch({ 
      type: 'GET_HOUSE', 
      houseId
    })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SwornMembers);