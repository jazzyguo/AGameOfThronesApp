import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const HouseItem = (props) => {  

  const { house, house: { name, url} } = props;
  const idRegex = /[0-9]+/;
  const houseId = url.match(idRegex);

  return (
    <div className="houses__item">
      { name }
       <Link className="home__book-link" 
             to={{
                pathname: `/houses/${houseId}`,
                state: { 
                  house
                }
              }}>
            More Info
      </Link>
    </div>
  );
}

/*
 * {openModal} - dispatches open modal
 * {house} - object containing the book data
 */
HouseItem.propTypes = {
  openModal: PropTypes.func,
  house: PropTypes.object
};

export default HouseItem;