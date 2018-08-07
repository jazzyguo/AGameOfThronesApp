import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindAll } from 'lodash';
import PropTypes from 'prop-types';
import { checkArrayEmpty } from '../../../util/helpers';
import CharacterCard from '../../CharacterCard/CharacterCard';

class HouseItemPage extends PureComponent {  

  constructor(props, context) {
    super(props);

    bindAll(this, [
      '_renderHouseInfo'
    ]);
  }

  componentWillMount() {
    // render the house object passed from the link
    const { requestHouse, house } = this.props;
    const houseId = this.props.match.params.houseId;
    if(!house) {
      requestHouse(houseId);
    } else {
      const idRegex = /[0-9]+/;
      const urlHouseId = house.url.match(idRegex)[0];
      // no reason to request from the api if we already have the same house in store
      if(houseId !== urlHouseId) {
        requestHouse(houseId);
      }
    }
  }

  _renderHouseInfo(house) {

  }

  render() {
    const { house, loading, error } = this.props;
    const { houseId } = this.props.match.params;

    return (
      <div className="houses__page">
        {/* Keeps same page in previous pagination*/}
        <Link to={{
          pathname: '/houses/',
          state: { 
            reset: false
          }
        }}>Back to Houses</Link>
        {/* Show Error Message*/}
        {error &&
          <div>Error fetching house { houseId }</div>
        }
        {/* House Info if loaded*/}
        {house && !loading &&
          <div className="houses__page-info">
            <span>{ house.name }</span>
            <span>Region: { house.region }  </span>
            <span>Coat of Arms: { house.coatOfArms }</span>
            <span>{ house.words }</span>
            <CharacterCard url={house.founder} charType="Founder" />
            <span>Founded in { house.founded ? house.founded : 'N/A' }</span>
            <span>Died out: { house.diedOut ? house.diedOut : 'N/A' }</span>
            <CharacterCard url={house.currentLord} charType="Current Lord" />
            <CharacterCard url={house.heir} charType="Heir" />
            <span>Titles: { !checkArrayEmpty(house.titles) 
              ? house.titles.join(', ') : 'None'}</span>
            <span>Seats: { !checkArrayEmpty(house.seats) 
              ? house.seats.join(', ') : 'None' }</span>
            <span>Ancestral Weapons: { !checkArrayEmpty(house.ancestralWeapons) 
              ? house.ancestralWeapons.join(', ') : 'None' }</span>
            <Link to={{
              pathname: `/houses/${houseId}/sworn-members`,
              state: { 
                swornMembers: house.swornMembers,
                houseName: house.name,
                houseId
              }
            }}>Sworn Members</Link>
          </div>
        }
        {/* Loading State */}
        {loading &&
          <div>LOADING HOUSE INFO</div>
        }
      </div>
    );
  }
}

/*
 * {selectedHouse} - the current house information
 * {selectedHouseLoading} - loading state of the api request for the house 
 * {selectedHouseError} - api error
 */
HouseItemPage.propTypes = {
  selectedHouse: PropTypes.object,
  selectedHouseLoading: PropTypes.bool,
  selectedHouseError: PropTypes.object
};

const mapStateToProps = state => {
  return {
    house: state.houses.selectedHouse,
    loading: state.houses.selectedHouseLoading,
    error: state.houses.selectedHouseError,
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

export default connect(mapStateToProps, mapDispatchToProps)(HouseItemPage);