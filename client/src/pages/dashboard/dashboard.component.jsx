import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

import { getCurrentUserProfile } from '../../redux/profile/profile.actions';

export const Dashboard = ({getCurrentUserProfile}) => {
	// console.log(props);
	useEffect(() => {
		getCurrentUserProfile();
	}, []);
	return <div>Dashboard</div>;
};

Dashboard.propTypes = {
	getCurrentUserProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});


export default connect(mapStateToProps, {getCurrentUserProfile})(Dashboard);
