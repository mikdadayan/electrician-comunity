import React, { Fragment } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logoutUser } from '../../redux/auth/auth.actions';

const Navbar = ({ logoutUser, auth: { isAuthenticated, loading } }) => {
	const handleClick = () => {
		logoutUser();
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
					<NavLink activeStyle={{ color: '#ff9138' }} to="/dev">
						<i class="fab fa-wpbeginner"></i>
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
						<li>
							<NavLink onClick={handleClick} to="#!">
								<i class="fas fa-sign-out-alt"></i>
								<span className="hide-sm">Log Out</span>
							</NavLink>
						</li>
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
