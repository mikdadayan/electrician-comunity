import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { GetPosts } from '../../redux/post/post.actions';
import { useEffect } from 'react';
import Spinner from '../../components/spinner/spinner.component';
import PostItem from '../../components/post-item/post-item.component';

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
					<h1 class="large text-primary">Posts</h1>
					<p class="lead">
						<i class="fas fa-user"></i> Welcome to the community!
					</p>

					<div class="post-form">
						<div class="bg-primary p">
							<h3>Say Something...</h3>
						</div>
						<form class="form my-1">
							<textarea name="text" cols="30" rows="5" placeholder="Create a post" required></textarea>
							<input type="submit" class="btn btn-dark my-1" value="Submit" />
						</form>
					</div>

					<div class="posts">
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
