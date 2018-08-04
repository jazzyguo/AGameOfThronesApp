import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindAll } from 'lodash';
import PropTypes from 'prop-types';
import axios from 'axios';

class HouseItemPage extends PureComponent {  

  constructor(props, context) {
    super(props);

    bindAll(this, [
    ]);

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

  /* Shows more info of book by calling the modal
   */
  _showOverlordInfo() {
    const { openModal } = this.props;

    openModal(this._renderModal());
  }


  /* Renders modal content
   */
  _renderModal() {

  }

  render() {
    const { house, error } = this.state;

    return (
      <div className="houses__page">
        {/* Show Error Message*/}
        {error &&
          <div>{ error }</div>
        }
        {/* House Info if loaded*/}
        {house &&
          <div>
            { house.name }
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

/*
 * {openModal} - dispatches open modal
 */
HouseItemPage.propTypes = {
  openModal: PropTypes.func
};

const mapDispatchToProps = dispatch => {
  return {
    openModal: (modalContent) => dispatch({ 
      type: 'OPEN_MODAL', 
      modalContent
    })
  };
};

export default connect(null, mapDispatchToProps)(HouseItemPage);