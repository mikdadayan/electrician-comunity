import AuthActionTypes from './auth.types';

const { SIGNUP_SUCCESS, SIGNUP_FAIL, USER_LOADED, AUTH_ERROR } = AuthActionTypes;

const INITIAL_STATE = {
	user: null,
	loading: true,
	isAuthenticated: false,
	token: localStorage.getItem('token'),
};

const authReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SIGNUP_SUCCESS:
			localStorage.setItem('token', action.payload.token);
			return {
				...state,
				isAuthenticated: true,
				loading: false,
			};
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: action.payload,
			};

		case SIGNUP_FAIL:
		case AUTH_ERROR:
			localStorage.removeItem('token');
			return {
				...state,
				loading: false,
				isAuthenticated: false,
				user: null,
				token: null,
			};
		default:
			return state;
	}
};

export default authReducer;
