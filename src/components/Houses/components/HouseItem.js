import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getNumber } from '../../../util/helpers';

const HouseItem = (props) => {  

  const { house, house: { name, url} } = props;
  const houseId = getNumber(url);

  return (
    <div className="houses__item-container">
       <Link className="houses__item-link" 
             to={{
                pathname: `/houses/${houseId}`,
                state: { 
                  house
                }
              }}> 
        <div className="houses__item">{ name }</div>
      </Link>
    </div>
  );
}

/*
 * {openModal} - dispatches open modal
 * {house} - object containing the house data
 */
HouseItem.propTypes = {
  openModal: PropTypes.func,
  house: PropTypes.object
};

export default HouseItem;