import axios from 'axios';
import ProfileActionTypes from './profile.types';

const { GET_PROFILE, PROFILE_ERROR } = ProfileActionTypes;

export const getCurrentUserProfile = () => async (dispatch) => {
	try {
		const res = await axios.get('http://localhost:5000/api/profile/myprofile');
    console.log(res)
		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: error.response.statusText, status: error.response.status },
		});
	}
};
