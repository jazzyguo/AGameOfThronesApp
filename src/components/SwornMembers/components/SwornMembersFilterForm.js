import React from 'react';
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';

let SwornMembersFilterForm = (props) => {

  return <form className="sworn-members__filter">
      <label className="label">Filter Members By</label>
      <Field className="input" name="sm_filter" component="select">
        <option value="all">All</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </Field>
  </form>;
};

/*
 * {onChange} - On change handler for the select field
 */
SwornMembersFilterForm.propTypes = {
  onChange: PropTypes.func
};

export default SwornMembersFilterForm = reduxForm({
  form: 'swornMembersFilter',
})(SwornMembersFilterForm);