import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import CharacterCard from '../../CharacterCard/CharacterCard';

class HouseItemPage extends PureComponent {  

  constructor(props, context) {
    super(props);

    this.state = {
      house: null,
      error: null
    }
  }

  componentDidMount() {
    // render the house object passed from the link
    const { state } = this.props.location;
    if(state) {
      this.setState({house: state.house});
    // otherwise direct link, so request the house from the api
    } else {
      const houseId = this.props.match.params.houseId;

      axios.get(`https://www.anapioficeandfire.com/api/houses/${houseId}`)
      .then(res => {
        const house = res.data;
        this.setState({ house });
      }).catch((err) => {
        this.setState({ error: `Error fetching house ${houseId}`});
      });
    }
  }

  /* The api returns an array of length 1 with a null element if no results are found
   * Checks for this
   * @ {return} - boolean if the response is actually empty
   */
  _checkArrayEmpty(array) {
    if(array.length > 1) {
      return false;
    } else if(array[0] === "") {
      return true;
    }
  }

  render() {
    const { house, error } = this.state;

    return (
      <div className="houses__page">
        {/* Keeps same page in previous pagination*/}
        <Link to={{
          pathname: '/houses/',
          state: { 
            reset: false
          }
        }}>Go Back</Link>
        {/* Show Error Message*/}
        {error &&
          <div>{ error }</div>
        }
        {/* House Info if loaded*/}
        {house &&
          <div className="houses__page-info">
            <span>{ house.name }</span>
            <span>Region: { house.region }</span>
            <span>Coat of Arms: { house.coatOfArms }</span>
            <span>{ house.words }</span>
            <CharacterCard url={house.founder} charType="Founder" />
            <span>Founded in { house.founded ? house.founded : 'N/A' }</span>
            <span>Died out: { house.diedOut ? house.diedOut : 'N/A' }</span>
            <CharacterCard url={house.currentLord} charType="Current Lord" />
            <CharacterCard url={house.heir} charType="Heir" />
            <span>Titles: { !this._checkArrayEmpty(house.titles) 
              ? house.titles.join(', ') : 'None'}</span>
            <span>Seats: { !this._checkArrayEmpty(house.seats) 
              ? house.seats.join(', ') : 'None' }</span>
            <span>Ancestral Weapons: { !this._checkArrayEmpty(house.ancestralWeapons) 
              ? house.ancestralWeapons.join(', ') : 'None' }</span>
          </div>
        }
        {/* Loading State */}
        {!house && !error &&
          <div>LOADING HOUSE INFO</div>
        }
      </div>
    );
  }
}


export default HouseItemPage;