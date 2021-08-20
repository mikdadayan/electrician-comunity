import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useEffect } from "react";

import {
  getCurrentUserProfile,
  DeleteAccount,
} from "../../redux/profile/profile.actions";
import setAuthToken from "../../redux/utils/setAuthToken";
import Spinner from "../../components/spinner/spinner.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { loadUser } from "../../redux/auth/auth.actions";
import { Link, withRouter } from "react-router-dom";
import DashboardActions from "../../components/dashboard-actions/dashboard-actions.component";
import ExperienceDisplay from "../../components/experience-display/experience-display.component";
import EducationDisplay from "../../components/education-display/education-display.component";

export const Dashboard = ({
  getCurrentUserProfile,
  loadUser,
  DeleteAccount,
  auth: { user },
  profile: { loading, profile },
  history,
}) => {
  useEffect(() => {
    setAuthToken(localStorage.token);
    loadUser();
    getCurrentUserProfile();
  }, []);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <FontAwesomeIcon icon={["fas", "user"]} /> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <ExperienceDisplay />
          <EducationDisplay />
          <div className="my-2">
            <button
              className="btn btn-danger"
              onClick={() => DeleteAccount(history)}
            >
              <i className="fas fa-user-times"></i> Delete My Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentUserProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default withRouter(
  connect(mapStateToProps, { getCurrentUserProfile, loadUser, DeleteAccount })(
    Dashboard
  )
);
