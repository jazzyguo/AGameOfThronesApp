import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindAll } from 'lodash';
import PropTypes from 'prop-types';
import axios from 'axios';
import InfoIcon from '../Icon/InfoIcon';
import { checkArrayEmpty, getNumber, bookStrings } from '../../util/helpers';
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

  /* Gets all matching books from the character books field
   */
  _getCharacterBooks(bookArray) {
    if(bookArray.length === 0 || checkArrayEmpty(bookArray)) {
      return (<span>N/A</span>);
    } else return bookArray.map((bookUrl) => {
      const bookNum = getNumber(bookUrl);
      return (
        <span className="booktitle">
          Book {bookNum}: {bookStrings[bookNum]}
        </span>
      );
    })
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
        {/* Name */}
        <span className="name">{ character.name }</span>
        {/* Titles*/}
        <div>
          <span className="bold">Titles: </span> 
          { !checkArrayEmpty(character.titles) 
            ? character.titles.join(', ') : 'N/A'}
        </div>
        {/* Aliases */}
        <div>
          <span className="bold">Aliases: </span> 
          { !checkArrayEmpty(character.aliases) 
            ? character.aliases.join(', ') : 'N/A'}
        </div>
        {/* Born*/}
        <div>
          <span className="bold">Born: </span> 
          { character.born ? character.born : 'N/A'}
        </div>
        {/* Died */}
        <div>
          <span className="bold">Died: </span> 
          { character.died ? character.died : 'N/A'}
        </div>
        {/* Gender */}
        <div>
          <span className="bold">Gender: </span> 
          { character.gender }
        </div>
        {/* Culture */}
        <div>
          <span className="bold">Culture: </span> 
          { character.culture ? character.culture : 'N/A'}
        </div>
        {/* Parents */}
        <CharacterCard url={ character.mother } charType="Mother" modal={false}/>
        <CharacterCard url={ character.father } charType="Father" modal={false}/>
        {/* TV */}
        <div>
          <span className="bold">TV Appearances: </span> 
          { !checkArrayEmpty(character.tvSeries) 
            ? character.tvSeries.join(', ') : 'N/A'}
        </div>
        {/* Played By */}
        <div>
          <span className="bold">Played By: </span> 
          { !checkArrayEmpty(character.playedBy) 
            ? character.playedBy.join(', ') : 'N/A'}
        </div>
        {/* Books */}
        <div className="character__modal-books">
        <span className="bold">Appears In:</span>
          { this._getCharacterBooks(character.books) }
        </div>
      </div>
    );
  }

  render() {
    const { character, loading } = this.state;
    const { charType, modal } = this.props;

    return (
      <div className="character">
        {/* Loading */}
        {loading && 
          <div>
            <span className="bold">{ charType }: </span> 
            Loading
          </div>
        }
        {/* No Result */}
        {!character && !loading &&
          <div>
            <span className="bold">{ charType }: </span> 
            None
          </div>
        }
        {/* Info Loaded */}
        {character && !loading &&
          <div>
              <span className="bold">{ charType }: </span> 
              { character.name }
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