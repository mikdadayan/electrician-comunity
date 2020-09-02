import React, { Fragment, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useState } from 'react';
import { connect } from 'react-redux';
import { AddProfileExperience } from '../../redux/profile/profile.actions';

const AddExperience = ({ AddProfileExperience, history, profile: { loading, profile } }) => {
	console.log(profile);
	const [experienceData, setExperienceData] = useState({
		title: '',
		company: '',
		location: '',
		from: '',
		to: '',
		current: false,
		description: '',
	});

	const [toDateDisabled, toggleDisabled] = useState(false);

	const { title, company, location, from, to, current, description } = experienceData;

	const handleChange = (e) => {
		setExperienceData({ ...experienceData, [e.target.name]: e.target.value });
	};

  const handleSubmit = (e) => {
    e.preventDefault();
    AddProfileExperience(experienceData, history);
  }

	return (
		<Fragment>
			<h1 className="large text-primary">Add An Experience</h1>
			<p className="lead">
				<i className="fas fa-code-branch"></i> Add any developer/programming positions that you have had in the
				past
			</p>
			<small>* = required field</small>
			<form className="form" onSubmit={handleSubmit}>
				<div className="form-group">
					<input
						type="text"
						placeholder="* Job Title"
						name="title"
						onChange={handleChange}
						required
						value={title}
					/>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="* Company"
						name="company"
						onChange={handleChange}
						required
						value={company}
					/>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="Location"
						name="location"
						onChange={handleChange}
						value={location}
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
								setExperienceData({ ...experienceData, current: !current });
								toggleDisabled(!toDateDisabled);
							}}
							value={current}
						/>{' '}
						Current Job
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
						placeholder="Job Description"
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

const mapStateToProps = (state) => ({
	profile: state.profile,
});

export default withRouter(connect(mapStateToProps, { AddProfileExperience })(AddExperience));
