import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileExp = ({ experience }) => {
	return (
		<div className="profile-exp bg-white p-2">
			<h2 className="text-primary">Experience</h2>
			{experience &&
				experience.map((exp) => (
					<div>
						<h3 className="text-dark">{exp.company}</h3>
						<p>
							<Moment format="YYYY/MM/DD">{exp.from}</Moment> -{' '}
							{exp.current === true ? 'Now' : <Moment format="YYYY/MM/DD">{exp.to}</Moment>}
						</p>
						<p>
							<strong>Position: </strong>{exp.title}
						</p>
						<p>
							<strong>Description: </strong>{exp.description}
						</p>
					</div>
				))}
		</div>
	);
};

ProfileExp.propTypes = {
	experience: PropTypes.array.isRequired,
};

export default ProfileExp;
