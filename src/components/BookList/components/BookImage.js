import React from 'react';
import PropTypes from 'prop-types';

/* Fetches the cover art for each book
 */
const BookImage = (props) => {  

  const _fetchImage = () => {
    const { bookName } = props;
    let imageURL;

    switch(bookName) {
      case 'A Game of Thrones':
        imageURL = 1;
        break;
      case 'A Clash of Kings':
        imageURL = 2;
        break;
      case 'A Storm of Swords':
        imageURL = 3;
        break;
      case 'The Hedge Knight':;
        imageURL = 4;
        break;
      case 'A Feast for Crows':
        imageURL = 5;
        break;
      case 'The Sworn Sword':
        imageURL = 6;
        break;
      case 'The Mystery Knight':
        imageURL = 7;
        break;
      case 'A Dance with Dragons':
        imageURL = 8;
        break;
      case 'The Princess and the Queen':
        imageURL = 9;
        break;
      case 'The Rogue Prince':
        imageURL = 10;
        break;
      case 'The World of Ice and Fire':
        imageURL = 11;
        break;
      case 'A Knight of the Seven Kingdoms':
        imageURL = 12;
        break;
      default:
        imageURL = null;
    }
    
    const { overlay } = props;
    return (
      <div className="book-list__item-img__container">
        <img className="book-list__item-img" 
           src={`/img/books/${imageURL}.png`} alt={ bookName }/>
        { overlay &&
        <div onClick={() => {props.showBookInfo(bookName)}} 
             className="book-list__item-img__overlay"></div>
        }
      </div>
    );
  }

  return ( _fetchImage() );
}

/*
 * {showBookInfo} - calls passed prop function to open the modal
 * {bookName} - name of the book
 * {overlay} - hover overlay for the img container
 */
BookImage.propTypes = {
  showBookInfo: PropTypes.func,
  bookName: PropTypes.string,
  overlay: PropTypes.bool
};

export default BookImage;