import React, { Fragment } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { logoutUser } from '../../redux/auth/auth.actions';

const Navbar = ({ logoutUser, isAuthenticated }) => {
	console.log(isAuthenticated)
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
						Engineers
					</NavLink>
				</li>
				{!isAuthenticated ? (
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
						<NavLink onClick={handleClick}  to="/">
							Log Out
						</NavLink>
					</li>
				)}
			</ul>
		</nav>
	);
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default withRouter(connect(mapStateToProps, { logoutUser })(Navbar));
