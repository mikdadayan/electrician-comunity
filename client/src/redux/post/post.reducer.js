import PostActionTypes from './post.types';

const {
	GET_POSTS,
	POSTS_ERROR,
	UPDATE_LIKES,
	DELETE_POST,
	ADD_POST,
	GET_POST,
	POST_ERROR,
	ADD_COMMENT,
	COMMENT_ERROR,
	DELETE_COMMENT,
} = PostActionTypes;

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
		case ADD_POST:
			return {
				...state,
				posts: [payload, ...state.posts],
			};
		case UPDATE_LIKES:
			return {
				...state,
				posts: state.posts.map((post) => (post._id === payload.id ? { ...post, likes: payload.likes } : post)),
				loading: false,
			};
		case GET_POST:
			return {
				...state,
				loading: false,
				post: payload.post,
			};
		case DELETE_POST:
			return {
				...state,
				posts: state.posts.filter((post) => post._id !== payload.id),
			};
		case ADD_COMMENT:
			console.log(payload);
			return {
				...state,
				post: { ...state.post, comments: payload.comments },
			};
		case COMMENT_ERROR:
			return { ...state, post: state.post };
		case POSTS_ERROR:
			return {
				...state,
				error: payload,
				loading: false,
			};
		case POST_ERROR:
			return {
				...state,
				error: payload,
				loading: false,
			};
		case DELETE_COMMENT:
			return {
				...state,
				post: payload
			};
		default:
			return state;
	}
};

export default postReducer;
