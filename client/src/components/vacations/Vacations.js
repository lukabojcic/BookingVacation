import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import VacationItem from './VacationItem';
import VacationForm from './VacationForm';
import { getVacations } from '../../actions/vacation';

const Vacations = ({ getVacations, vacation: { vacations } }) => { //to fetch the post from api and put it into state
  
  useEffect(() => {
    getVacations();
  }, [getVacations]);

  return (
    <Fragment>
      <h1 className="large text-primary">Vacations</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome
      </p>
      <VacationForm />
      <div className="vacations">
        {vacations.map((vacation) => (
          <VacationItem key={vacation._id} vacation={vacation} />
        ))}
      </div>
    </Fragment>
  );
};

Vacations.propTypes = {
  getVacations: PropTypes.func.isRequired,
  vacation: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  vacation: state.vacation
});

export default connect(mapStateToProps, { getVacations })(Vacations);
