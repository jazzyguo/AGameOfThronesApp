import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindAll } from 'lodash';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CharacterCard from '../CharacterCard/CharacterCard';
import SwornMembersSortForm from './components/SwornMembersSortForm';
import './SwornMembers.css';

/* Displays a list of the sworn members
 */
class SwornMembers extends PureComponent {  

  constructor(props, context) {
    super(props);

    bindAll(this, [
      '_renderSwornMembers',
      '_renderError',
      '_renderHouseLink',
      '_handleSort',
      '_fetchSwornMembers'
    ]);

    this.state = {
      swornMembersUrls: null,
      swornMembers: null,
      houseName: null,
      error: null
    }
  }

  componentWillMount() {
    const { requestHouse, requestMembers, location, 
      members, selectedHouse, membersHouseId } = this.props;
    const houseId = this.props.match.params.houseId;
    // if this is a new house, then fetch all the needed data
    if(location.state && (houseId !== membersHouseId)) {
      this.setState({
        houseName: location.state.houseName,
        swornMembersUrls: location.state.swornMembers
      }, () => { requestMembers(this.state.swornMembersUrls, houseId) });
    // use the data if its already stored
    } else if(location.state && members && selectedHouse){
      this.setState({
        swornMembers: members, 
        houseName: selectedHouse.name
      })
      // else direct link, so just fetch all the needed data
    } else if(!location.state && !members && !selectedHouse){
      requestHouse(houseId);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { selectedHouse, selectedHouseError, members } = nextProps; 
    const { requestMembers, membersHouseId } = this.props;
    const houseId = this.props.match.params.houseId;
    // get new members on new house
    if(selectedHouse && (membersHouseId !== houseId)) {
      this.setState({
        houseName: selectedHouse.name,
        swornMembersUrls: selectedHouse.swornMembers
      }, () => { requestMembers(this.state.swornMembersUrls, houseId) });
    } else if(selectedHouseError) {
        this.setState({error: selectedHouseError});
    }
    // store fetched members in state
    if(members) {
      this.setState({swornMembers: members});
    }
  }

  /* the sworn members array from the api is a list of urls
   * this function will dispatch an action to fetch all those urls
   */
  _fetchSwornMembers() {

  }

  _handleSort(value) {
    console.log(value);

    // sort the current state of sworn members, which should be objects 

  }

  _renderSwornMembers() {
    const { swornMembers } = this.state;

    return (
      <div>
        {swornMembers.length > 1 &&
          <SwornMembersSortForm onChange={this._handleSort}/>
        }
        {swornMembers.map((member, index) => {
          return <CharacterCard key={index} character={member} 
                                charType="Sworn Member" />
        })}
      </div>
    );
  }

  _renderError() {
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
      <Link to={`/houses/${houseId}`}>Back to { houseName }</Link>
    );
  }

  render() {
    const { swornMembers, error } = this.state;
    const { loading } = this.props;

    return (
      <div className="sworn-members">
        {error &&
          this._renderError()
        }
        {!error &&
          this._renderHouseLink()
        }
        {loading &&
          <div>LOADING!</div>
        }
        {!loading && swornMembers && swornMembers.length !== 0 &&
          this._renderSwornMembers()
        }
        {!loading && swornMembers && swornMembers.length === 0 && 
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
 * {members} - array of character objects
 * {loading} - members loading flag
 * {error} - members error object
 * {houseId} - houseId associated with sworn members
 */
SwornMembers.propTypes = {
  location: PropTypes.object,
  selectedHouse: PropTypes.object,
  members: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.object,
  houseId: PropTypes.number
}

const mapStateToProps = state => {
  return {
    selectedHouse: state.houses.selectedHouse,
    selectedHouseLoading: state.houses.selectedHouseLoading,
    selectedHouseError: state.houses.selectedHouseError,
    members: state.members.members,
    loading: state.members.loading,
    error: state.members.error,
    membersHouseId: state.members.houseId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestHouse: (houseId) => dispatch({ 
      type: 'GET_HOUSE', 
      houseId
    }),
    requestMembers: (members, houseId) => dispatch({
      type: 'GET_MEMBERS',
      members,
      houseId
    })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SwornMembers);