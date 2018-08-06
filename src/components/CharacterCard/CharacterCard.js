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
      character: props.character,
      loading: true
    }
  }

  componentWillMount() {
    // render the character object passed from the link
    const { url, character } = this.props;
    if(url && url !== "" && !character){
      axios.get(url)
      .then((res) => {
        const character = res.data;
        this.setState({character, loading: false});
      }).catch((e) => {
        this.setState({error: true, loading: false})
      })
    }
    if(url === "" || character) {
      this.setState({loading: false});
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
    const { character, loading } = this.state;
    const { charType } = this.props;

    return (
      <div className="character">
        {loading && 
          <span>{ charType }: Loading</span>
        }
        {!character && !loading &&
          <div>{ charType }: None</div>
        }
        {character && !loading &&
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
 * {character} - object containing the character data - present if no url prop is supplied
 * {url} - api url to get char data - present if no character prop is supplied
 * {charType} - character type
 */
CharacterCard.propTypes = {
  character: PropTypes.object,
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