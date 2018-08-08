import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindAll } from 'lodash';
import PropTypes from 'prop-types';
import { checkArrayEmpty, getNumber } from '../../../util/helpers';
import CharacterCard from '../../CharacterCard/CharacterCard';
import Loader from '../../Loader/Loader';
import BackIcon from '../../Icon/BackIcon';

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
      const urlHouseId = getNumber(house.url);
      // no reason to request from the api if we already have the same house in store
      if(houseId !== urlHouseId) {
        requestHouse(houseId);
      }
    }
  }

  _renderHouseInfo(house) {
    const { name, region, coatOfArms, words, founder, 
      founded, diedOut, currentLord,heir, titles, 
      seats, ancestralWeapons, swornMembers
    } = house;
    const { houseId } = this.props.match.params;

    return (
      <div className="houses__page-info">
        {/* Name */}
        <span className="name">{ name }</span>
        {/* Region */}
        <div>
          <span className="bold">Region: </span> 
          { region }  
        </div>
        {/* COA */}
        <div>
          <span className="bold">Coat of Arms: </span>
          { coatOfArms }
        </div>
        {/* words */}
        <div>
          <span className="bold">Words: </span>
          <span className="words">{ words }</span>
        </div>
        {/* Founder */}
        <CharacterCard url={ founder } charType="Founder" />
        {/* Founded */}
        <div>
          <span className="bold">Founded in: </span>
          { founded ? founded : 'N/A' }
        </div>
        {/* Died */}
        <div>
          <span className="bold">Died out: </span>
          { diedOut ? diedOut : 'N/A' }
        </div>
        {/* Characters */}
        <CharacterCard url={ currentLord } charType="Current Lord" />
        <CharacterCard url={ heir } charType="Heir" />
        {/* Titles */}
        <div>
          <span className="bold">Titles: </span>
          { !checkArrayEmpty(titles) 
            ? titles.join(', ') : 'None'}
        </div>
        {/* Seats */}
        <div>
          <span className="bold">Seats: </span>
          { !checkArrayEmpty(seats) 
            ? seats.join(', ') : 'None' }
        </div>
        {/* Ancestral Weapons */}
        <div>
          <span className="bold">Ancestral Weapons: </span>
          { !checkArrayEmpty(ancestralWeapons) 
            ? ancestralWeapons.join(', ') : 'None' }
        </div>
        {/* Sworn Members Link */}
        <Link className="sworn-members__link" 
        to={{
          pathname: `/houses/${houseId}/sworn-members`,
          state: { 
            swornMembers: swornMembers,
            houseName: name,
            houseId
          }
        }}>Sworn Members</Link>
      </div>
    );
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
        }} className="back-link"><BackIcon />Back to Houses</Link>
        {/* Show Error Message*/}
        {error &&
          <div>Error fetching house { houseId }</div>
        }
        {/* House Info if loaded*/}
        {house && !loading &&
          this._renderHouseInfo(house)
        }
        {/* Loading State */}
        {loading &&
          <Loader />
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