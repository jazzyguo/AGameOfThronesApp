import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindAll, pickBy, values } from 'lodash';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CharacterCard from '../CharacterCard/CharacterCard';
import SwornMembersFilterForm from './components/SwornMembersFilterForm';
import Loader from '../Loader/Loader';
import BackIcon from '../Icon/BackIcon';
import { hasBook } from '../../util/helpers';
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
      '_handleFilter'
    ]);

    this.state = {
      swornMembersUrls: null,
      swornMembers: null,
      filteredMembers: null,
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

  /* Filters sworn members
   */
  _handleFilter(value) {
    const filter = value.sm_filter;
    let { swornMembers } = this.state;
    let filteredMembers = swornMembers;
    // uses lodash pickBy to filter the current object
    // if it is a string
    if(isNaN(filter)){
      switch(filter) {
        case 'male':
        filteredMembers = pickBy(filteredMembers, (char) => {
            return char.gender === 'Male';
          });
          break;
        case 'female':
        filteredMembers = pickBy(filteredMembers, (char) => {
            return char.gender === 'Female';
          });    
          break;
        default:
          this.setState({filteredMembers: null});
          return;
      }
    // else the filter is a book number
    } else {
      filteredMembers = pickBy(filteredMembers, (char) => {
        return hasBook(char.books, filter);
      });
    }
    // converts the filtered object into an array
    const filteredMembersArray = values(filteredMembers);
    this.setState({filteredMembers: filteredMembersArray});
  }

  _renderSwornMembers() {
    const { filteredMembers, swornMembers } = this.state;
    // if there is a filter applied, then render that, else render all
    let toRender = filteredMembers ? filteredMembers : swornMembers;
    return (
      <div className="sworn-members__list">
        {((toRender.length > 1 && !filteredMembers) || filteredMembers) &&
          <SwornMembersFilterForm onChange={this._handleFilter}/>
        }
        {toRender.map((member, index) => {
          return <CharacterCard key={index} character={member} 
                                charType="Sworn Member" />
          })
        }
        {toRender.length === 0 && filteredMembers &&
          <div>No Sworn Members found</div>
        }
      </div>
    );
  }

  _renderError() {
    const { houseId } = this.props.match.params;

    return (
      <div>
        <Link className="back-link" to='/houses'>
          <BackIcon />Back to Houses</Link>
        <div>Error fetching Sworn Members from House { houseId }</div>
      </div>
    );
  }

  _renderHouseLink() {
    const { houseName } = this.state;
    const { houseId } = this.props.match.params;

    return (
      <Link className="back-link"
            to={`/houses/${houseId}`}><BackIcon />
            Back to { houseName }</Link>
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
          <Loader />
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
 * {membersHouseId} - houseId associated with sworn members
 */
SwornMembers.propTypes = {
  location: PropTypes.object,
  selectedHouse: PropTypes.object,
  members: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.object,
  membersHouseId: PropTypes.number
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