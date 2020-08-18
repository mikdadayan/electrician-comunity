import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import uuid from 'uuid';

import { setAlert, removeAlert } from '../../redux/alert/alert.action';
import AlertActionTypes from '../../redux/alert/alert.types';

const SignUp = ({ setAlert, dispatch }) => {
	const [formData, setFormData] = useState({
		email: '',
		name: '',
		password: '',
		password2: '',
	});

	const handleChange = (evt) => {
		setFormData({
			...formData,
			[evt.target.name]: evt.target.value,
		});
	};

	const handleSubmit = async (evt) => {
		evt.preventDefault();
		if (password !== password2) {
			const id = uuid.v4();
			setAlert("Passwords don't match.", 'danger', id);
		} else {
			const newUser = {
				email,
				name,
				password,
			};

			try {
				const config = {
					headers: {
						'Content-Type': 'application/json',
					},
				};

				const body = JSON.stringify(newUser);
				const res = await axios.post('http://localhost:5000/api/auth/signup', body, config);
				console.log(res.data);
			} catch (error) {
				console.log(error.response.data);
			}
		}
	};
	const { email, name, password, password2 } = formData;
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

const mapDispatchToProps = {
	setAlert: (msg, alertType, id) => dispatch => {
		dispatch(setAlert(msg, alertType, id));
		setTimeout(() => {dispatch(removeAlert(id))}, 5000)
	},
};

export default connect(null, mapDispatchToProps)(SignUp);
