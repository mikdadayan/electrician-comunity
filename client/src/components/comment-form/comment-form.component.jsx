import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AddComment } from '../../redux/post/post.actions';

const CommentForm = ({ AddComment, postId }) => {
	const [text, setText] = useState('');

	const handleChange = (e) => {
		setText(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		AddComment(text, postId);
		setText('');
	};

	return (
		<div className="post-form">
			<div className="bg-primary p">
				<h3>Leave A Comment</h3>
			</div>
			<form className="form my-1" onSubmit={handleSubmit}>
				<textarea
					name="text"
					cols="30"
					rows="5"
					placeholder="Comment on this post"
					required
					onChange={handleChange}
					value={text}
				></textarea>
				<input type="submit" className="btn btn-dark my-1" value="Submit" />
			</form>
		</div>
	);
};

CommentForm.propTypes = {
	AddComment: PropTypes.func.isRequired,
};

export default connect(null, { AddComment })(CommentForm);
