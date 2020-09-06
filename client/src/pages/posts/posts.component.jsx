import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { GetPosts, DeleteLike } from '../../redux/post/post.actions';
import { useEffect } from 'react';
import Spinner from '../../components/spinner/spinner.component';
import PostItem from '../../components/post-item/post-item.component';
import PostForm from '../../components/post-form/post-form.component';

const Posts = ({ post: { posts, loading }, GetPosts }) => {
	useEffect(() => {
		GetPosts();
	}, [GetPosts]);

	return (
		<Fragment>
			{loading ? (
				<Spinner />
			) : (
				<Fragment>
					<h1 className="large text-primary">Posts</h1>
					<p className="lead">
						<i className="fas fa-user"></i> Welcome to the community!
					</p>
					<PostForm/>
					<div className="posts">
						{posts.map(post => <PostItem key={post._id} post={post}/>)}
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

Posts.propTypes = {
	post: PropTypes.object.isRequired,
	GetPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	post: state.post,
});

export default connect(mapStateToProps, { GetPosts })(Posts);
