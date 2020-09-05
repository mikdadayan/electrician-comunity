import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileEdu = ({ education }) => {
	return (
		<div className="profile-edu bg-white p-2">
			<h2 className="text-primary">Education</h2>
			{education &&
				education.map((edu) => (
					<div>
						<h3>{edu.school}</h3>
						<p>
							<Moment format="YYYY/MM/DD">{edu.from}</Moment> -{' '}
							{edu.current === true ? 'Now' : <Moment format="YYYY/MM/DD">{edu.to}</Moment>}
						</p>
						<p>
							<strong>Degree: </strong>{edu.degree}
						</p>
						<p>
							<strong>Field Of Study: </strong>{edu.fieldofstudy}
						</p>
						<p>
							<strong>Description: </strong>{edu.description}
						</p>
					</div>
				))}
		</div>
	);
};

ProfileEdu.propTypes = {
	education: PropTypes.array.isRequired,
};

export default ProfileEdu;
