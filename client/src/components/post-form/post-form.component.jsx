import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { connect } from 'react-redux';
import { AddPost } from '../../redux/post/post.actions';

const PostForm = ({ AddPost }) => {
	const [text, setText] = useState('');

  const handleChange = (e) => {
    setText(e.target.value)
  }

	const handleSubmit = (e) => {
		e.preventDefault();
		AddPost({text});
		setText('');
	};
	return (
		<div className="post-form">
			<div className="bg-primary p">
				<h3>Say Something...</h3>
			</div>
			<form className="form my-1" onSubmit={handleSubmit}>
				<textarea
					name="text"
					cols="30"
					rows="5"
					placeholder="Create a post"
					required
					value={text}
					onChange={handleChange}
				></textarea>
				<input type="submit" className="btn btn-dark my-1" value="Submit" />
			</form>
		</div>
	);
};

PostForm.propTypes = {
  AddPost: PropTypes.func.isRequired,
};

export default connect(null, { AddPost })(PostForm);
