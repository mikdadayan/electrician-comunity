import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { GetProfiles } from '../../redux/profile/profile.actions';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProfileItem from '../profile-item/profile-item.component';
import Spinner from '../../components/spinner/spinner.component';

const Profiles = ({ GetProfiles, profile: { profiles, loading } }) => {
	useEffect(() => {
		GetProfiles();
	}, [GetProfiles]);
	console.log(profiles)
	const allProfiles = profiles.map((profile) => <ProfileItem key={profile._id} profile={profile} />);
	return (
		<Fragment>
			{loading ? (
				<Spinner />
			) : (
				<Fragment>
					<h1 className="large text-primary">Engineers</h1>
					<p className="lead">
						<i className="fab fa-connectdevelop"></i> Browse and connect with engineers
					</p>
					<div className="profiles">{allProfiles}</div>
				</Fragment>
			)}
		</Fragment>
	);
};

Profiles.propTypes = {
	profiles: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
});

export default connect(mapStateToProps, { GetProfiles })(Profiles);
