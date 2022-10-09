import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import VacationItem from '../vacations/VacationItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import { getVacation } from '../../actions/vacation';

const Vacation = ({ getVacation, vacation: { vacation, loading }, match }) => {
  useEffect(() => {
    getVacation(match.params.id);
  }, [getVacation, match.params.id]);

  return loading || vacation === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/vacations" className="btn">
        Back To Vacations
      </Link>
      <VacationItem vacation={vacation} showActions={false} />
      <CommentForm vacationId={vacation._id} />
      <div className="comments">
        {vacation.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} vacationId={vacation._id} />
        ))}
      </div>
    </Fragment>
  );
};

Vacation.propTypes = {
  getVacation: PropTypes.func.isRequired,
  vacation: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  vacation: state.vacation
});

export default connect(mapStateToProps, { getVacation })(Vacation);
