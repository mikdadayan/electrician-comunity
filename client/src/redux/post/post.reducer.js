import PostActionTypes from './post.types';

const { GET_POSTS, POSTS_ERROR } = PostActionTypes;

const INITIAL_STATE = {
	posts: [],
	post: null,
	loading: true,
	error: {},
};

const postReducer = (state = INITIAL_STATE, action) => {
	const { type, payload } = action;
	switch (type) {
		case GET_POSTS:
			return {
				...state,
				posts: payload,
				loading: false,
			};
		case POSTS_ERROR:
			return {
        ...state,
        error: payload,
        loading: false
      };
		default:
			return state;
	}
};

export default postReducer;
