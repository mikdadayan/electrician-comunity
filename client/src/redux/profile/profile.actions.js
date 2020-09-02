import axios from 'axios';
import ProfileActionTypes from './profile.types';
import { setAlert } from '../alert/alert.action';

const { GET_PROFILE, PROFILE_ERROR, CREATE_PROFILE, CREATE_ERROR } = ProfileActionTypes;

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

export const addCurrentUserProfile = (profile, history, edit = false) => async dispatch => {
	const config = {
		headers: { 'Content-Type': 'application/json' },
	};
	const body = JSON.stringify(profile);
	try {
		const res = await axios.post('http://localhost:5000/api/profile/', body, config);
		console.log(res)
		dispatch({
			type: CREATE_PROFILE,
			payload: { profile: res.data.profile },
		});

		

		dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", 'success'));

		if(!edit) {
			history.push('/dashboard')
		}

	} catch (error) {
		const errors = error.response.data.errors;

		if (errors) {
			errors.forEach((error) => {
				dispatch(setAlert(error.msg, 'danger'));
			});
		}

		dispatch({
			type: CREATE_ERROR,
		});
	}
} 
