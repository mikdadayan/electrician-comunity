import AlertActionsTypes from './alert.types';
import uuid from "uuid";

export const setAlert = (msg, alertType) => (dispatch) => {
  const id = uuid.v4();
	dispatch({
		type: AlertActionsTypes.SET_ALERT,
		payload: { msg, alertType, id },
	});
	setTimeout( () => 
		dispatch({
			type: AlertActionsTypes.REMOVE_ALERT,
			payload: id,
		}),
		5000
	);
};
