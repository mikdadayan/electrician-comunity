import React, { Fragment } from 'react';
import { Link, NavLink, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { logoutUser } from '../../redux/auth/auth.actions';

const Navbar = ({ logoutUser, auth: { isAuthenticated, loading }, history }) => {
	const handleClick = () => {
		logoutUser();
		console.log('Worked!');
		// history.push('/');
	};

	return (
		<nav className="navbar bg-dark">
			<h1>
				<Link to="/">
					<i className="fas fa-bolt"></i> Electricians
				</Link>
			</h1>
			<ul>
				<li>
					<NavLink activeStyle={{ color: '#ff9138' }} to="/engineers">
						{/* <i className="fab fa-wpbeginner"> </i> */}
						<FontAwesomeIcon icon={['fab', 'wpbeginner']} />
						Engineers
					</NavLink>
				</li>
				{!loading &&
					(!isAuthenticated ? (
						<Fragment>
							<li>
								<NavLink activeStyle={{ color: '#ff9138' }} to="/signup">
									Sign Up
								</NavLink>
							</li>
							<li>
								<NavLink activeStyle={{ color: '#ff9138' }} to="/login">
									Login
								</NavLink>
							</li>
						</Fragment>
					) : (
						<Fragment>
							<li>
								<NavLink activeStyle={{ color: '#ff9138' }} to="/dashboard">
									{/* <i className="fas fa-columns"> </i> */}
									<FontAwesomeIcon icon={['fas', 'columns']} />
									<span className="hide-sm"> Dashboard</span>
								</NavLink>
							</li>
							<li>
								<NavLink onClick={handleClick} to="/">
									{/* <i className="fas fa-sign-out-alt"></i> */}
									<FontAwesomeIcon icon={['fas', 'sign-out-alt']} />
									<span className="hide-sm"> Log Out</span>
								</NavLink>
							</li>
						</Fragment>
					))}
			</ul>
		</nav>
	);
};

Navbar.protoType = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default withRouter(connect(mapStateToProps, { logoutUser })(Navbar));
