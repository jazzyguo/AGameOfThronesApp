import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindAll } from 'lodash';
import PropTypes from 'prop-types';
import axios from 'axios';
import InfoIcon from '../Icon/InfoIcon';
import { checkArrayEmpty } from '../../util/helpers';
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

  componentWillReceiveProps(nextProps) {
    const { character } = nextProps;
    if(this.state.character.url !== character.url) {
      this.setState({character});
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
        <span>Titles: { !checkArrayEmpty(character.titles) 
          ? character.titles.join(', ') : 'N/A'}</span>
        <span>Aliases: { !checkArrayEmpty(character.aliases) 
          ? character.aliases.join(', ') : 'N/A'}</span>
        <span>Born: { character.born ? character.born : 'N/A'}</span>
        <span>Died: { character.died ? character.died : 'N/A'}</span>
        <span>Gender: { character.gender }</span>
        <span>Culture: { character.culture ? character.culture : 'N/A'}</span>
        <CharacterCard url={ character.mother } charType="Mother" modal={false}/>
        <CharacterCard url={ character.father } charType="Father" modal={false}/>
        <span>TV Appearances: { !checkArrayEmpty(character.tvSeries) 
          ? character.tvSeries.join(', ') : 'N/A'}</span>
        <span>Played By: { !checkArrayEmpty(character.playedBy) 
          ? character.playedBy.join(', ') : 'N/A'}</span>
      </div>
    );
  }

  render() {
    const { character, loading } = this.state;
    const { charType, modal } = this.props;

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
            {modal &&
              <InfoIcon onClick={this._showCharacterInfo} />
            }
          </div>
        }
      </div>
    );
  }
}

CharacterCard.defaultProps = {
  modal: true
};

/*
 * {character} - object containing the character data - present if no url prop is supplied
 * {url} - api url to get char data - present if no character prop is supplied
 * {charType} - character type
 * {modal} - flag to render info modal
 */
CharacterCard.propTypes = {
  character: PropTypes.object,
  url: PropTypes.string,
  charType: PropTypes.string,
  modal: PropTypes.bool
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