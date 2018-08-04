import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindAll } from 'lodash';
import PropTypes from 'prop-types';

class HouseItem extends PureComponent {  

  constructor(props, context) {
    super(props);

    bindAll(this, [
      '_showHouseInfo'
    ]);
  }

  /* Shows more info of book by calling the modal
   */
  _showHouseInfo() {
    const { openModal } = this.props;

    openModal(this._renderModal());
  }

  /* Renders modal content
   */
  _renderModal() {
  }

  render() {
    const { house } = this.props;

    return (
      <div className="houses__item">
        { house.name }
      </div>
    );
  }
}

/*
 * {openModal} - dispatches open modal
 * {house} - object containing the book data
 */
HouseItem.propTypes = {
  openModal: PropTypes.func,
  house: PropTypes.object
};

const mapDispatchToProps = dispatch => {
  return {
    openModal: (modalContent) => dispatch({ 
      type: 'OPEN_MODAL', 
      modalContent
    })
  };
};

export default connect(null, mapDispatchToProps)(HouseItem);