import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import BookImage from './BookImage';
import { bindAll, debounce } from 'lodash';
import PropTypes from 'prop-types';
import { dateToString } from '../../../util/helpers';

class BookListItem extends PureComponent {  

  constructor(props, context) {
    super(props);

    bindAll(this, [
      '_checkVisible',
      '_showBookInfo'
    ]);

    this.state = {
      visible: true
    }

    this._checkVisible = debounce(this._checkVisible, 150);
  }

  componentDidMount(){
    window.addEventListener('scroll', this._checkVisible);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this._checkVisible);
  }

  /* checks if this element is outside the viewport
   * sets a null img if it is
   */
  _checkVisible() {
    const viewHeight = Math.max(document.documentElement.clientHeight, 
                                window.innerHeight);
    const rect = this.container.getBoundingClientRect();
    const visible = !(rect.bottom < 0 || rect.top - viewHeight >= 0);

    if(this.state.visible !== visible) {
      this.setState({visible});
    } 
  }

  /* Shows more info of book by calling the modal
   */
  _showBookInfo() {
    const { openModal } = this.props;

    openModal(this._renderModal());
  }

  /* Renders modal content
   */
  _renderModal() {
    const { book: { 
      name, isbn, authors, numberOfPages, publisher, country, mediaType, released 
    } }= this.props;
    
    return (
      <div className="book-list__modal">
        <BookImage bookName={name} overlay={false}/>
        <div className="book-list__modal-info">
          <span className="title">{name}</span>
          <span className="isn">ISBN: {isbn}</span>
          <span className="authors">By {authors.join(', ')}</span>
          <span className="released">Released {dateToString(released.split('T')[0])}</span>
          <span className="publisher">Published by {publisher} in {country}</span>
          <span className="notes">{mediaType}, {numberOfPages} Total Pages</span>
        </div>
      </div>
    );
  }

  render() {
    const { book: { name } } = this.props;
    const { visible } = this.state;
    return (
      <div className="book-list__item"
           ref={(container) => {this.container = container} }>
        {visible &&   
          <BookImage showBookInfo={this._showBookInfo} bookName={name} overlay={true}/>
        }
        {!visible &&
          <img className="book-list__item-img" src={null} alt="" /> 
        }
        <div className="book-list__item-info">
          { name }
        </div>
      </div>
    );
  }
}

/*
 * {openModal} - dispatches open modal
 * {book} - object containing the book data
 */
BookListItem.propTypes = {
  openModal: PropTypes.func,
  book: PropTypes.object
};

const mapDispatchToProps = dispatch => {
  return {
    openModal: (modalContent) => dispatch({ 
      type: 'OPEN_MODAL', 
      modalContent
    })
  };
};

export default connect(null, mapDispatchToProps)(BookListItem);