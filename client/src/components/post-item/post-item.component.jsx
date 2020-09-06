import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { AddLike, DeleteLike, DeletePost } from '../../redux/post/post.actions';

const PostItem = ({ auth, post: { user, text, name, avatar, date, comments, likes, _id }, AddLike, DeleteLike, DeletePost }) => {
	return (
		<div className="post bg-white p-1 my-1">
			<div>
				<a href="profile.html">
					<img className="round-img" src={avatar} alt="" />
					<h4>{name}</h4>
				</a>
			</div>
			<div>
				<p className="my-1">{text}</p>
				<p className="post-date">
					Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
				</p>
				<button type="button" className="btn btn-light" onClick={() => AddLike(_id)}>
					<i className="fas fa-thumbs-up"></i>
					<span>{likes.length}</span>
				</button>
				<button type="button" className="btn btn-light" onClick={() => DeleteLike(_id)}>
					<i className="fas fa-thumbs-down"></i>
				</button>
				<a href="/post/" className="btn btn-primary">
					Discussion <span className="comment-count">{comments.length}</span>
				</a>
				{!auth.loading && user === auth.user._id && (
					<button type="button" className="btn btn-danger"  onClick={() => DeletePost(_id)} >
						<i className="fas fa-times" />
					</button>
				)}
			</div>
		</div>
	);
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  AddLike: PropTypes.func.isRequired,
  DeleteLike: PropTypes.func.isRequired,
  DeletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { AddLike, DeleteLike, DeletePost })(PostItem);
