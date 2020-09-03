import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { AddProfileEducation } from '../../redux/profile/profile.actions';

const AddEducation = ({ AddProfileEducation, history }) => {
	const [educationData, setEducationData] = useState({
		school: '',
		degree: '',
		fieldofstudy: '',
		from: '',
		to: '',
		current: false,
		description: '',
	});

	const [toDateDisabled, toggleDisabled] = useState(false);

	const { school, degree, fieldofstudy, from, to, current, description } = educationData;

	const handleChange = (e) => {
		setEducationData({ ...educationData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		AddProfileEducation(educationData, history);
	};

	return (
		<Fragment>
			<h1 className="large text-primary">Add Your Education</h1>
			<p className="lead">
				<i className="fas fa-code-branch"></i> Add any school, bootcamp, etc that you have attended
			</p>
			<small>* = required field</small>
			<form className="form" onSubmit={handleSubmit}>
				<div className="form-group">
					<input
						type="text"
						placeholder="* School"
						name="school"
						onChange={handleChange}
						required
						value={school}
					/>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="* Degree"
						name="degree"
						onChange={handleChange}
						required
						value={degree}
					/>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="Field Of Study"
						name="fieldofstudy"
						onChange={handleChange}
						value={fieldofstudy}
					/>
				</div>
				<div className="form-group">
					<h4>From Date</h4>
					<input type="date" name="from" onChange={handleChange} value={from} />
				</div>
				<div className="form-group">
					<p>
						<input
							type="checkbox"
							name="current"
							checked={current}
							onChange={(e) => {
								setEducationData({ ...educationData, current: !current });
								toggleDisabled(!toDateDisabled);
							}}
							value={current}
						/>{' '}
						Current School or Bootcamp
					</p>
				</div>
				<div className="form-group">
					<h4>To Date</h4>
					<input type="date" name="to" onChange={handleChange} value={to} disabled={toDateDisabled} />
				</div>
				<div className="form-group">
					<textarea
						name="description"
						cols="30"
						rows="5"
						placeholder="Program Description"
						onChange={handleChange}
						value={description}
					></textarea>
				</div>
				<input type="submit" className="btn btn-primary my-1" />
				<Link className="btn btn-light my-1" to="/dashboard">
					Go Back
				</Link>
			</form>
		</Fragment>
	);
};

AddEducation.propTypes = {
	AddProfileEducation: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
});

export default withRouter(connect(mapStateToProps, { AddProfileEducation })(AddEducation));
