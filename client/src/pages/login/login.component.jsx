import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loginUser } from '../../redux/auth/auth.actions';
import { setAlert } from '../../redux/alert/alert.action';
import { Redirect } from 'react-router-dom';

const Login = ({ loginUser, setAlert, isAuthenticated }) => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = formData;

	const handleChange = (evt) => {
		setFormData({
			...formData,
			[evt.target.name]: evt.target.value,
		});
	};

	const handleSubmit = async (evt) => {
		evt.preventDefault();
		try {
			loginUser(email, password);
		} catch (error) {
			console.log(error.response.data);
		}
	};

	// if (isAuthenticated) {
	// 	return <Redirect to="/dashboard" />;
	// }

	return (
		<Fragment>
			<h1 className="large text-primary">Sign In</h1>
			<p className="lead">
				<i className="fas fa-user"></i> Sign into Your Account
			</p>
			<form onSubmit={handleSubmit} className="form" action="dashboard.html">
				<div className="form-group">
					<input
						type="email"
						placeholder="Email Address"
						name="email"
						value={email}
						onChange={(e) => handleChange(e)}
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="password"
						placeholder="Password"
						name="password"
						minLength="6"
						value={password}
						onChange={(e) => handleChange(e)}
						required
					/>
				</div>
				<input type="submit" className="btn btn-primary" value="Login" />
			</form>
			<p className="my-1">
				Don't have an account? <a href="/signup">Sign Up</a>
			</p>
		</Fragment>
	);
};

Login.propTypes = {
	setAlert: PropTypes.func.isRequired,
	loginUser: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { loginUser, setAlert })(Login);
