import ProfileActionTypes from "./profile.types";

const {
  PROFILE_ERROR,
  GET_PROFILE,
  CLEAR_PROFILE,
  CREATE_PROFILE,
  CREATE_ERROR,
  ADD_EXPERIENCE,
  ADD_EDUCATION,
  GET_ALL_PROFILES,
  PROFILES_ERROR,
} = ProfileActionTypes;

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
    case CREATE_PROFILE:
      return {
        ...state,
        profile: payload.profile,
        loading: false,
      };
    case GET_ALL_PROFILES:
      return {
        ...state,
        profiles: payload.profiles,
        loading: false,
      };
    case ADD_EXPERIENCE:
      return {
        ...state,
        profile: { ...state.profile, experience: payload.experience },
        loading: false,
      };
    case ADD_EDUCATION:
      return {
        ...state,
        profile: { ...state.profile, education: payload.education },
        loading: false,
      };
    case PROFILE_ERROR:
    case CREATE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false,
      };
    case PROFILES_ERROR:
      return {
        ...state,
        profiles: null,
        loading: false,
      };
    default:
      return state;
  }
};

export default profileReducer;
