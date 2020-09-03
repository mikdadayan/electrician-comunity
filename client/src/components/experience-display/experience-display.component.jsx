import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import PropTypes from 'prop-types'
import { DeleteExperience } from '../../redux/profile/profile.actions';


const ExperienceDisplay = ({ experience, DeleteExperience }) => {
	const experiences = experience.map((exp) => (
		<tr key={exp._id}>
			<td>{exp.company}</td>
			<td className="hide-sm">{exp.title}</td>
			<td className="hide-sm">
				<Moment format="YYYY/MM/DD">{exp.from}</Moment> -{' '}
				{exp.current === true ? 'Now' : (<Moment format="YYYY/MM/DD">{exp.to}</Moment>)}
			</td>
			<td>
				<button className="btn btn-danger" onClick={()=> DeleteExperience(exp._id)}>Delete</button>
			</td>
		</tr>
	));

	return (
		<Fragment>
			<h2 className="my-2">Experience Credentials</h2>
			<table className="table">
				<thead>
					<tr>
						<th>Company</th>
						<th className="hide-sm">Title</th>
						<th className="hide-sm">Years</th>
						<th></th>
					</tr>
				</thead>
				<tbody>{experiences}</tbody>
			</table>
		</Fragment>
	);
};

ExperienceDisplay.propTypes = {
  experience: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
	experience: state.profile.profile.experience || [],
});


export default connect(mapStateToProps, {DeleteExperience})(ExperienceDisplay);
