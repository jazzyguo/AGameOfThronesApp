import React from 'react';
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';

let HouseSortForm = (props) => {

  return <form className="houses__sort">
      <label className="label">Sort Houses By</label>
      <Field className="input" name="housesort" component="select">
        <option value="name:asc">A-Z (Name)</option>
        <option value="name:desc">Z-A (Name)</option>
        <option value="region:desc">A-Z (Region)</option>
        <option value="region:asc">Z-A (Region)</option>
      </Field>
  </form>;
};

/*
 * {onChange} - On change handler for the select field
 */
HouseSortForm.propTypes = {
  onChange: PropTypes.func
};

export default HouseSortForm = reduxForm({
  form: 'houseSort',
})(HouseSortForm);