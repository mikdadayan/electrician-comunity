import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';

const PostItem = ({ post: { user, text, name, avatar, date, comments, likes } }) => {
	return (
		<div class="post bg-white p-1 my-1">
			<div>
				<a href="profile.html">
					<img class="round-img" src={avatar} alt="" />
					<h4>{name}</h4>
				</a>
			</div>
			<div>
				<p class="my-1">{text}</p>
				<p class="post-date">
					Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
				</p>
				<button type="button" class="btn btn-light">
					<i class="fas fa-thumbs-up"></i>
					<span>{likes.length}</span>
				</button>
				<button type="button" class="btn btn-light">
					<i class="fas fa-thumbs-down"></i>
				</button>
				<a href="post.html" class="btn btn-primary">
					Discussion <span class="comment-count">{comments.length}</span>
				</a>
				<button type="button" class="btn btn-danger">
					<i class="fas fa-times"></i>
				</button>
			</div>
		</div>
	);
};

PostItem.propTypes = {
	post: PropTypes.object.isRequired,
};

export default connect()(PostItem);
