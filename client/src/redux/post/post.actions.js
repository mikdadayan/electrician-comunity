import axios from 'axios';
import PostActionTypes from './post.types';
import { setAlert } from '../alert/alert.action';

const { GET_POSTS, POSTS_ERROR, UPDATE_LIKES, DELETE_POST, ADD_POST } = PostActionTypes;

export const GetPosts = () => async (dispatch) => {
	try {
    const res = await axios.get('http://localhost:5000/api/posts');
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

export const AddPost = (textObj) => async dispatch => {
	const config = {
		headers: { 'Content-Type': 'application/json' },
	};
	const body = JSON.stringify(textObj);
	try {
		const res = await axios.post('http://localhost:5000/api/posts', body, config);
    dispatch({
      type: ADD_POST,
      payload: res.data.post
    })
	} catch (error) {
		const errors = error.response.data.errors;

		if (errors) {
			errors.forEach((error) => {
				dispatch(setAlert(error.msg, 'danger'));
			});
		}

		dispatch({
			type: POSTS_ERROR,
			payload: { msg: error.response.statusText, status: error.response.status },
		});
	}
}

export const DeletePost = (postId) => async (dispatch) => {
	try {
    const res = await axios.delete(`http://localhost:5000/api/posts/${postId}`);
    dispatch({
      type: DELETE_POST,
      payload: {id: postId}
		})
		dispatch(setAlert("Post Removed!", "success"))
	} catch (error) {
		dispatch({
			type: POSTS_ERROR,
			payload: { msg: error.response.statusText, status: error.response.status },
		});
	}
};

export const AddLike = (postId) => async dispatch => {
	try {
		const res = await axios.put(`http://localhost:5000/api/posts/like/${postId}`);
    dispatch({
      type: UPDATE_LIKES,
      payload:{id: postId, likes: res.data.likes}
    })
	} catch (error) {
		console.log(error)
		dispatch({
			type: POSTS_ERROR,
			payload: { msg: error.response.statusText, status: error.response.status },
		});
	}

} 

export const DeleteLike = (postId) => async dispatch => {
	try {
		const res = await axios.delete(`http://localhost:5000/api/posts/unlike/${postId}`);
    dispatch({
      type: UPDATE_LIKES,
      payload:{id: postId, likes: res.data.likes}
    })
	} catch (error) {
		console.log(error)
		dispatch({
			type: POSTS_ERROR,
			payload: { msg: error.response.statusText, status: error.response.status },
		});
	}

} 