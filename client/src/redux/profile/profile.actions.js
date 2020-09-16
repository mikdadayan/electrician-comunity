import axios from 'axios';
import ProfileActionTypes from './profile.types';
import { setAlert } from '../alert/alert.action';

const {
	GET_PROFILE,
	PROFILE_ERROR,
	CREATE_PROFILE,
	CREATE_ERROR,
	ADD_EXPERIENCE,
	ADD_EDUCATION,
	CLEAR_PROFILE,
	GET_ALL_PROFILES,
	PROFILES_ERROR,
} = ProfileActionTypes;

export const getCurrentUserProfile = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/profile/myprofile');
		console.log(res);
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

export const addCurrentUserProfile = (profile, history, edit = false) => async (dispatch) => {
	const config = {
		headers: { 'Content-Type': 'application/json' },
	};
	const body = JSON.stringify(profile);
	try {
		const res = await axios.post('/api/profile/', body, config);
		console.log(res);
		dispatch({
			type: CREATE_PROFILE,
			payload: { profile: res.data.profile },
		});

		dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

		history.push('/dashboard');
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
};

export const AddProfileExperience = (experience, history, edit = false) => async (dispatch) => {
	const config = {
		headers: { 'Content-Type': 'application/json' },
	};
	const body = JSON.stringify(experience);
	try {
		const res = await axios.put('/api/profile/experience', body, config);
		console.log(res);
		dispatch({
			type: ADD_EXPERIENCE,
			payload: { experience: res.data.experience },
		});

		// dispatch(setAlert(edit ? 'Profile Updated' : 'Added Experience', 'success'));
		dispatch(setAlert('Added Experience', 'success'));

		history.push('/dashboard');
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
};

export const AddProfileEducation = (education, history) => async (dispatch) => {
	const config = {
		headers: { 'Content-Type': 'application/json' },
	};
	const body = JSON.stringify(education);
	try {
		const res = await axios.put('/api/profile/education', body, config);
		console.log(res);
		dispatch({
			type: ADD_EDUCATION,
			payload: { education: res.data.education },
		});

		// dispatch(setAlert(edit ? 'Profile Updated' : 'Added Experience', 'success'));
		dispatch(setAlert('Added Education', 'success'));

		history.push('/dashboard');
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
};

export const DeleteEducation = (eduId) => async (dispatch) => {
	try {
		const res = await axios.delete(`/api/profile/education/${eduId}`);
		console.log(res);
		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});

		// dispatch(setAlert(edit ? 'Profile Updated' : 'Added Experience', 'success'));
		dispatch(setAlert('Education Deleted.', 'success'));

		// history.push('/dashboard');
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
};

export const DeleteExperience = (expId, history) => async (dispatch) => {
	const config = {
		headers: { 'Content-Type': 'application/json' },
	};
	try {
		const res = await axios.delete(`/api/profile/experience/${expId}`);
		console.log(res);
		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});

		// dispatch(setAlert(edit ? 'Profile Updated' : 'Added Experience', 'success'));
		dispatch(setAlert('Experience Deleted.', 'success'));

		// history.push('/dashboard');
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
};

export const DeleteAccount = (history) => async (dispatch) => {
	if (window.confirm('Are you sure? This can NOT be undone!')) {
		try {
			const res = await axios.delete(`/api/profile/delete`);
			console.log(res);
			dispatch({
				type: CLEAR_PROFILE,
				payload: res.data,
			});

			dispatch({
				type: 'ACCOUTN_DELETE',
				payload: res.data,
			});

			// dispatch(setAlert(edit ? 'Profile Updated' : 'Added Experience', 'success'));
			dispatch(setAlert('Account Deleted.', 'success'));

			history.push('/login');
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
};

export const GetProfiles = () => async (dispatch) => {
	try {
		const res = await axios.get(`/api/profile/profiles`);
		console.log(res);
		dispatch({
			type: GET_ALL_PROFILES,
			payload: res.data,
		});
	} catch (error) {
		const errors = error.response.data.errors;

		if (errors) {
			errors.forEach((error) => {
				dispatch(setAlert(error.msg, 'danger'));
			});
		}
		dispatch({
			type: PROFILES_ERROR,
		});
	}
};


export const GetProfileByUserId = (userId) => async dispatch => {
	try {
		const res = await axios.get(`/api/profile/${userId}`);
		console.log(res);
		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});
	} catch (error) {
		const errors = error.response.data.errors;

		if (errors) {
		errors.forEach((error) => {
				dispatch(setAlert(error.msg, 'danger'));
			});
		}
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: error.response.statusText, status: error.response.status },
		});
	}
} 