import React, { Fragment, useState } from 'react';

const Login = () => {
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
		console.log("Passwords don't match.");

		try {
		} catch (error) {
			console.log(error.response.data);
		}
	};

	const { email, password } = formData;
	return (
		<Fragment>
			<div className="alert alert-danger">Invalid credentials</div>
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

export default Login;
