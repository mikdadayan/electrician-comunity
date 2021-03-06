import AlertActionsTypes from './alert.types';


const INITIAL_STATE = [];

const alertReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case AlertActionsTypes.SET_ALERT:
      return [...state, action.payload];
    case AlertActionsTypes.REMOVE_ALERT:
      return state.filter(alert => alert.id !== action.payload);
		default:
			return [...state];
	}
};

export default alertReducer;