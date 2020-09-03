import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { DeleteEducation } from '../../redux/profile/profile.actions';

const EducationDisplay = ({ education, DeleteEducation }) => {
	const educations = education.map((edu) => {
		return (
			<tr key={edu._id}>
				<td>{edu.school}</td>
				<td className="hide-sm">{edu.degree}</td>
				<td className="hide-sm">{edu.fieldofstudy}</td>
				<td className="hide-sm">
					<Moment format="YYYY/MM/DD">{edu.from}</Moment> -{' '}
					{edu.current === true ? 'Now' : <Moment format="YYYY/MM/DD">{edu.to}</Moment>}
				</td>
				<td>
					<button className="btn btn-danger" onClick={() => DeleteEducation(edu._id)}>
						Delete
					</button>
				</td>
			</tr>
		);
	});

	return (
		<Fragment>
			<h2 className="my-2">Education Credentials</h2>
			<table className="table">
				<thead>
					<tr>
						<th>School</th>
						<th className="hide-sm">Degree</th>
						<th className="hide-sm">Field Of Study</th>
						<th className="hide-sm">Years</th>
						<th></th>
					</tr>
				</thead>
				<tbody>{educations}</tbody>
			</table>
		</Fragment>
	);
};

EducationDisplay.propTypes = {
	education: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
	education: state.profile.profile.education || [],
});

export default connect(mapStateToProps, { DeleteEducation })(EducationDisplay);
