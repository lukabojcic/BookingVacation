import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addVacation } from '../../actions/vacation';

const VacationForm = ({ addVacation }) => {
  const [text, setText] = useState('');

  return (
    <div className='vacation-form'>
      <div className='bg-primary p'>
        <h3>Make a request</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={e => {
          e.preventDefault();
          addVacation({ text });
          setText('');
        }}
      >
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Create a vacation'
          value={text}
          onChange={e => setText(e.target.value)}
          required
        />
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

VacationForm.propTypes = {
  addVacation: PropTypes.func.isRequired
};

export default connect(
  null,
  { addVacation }
)(VacationForm);
