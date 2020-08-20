import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setAlert } from '../../redux/alert/alert.action';
import { signupUser } from '../../redux/auth/auth.actions';

const SignUp = ({ setAlert, signupUser }) => {
	const [formData, setFormData] = useState({
		email: '',
		name: '',
		password: '',
		password2: '',
	});

	const { email, name, password, password2 } = formData;

	const handleChange = (evt) => {
		setFormData({
			...formData,
			[evt.target.name]: evt.target.value,
		});
	};

	const handleSubmit = async (evt) => {
		evt.preventDefault();
		if (password !== password2) {
			setAlert("Passwords don't match.", 'danger');
		} else {
			signupUser(name, email, password);
			// const newUser = {
			// 	email,
			// 	name,
			// 	password,
			// };

			// try {
			// 	const config = {
			// 		headers: {
			// 			'Content-Type': 'application/json',
			// 		},
			// 	};

			// 	const body = JSON.stringify(newUser);
			// 	const res = await axios.post('http://localhost:5000/api/auth/signup', body, config);
			// 	console.log(res.data);
			// } catch (error) {
			// 	console.log(error.response.data);
			// }
		}
	};
	return (
		<Fragment>
			<h1 className="large text-primary">Sign Up</h1>
			<p className="lead">
				<i className="fas fa-user"></i> Create Your Account
			</p>
			<form onSubmit={handleSubmit} className="form" action="create-profile.html">
				<div className="form-group">
					<input
						type="text"
						placeholder="Name"
						name="name"
						value={name}
						onChange={(e) => handleChange(e)}
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="email"
						placeholder="Email Address"
						name="email"
						value={email}
						onChange={(e) => handleChange(e)}
						required
					/>
					<small className="form-text">
						This site uses Gravatar so if you want a profile image, use a Gravatar email
					</small>
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
				<div className="form-group">
					<input
						type="password"
						placeholder="Confirm Password"
						name="password2"
						minLength="6"
						value={password2}
						onChange={(e) => handleChange(e)}
						required
					/>
				</div>
				<input type="submit" className="btn btn-primary" value="Register" />
			</form>
			<p className="my-1">
				Already have an account? <a href="/login">Sign In</a>
			</p>
		</Fragment>
	);
};

SignUp.propTypes = {
	setAlert: PropTypes.func.isRequired,
	signupUser: PropTypes.func.isRequired,
};

// const mapDispatchToProps = {
// 	setAlert: (msg, alertType, id) => (dispatch) => {
// 		dispatch(setAlert(msg, alertType, id));
// 		setTimeout(() => {
// 			dispatch(removeAlert(id));
// 		}, 5000);
// 	},
// };

// const mapDispatchToProps = (dispatch) => ({
// 	setAlert: (msg, alertType, id) => dispatch(setAlert(msg, alertType, id))
// })

// there is two ways to define mapDispatchToProps(as function or as an object),
// in these case object(recomended if there is not need optional configuration)
const mapDispatchToProps = { setAlert, signupUser };

export default connect(null, mapDispatchToProps)(SignUp);
