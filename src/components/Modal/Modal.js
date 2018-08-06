import  React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindAll } from 'lodash';
import CloseIcon from '../Icon/CloseIcon';
import './Modal.css';
 
class Modal extends PureComponent {
	constructor(props) {
		super(props);

		bindAll(this, [
		  '_handleClick',
      '_escape'
		]);
	}	

	componentDidMount() {
    document.addEventListener('mousedown', this._handleClick);
    document.addEventListener("keydown", this._escape, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this._handleClick);
    document.removeEventListener("keydown", this._escape, false);
  }

  _escape(e) {
    const { closeModal } = this.props;

    if(e.keyCode === 27) {
      closeModal();
    }
  }

  _handleClick(event) {
    const { closeModal } = this.props;

    if(!this.modal.contains(event.target) 
        || event.target.classList.contains('close-icon')) {
      closeModal();
    	}
  	}

	render() {
		const { modalContent } = this.props;
		return(
			<div className="modal__container">
				<div className="modal"
					 ref={(modal) => {this.modal = modal}}>
					 <CloseIcon onClick={ this._handleClick }/>
					 	{ modalContent }
				</div>
			</div>
		)
	}
}

/*
 * @ {modalContent} - the content to render within the modal 
 */
Modal.propTypes = {
  modalContent: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    modalContent: state.modal.modalContent
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch({ type: 'CLOSE_MODAL' })
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);