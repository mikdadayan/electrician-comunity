import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { GetProfileByUserId } from '../../redux/profile/profile.actions';

import Spinner from '../../components/spinner/spinner.component';
import ProfileTop from '../../components/profile-top/profile-top.component';
import ProfileAbout from '../../components/profile-about/profile-about.component';
import ProfileExp from '../../components/profile-exp/profile-exp.component';
import ProfileEdu from '../../components/profile-edu/profile-edu.component';


const Profile = ({
	match: {
		params: { userId },
	},
	auth,
	profile: { profile, loading },
	GetProfileByUserId,
}) => {
	useEffect(() => {
		GetProfileByUserId(userId);
	}, [GetProfileByUserId]);
	return (
		<Fragment>
			{loading || profile === null ? (
				<Spinner />
			) : (
				<Fragment>
					<Link to="/engineers" className="btn btn-light">
						Back To Profiles
					</Link>
					{auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && (
						<Link to="/edit-profile" className="btn btn-dark">
							Edit Profile
						</Link>
					)}
					<div className="profile-grid my-1">
						{/* <!-- Top --> */}
						<ProfileTop profile={profile} />
						{/* <!-- About --> */}
						<ProfileAbout profile={profile} />
						{/* <!-- Experience --> */}
						<ProfileExp experience={profile.experience}/>
						{/* Education  */}
            <ProfileEdu education={profile.education} />
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

Profile.propTypes = {
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	GetProfileByUserId: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	auth: state.auth,
});

export default connect(mapStateToProps, { GetProfileByUserId })(Profile);
