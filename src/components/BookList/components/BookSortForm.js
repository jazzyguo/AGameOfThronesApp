import React from 'react';
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';

let BookSortForm = (props) => {

  return <form className="book-list__sort">
      <label className="label">Sort Books By</label>
      <Field className="input" name="booksort" component="select">
        <option value="released:asc">Oldest</option>
        <option value="released:desc">Newest</option>
        <option value="numberOfPages:desc">Highest # Pages</option>
        <option value="numberOfPages:asc">Lowest # Pages</option>
      </Field>
  </form>;
};

/*
 * {onChange} - On change handler for the select field
 */
BookSortForm.propTypes = {
  onChange: PropTypes.func
};

export default BookSortForm = reduxForm({
  form: 'bookSort',
})(BookSortForm);