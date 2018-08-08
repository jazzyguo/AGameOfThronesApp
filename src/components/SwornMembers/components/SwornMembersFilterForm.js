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
        <option value="1">Book 1</option>
        <option value="2">Book 2</option>
        <option value="3">Book 3</option>
        <option value="4">Book 4</option>
        <option value="5">Book 5</option>
        <option value="6">Book 6</option>
        <option value="7">Book 7</option>
        <option value="8">Book 8</option>
        <option value="9">Book 9</option>
        <option value="10">Book 10</option>
        <option value="11">Book 11</option>
        <option value="12">Book 12</option>
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