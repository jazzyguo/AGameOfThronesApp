import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindAll } from 'lodash';
import PropTypes from 'prop-types';
import axios from 'axios';
import InfoIcon from '../Icon/InfoIcon';
import './CharacterCard.css';

/* Displays the char type and the char name
 * with a link to a modal display that contains further information
 */
class CharacterCard extends PureComponent {  

  constructor(props, context) {
    super(props);

    bindAll(this, [
      '_showCharacterInfo'
    ]);

    this.state = {
      character: null
    }
  }

  componentWillMount() {
    // render the character object passed from the link
    const { url } = this.props;
    if(url){
      axios.get(url)
      .then((res) => {
        const character = res.data;
        this.setState({character});
      })
    }
  }

  /* Shows more info of the character by calling the modal
   */
  _showCharacterInfo() {
    const { openModal } = this.props;

    openModal(this._renderModal());
  }


  /* Renders modal content
   */
  _renderModal() {
    const { character } = this.state;

    return (
      <div className="character__modal">
        { character.name }
      </div>
    );
  }


  render() {
    const { character } = this.state;
    const { charType } = this.props;

    return (
      <div className="character">
        {!character &&
          <div>{ charType }: None</div>
        }
        {character &&
          <div>
            <span>{ charType }: { character.name }</span>
            <InfoIcon onClick={this._showCharacterInfo} />
          </div>
        }
      </div>
    );
  }
}

/*
 * {url} - api url to get char data
 * {charType} - character type
 */
CharacterCard.propTypes = {
  url: PropTypes.string,
  charType: PropTypes.string
};

const mapDispatchToProps = dispatch => {
  return {
    openModal: (modalContent) => dispatch({ 
      type: 'OPEN_MODAL', 
      modalContent
    })
  };
};

export default connect(null, mapDispatchToProps)(CharacterCard);