import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profile.js';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner.js';
import ProfileTop from './ProfileTop.js';
import ProfileAbout from './ProfileAbout';
import ProfileExp from './ProfileExp';
import ProfileEdu from './ProfileEdu';

const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);
  return (
    <Fragment>
      {profile === null && loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to='/profiles' className='btn btn-primary'>
            Back to Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to='/edit-profile' className='btn btn-dark'>
                Edit Profile
              </Link>
            )}
          <div class='profile-grid my-1'>
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            {profile.experience.length > 0 ? (
              <Fragment>
                {profile.experience.map(experience => (
                  <ProfileExp key={experience._id} experience={experience} />
                ))}
              </Fragment>
            ) : (
              <h4>No experience credentials</h4>
            )}
            {profile.education.length > 0 ? (
              <Fragment>
                {profile.education.map(education => (
                  <ProfileEdu key={education._id} education={education} />
                ))}
              </Fragment>
            ) : (
              <h4>No Credentials Found</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
});
export default connect(mapStateToProps, { getProfileById })(Profile);
