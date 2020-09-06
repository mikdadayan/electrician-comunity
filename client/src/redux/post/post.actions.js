import axios from 'axios';
import PostActionTypes from './post.types';

const { GET_POSTS, POSTS_ERROR } = PostActionTypes;

export const GetPosts = () => async (dispatch) => {
	try {
    const res = await axios('http://localhost:5000/api/posts');
    dispatch({
      type: GET_POSTS,
      payload: res.data.posts
    })
	} catch (error) {
		dispatch({
			type: POSTS_ERROR,
			payload: { msg: error.response.statusText, status: error.response.status },
		});
	}
};
