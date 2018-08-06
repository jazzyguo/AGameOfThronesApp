import React from 'react';
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';

let SwornMembersSortForm = (props) => {

  return <form className="houses__sort">
      <label className="label">Sort Members By</label>
      <Field className="input" name="housesort" component="select">
        <option value="culture:asc">A-Z (Culture)</option>
        <option value="culture:desc">Z-A (Culture)</option>
        <option value="gender:desc">Male</option>
        <option value="gender:asc">Female</option>
      </Field>
  </form>;
};

/*
 * {onChange} - On change handler for the select field
 */
SwornMembersSortForm.propTypes = {
  onChange: PropTypes.func
};

export default SwornMembersSortForm = reduxForm({
  form: 'swornMembersSort',
})(SwornMembersSortForm);