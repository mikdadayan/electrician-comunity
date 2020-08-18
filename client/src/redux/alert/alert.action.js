import AlertActionsTypes from './alert.types';

export const setAlert = (msg, alertType, id) => ({
	type: AlertActionsTypes.SET_ALERT,
	payload: { msg, alertType, id },
});


export const removeAlert = (id) => ({
  type: AlertActionsTypes.REMOVE_ALERT,
  payload: id
})