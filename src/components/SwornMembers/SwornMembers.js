import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindAll } from 'lodash';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CharacterCard from '../CharacterCard/CharacterCard';
import './SwornMembers.css';

/* Displays a list of the sworn members
 */
class SwornMembers extends PureComponent {  

  constructor(props, context) {
    super(props);

    bindAll(this, [
    ]);
  }

  _renderSwornMembers() {
    const { members } = this.props;

    
  }

  render() {
   
    return (
      <div className="sworn-members">
      
      </div>
    );
  }
}

/*
 * {members} - array of urls fetched from the api
 */
SwornMembers.propTypes = {
  members: PropTypes.array
};

export default SwornMembers;