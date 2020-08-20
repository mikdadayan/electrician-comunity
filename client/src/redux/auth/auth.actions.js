import axios from 'axios';

import AuthActionTypes from './auth.types';
import { setAlert } from '../alert/alert.action';
import setAuthToken from "../utils/setAuthToken";

const { SIGNUP_SUCCESS, SIGNUP_FAIL, USER_LOADED, AUTH_ERROR } = AuthActionTypes;

export const loadUser = () =>async (dispatch) => {
	if(localStorage.token){
		setAuthToken(localStorage.token);
	}

	try{	
		const user = await axios.get('http://localhost:5000/api/auth');
		dispatch({
			type: USER_LOADED,
			payload: user
		})
	} catch(error) {
		dispatch({
			type: AUTH_ERROR
		})
	}
}



export const signupUser = (name, email, password) => async (dispatch) => {
	const config = {
		headers: { 'Content-Type': 'application/json' },
  };
  
  const body = JSON.stringify({ name, email, password });
  
	try {
    const res = await axios.post('http://localhost:5000/api/auth/signup', body, config);
    console.log(res.data)
		dispatch({
			type: SIGNUP_SUCCESS,
			payload: { token: res.data.token },
		});
	} catch (error) {
		const errors = error.response.data.errors;

		if (errors) {
			errors.forEach((error) => {
				dispatch(setAlert(error.msg, 'danger'));
			});
		}

		dispatch({
			type: SIGNUP_FAIL,
		});
	}
};
