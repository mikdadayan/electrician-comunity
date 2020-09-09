import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import Spinner from '../spinner/spinner.component';
import { connect } from 'react-redux';
import { DeleteComment } from '../../redux/post/post.actions';

const PostComment = ({ comment, auth, postId, DeleteComment }) => {
	return (
		<Fragment>
			{!comment ? (
				<Spinner />
			) : (
				<div className="post bg-white p-1 my-1">
					<div>
						<Link to={`/profile/${comment.user}`}>
							<img className="round-img" src={comment.avatar} alt="" />
							<h4>{comment.name}</h4>
						</Link>
					</div>
					<div>
						<p className="my-1">{comment.text}</p>
						<p className="post-date">
							Posted on <Moment format="YYYY/MM/DD">{comment.date}</Moment>
						</p>
					</div>
					{!auth.loading && comment.user === auth.user._id && (
						<button
							type="button"
							className="btn btn-danger"
							onClick={() => DeleteComment(comment._id, postId)}
						>
							<i className="fas fa-times" />
						</button>
					)}
				</div>
			)}
		</Fragment>
	);
};

PostComment.propTypes = {
	comment: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { DeleteComment })(PostComment);
