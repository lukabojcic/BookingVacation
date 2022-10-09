import React from 'react';
import PropTypes from 'prop-types';

const ProfileTop = ({
  profile: {
    location,
    user: { name }
  }
}) => {
  return (
    <div className="profile-top bg-primary p-2">
      <h1 className="large">{name}</h1>
      <p>{location ? <span>{location}</span> : null}</p>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileTop;
