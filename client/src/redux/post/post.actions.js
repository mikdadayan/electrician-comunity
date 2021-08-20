import axios from "axios";
import PostActionTypes from "./post.types";
import { setAlert } from "../alert/alert.action";

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

export const GetPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/posts");
    dispatch({
      type: GET_POSTS,
      payload: res.data.posts,
    });
  } catch (error) {
    dispatch({
      type: POSTS_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const AddPost = (textObj) => async (dispatch) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };
  const body = JSON.stringify(textObj);
  try {
    const res = await axios.post("/api/posts", body, config);
    dispatch({
      type: ADD_POST,
      payload: res.data.post,
    });
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, "danger"));
      });
    }

    dispatch({
      type: POSTS_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const DeletePost = (postId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/posts/${postId}`);
    dispatch({
      type: DELETE_POST,
      payload: { id: postId },
    });
    dispatch(setAlert("Post Removed!", "success"));
  } catch (error) {
    dispatch({
      type: POSTS_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const GetPost = (postId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${postId}`);
    dispatch({
      type: GET_POST,
      payload: { post: res.data.post },
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const AddLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${postId}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id: postId, likes: res.data.likes },
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: POSTS_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const DeleteLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/posts/unlike/${postId}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id: postId, likes: res.data.likes },
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: POSTS_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const AddComment = (body, postId) => async (dispatch) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };
  try {
    const res = await axios.put(
      `/api/posts/comment/${postId}`,
      { comment: body },
      config
    );
    dispatch({
      type: ADD_COMMENT,
      payload: { comments: res.data.comments },
    });
    dispatch(setAlert("Comment Added !", "success"));
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, "danger"));
      });
    }

    dispatch({
      type: COMMENT_ERROR,
    });
  }
};

export const DeleteComment = (commentId, postId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
    dispatch({
      type: DELETE_COMMENT,
      payload: res.data.post,
    });
    dispatch(setAlert("Comment Deleted !", "success"));
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, "danger"));
      });
    }

    dispatch({
      type: COMMENT_ERROR,
    });
  }
};
