import React, { PureComponent } from 'react';
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
      '_renderSwornMembers'
    ]);

    this.state = {
      swornMembers: null,
      houseName: null,
      error: null
    }
  }

  componentDidMount() {
    // render the swornMembers object passed from the link
    const { state } = this.props.location;
    if(state) {
      this.setState({
        swornMembers: state.swornMembers, 
        houseName: state.houseName
      });
    // otherwise direct link, so send the request to get the house data
    } else {
      const houseId = this.props.match.params.houseId;

      axios.get(`https://www.anapioficeandfire.com/api/houses/${houseId}`)
      .then((res) => {
        console.log(res);
        const swornMembers = res.data.swornMembers;
        const houseName = res.data.name;
        this.setState({ 
          swornMembers, 
          houseName 
        });
      }).catch((err) => {
        this.setState({ error: `Error fetching sworn members from house ${houseId}`});
      });
    }
  }

  _renderSwornMembers() {
    const { swornMembers } = this.state;
  }

  render() {
    const { swornMembers, error, houseName } = this.state;
   
    return (
      <div className="sworn-members">
        {error &&
          <div>
            <Link to='/houses'>Back to Houses</Link>
            <div>{ error }</div>
          </div>
        }
        {swornMembers &&
          <div>
            <Link to={`/houses/${this.props.match.params.houseId}`}>
            { houseName }</Link>
            <div>we lit</div>
          </div>
        }
      </div>
    );
  }
}

/* {location} - object containing the passed in swornMembers object
                which contains the array of character urls from the api
 */
SwornMembers.propTypes = {
  location: PropTypes.object
}


export default SwornMembers;