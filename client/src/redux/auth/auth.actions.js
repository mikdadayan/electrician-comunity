import axios from "axios";

import AuthActionTypes from "./auth.types";
import ProfileActionTypes from "../profile/profile.types";
import { setAlert } from "../alert/alert.action";
import setAuthToken from "../utils/setAuthToken";

const {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
} = AuthActionTypes;
const { CLEAR_PROFILE } = ProfileActionTypes;

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const user = await axios.get("/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: user.data.user,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const signupUser = (name, email, password) => async (dispatch) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post("/api/auth/signup", body, config);
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: { token: res.data.token },
    });
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, "danger"));
      });
    }

    dispatch({
      type: SIGNUP_FAIL,
    });
  }
};

export const loginUser = (email, password) => async (dispatch) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };

  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post("/api/auth/login", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, "danger"));
      });
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const logoutUser = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({
    type: LOGOUT_SUCCESS,
  });
};
