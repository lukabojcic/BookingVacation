import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import { connect } from 'react-redux';
import { deleteVacation } from '../../actions/vacation';

const VacationItem = ({
  deleteVacation,
  auth,
  vacation: { _id, text, name, user, comments, date },
  showActions
}) => (
  <div className="vacation bg-white p-1 my-1">
    <div>
      <Link to={`/profile/${user}`}>
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      <p className="my-1">{text}</p>
      <p className="vacation-date">Posted on {formatDate(date)}</p>

      {showActions && (
        <Fragment>
         
          <Link to={`/vacation/${_id}`} className="btn btn-primary">
            Discussion{' '}
            {comments.length > 0 && (
              <span className="comment-count">{comments.length}</span>
            )}
          </Link>
          {!auth.loading && user === auth.user._id && (
            <button
              onClick={() => deleteVacation(_id)}
              type="button"
              className="btn btn-danger"
            >
              <i className="fas fa-times" />
            </button>
          )}
        </Fragment>
      )}
    </div>
  </div>
);

VacationItem.defaultProps = {
  showActions: true
};

VacationItem.propTypes = {
  vacation: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteVacation: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteVacation })(
  VacationItem
);
