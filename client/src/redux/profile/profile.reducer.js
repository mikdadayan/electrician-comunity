import ProfileActionTypes from './profile.types';

const { PROFILE_ERR, GET_PROFILE } = ProfileActionTypes;
const INITIAL_STATE = {
	profile: null,
	profiles: [],
	loading: true,
	error: {},
};

const profileReducer = (state = INITIAL_STATE, action) => {
	const { type, payload } = action;
	switch (type) {
		case GET_PROFILE:
			return {
				...state,
				profile: payload,
				loading: false,
			};
		case PROFILE_ERR:
			return {
				...state,
				error: payload,
				loading: false,
			};
		default:
			return state;
	}
};

export default profileReducer;
