import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { connect } from "react-redux";
import { GetPost } from "../../redux/post/post.actions";
import { withRouter, Link } from "react-router-dom";
import Spinner from "../../components/spinner/spinner.component";
import PostComment from "../../components/post-comment/post-comment.component";
import CommentForm from "../../components/comment-form/comment-form.component";

const Post = ({
  GetPost,
  post: { post, loading },
  match: {
    params: { postId },
  },
}) => {
  useEffect(() => {
    GetPost(postId);
  }, []);
  return (
    <Fragment>
      {loading || post === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/posts" className="btn">
            Back To Posts
          </Link>
          <div className="post bg-white p-1 my-1">
            <div>
              <Link to={`/engineers/${post.user}`}>
                <img className="round-img" src={post.avatar} alt="" />
                <h4>{post.name}</h4>
              </Link>
            </div>
            <div>
              <p className="my-1">{post.text}</p>
            </div>
          </div>

          <CommentForm postId={postId} />

          <div className="comments">
            {post.comments.map((comment) => (
              <PostComment
                key={comment._id}
                postId={postId}
                comment={comment}
              />
            ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Post.propTypes = {};

const mapStateToProps = (state) => ({
  post: state.post,
});
export default connect(mapStateToProps, { GetPost })(withRouter(Post));
