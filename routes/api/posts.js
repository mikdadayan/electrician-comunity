const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');
const auth = require('../../middlewares/is-auth');

// @route   GET api/posts
// @desc    Test route
// @access  Public
// router.get('/', (req, res, next) => {
// 	res.send('Posts route!');
// });

// @route   POST api/posts
// @desc    Create post route
// @access  Private
router.post('/', [auth, check('text', 'Text is required').not().isEmpty()], async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(401).json({
			errors: errors.array(),
		});
	}
	const { text } = req.body;
	try {
		const user = await User.findById(req.user.id).select('-password');

		const newPost = new Post({
			user: req.user.id,
			text: text,
			name: user.name,
			avatar: user.avatar,
		});

		const post = await newPost.save();
		res.status(200).json({
			msg: 'Post created',
			post: post,
		});
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ error: 'Server Error...' });
	}
});

// @route   GET api/posts
// @desc    Get all posts
// @access  Private
router.get('/', auth, async (req, res, next) => {
	try {
		const posts = await Post.find().sort({ date: -1 });
		console.log(posts);
		res.status(200).json({
			msg: 'All posts fetched',
			posts: posts,
		});
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ error: 'Server Error...' });
	}
});

// @route   GET api/posts/:postId
// @desc    Get a post
// @access  Private
router.get('/:postId', auth, async (req, res, next) => {
	try {
		const post = await Post.findById(req.params.postId);

		if (!post) {
			return res.status(404).json({
				msg: 'Post not found.',
			});
		}
		res.status(200).json({
			msg: 'Post fetched.',
			post: post,
		});
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ error: 'Server Error...' });
	}
});

// @route   DELETE api/posts/:postId
// @desc    Delete a posts
// @access  Private
router.delete('/:postId', auth, async (req, res, next) => {
	try {
		const post = await Post.findById(req.params.postId);

		if (!post) {
			return res.status(404).json({
				error: {
					msg: 'Post not found',
				},
			});
		}

		if (post.user.toString() !== req.user.id.toString()) {
			return res.status(401).json({ error: { msg: 'Not authorized' } });
		}

		await post.remove();

		res.status(200).json({
			msg: 'Post deleted.',
		});
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ error: 'Server Error...' });
	}
});

// @route   PUT api/posts/like/:postId
// @desc    Add a like to post
// @access  Private
router.put('/like/:postId', auth, async (req, res, next) => {
	try {
		const post = await Post.findById(req.params.postId);
		if (post.likes.filter((like) => like.user == req.user.id).length > 0) {
			return res.status(400).json({
				error: {
					msg: 'Post already liked.',
				},
			});
		}

		post.likes.unshift({ user: req.user.id });
		await post.save();
		res.status(200).json({
			likes: post.likes,
		});
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ error: 'Server Error...' });
	}
});

// @route   DELETE api/posts/unlike/:postId
// @desc    Delete a like from post
// @access  Private
router.delete('/unlike/:postId', auth, async (req, res, next) => {
	try {
		const post = await Post.findById(req.params.postId);
		if (!post.likes.find((like) => like.user.toString() === req.user.id.toString())) {
			return res.status(401).json({
				msg: 'Post has not yet liked.',
			});
		}
		const newLikes = post.likes.filter((like) => like.user.toString() !== req.user.id.toString());
		console.log(newLikes);
		post.likes = newLikes;

		await post.save();

		res.status(200).json({
			msg: 'Like removed.',
			likes: post.likes,
		});
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ error: 'Server Error...' });
	}
});

// @route   PUT api/posts/comment/:postId
// @desc    Add a comment to post
// @access  Private
router.put(
	'/comment/:postId',
	[auth, check('comment', 'Comment text cannot be empty.').not().isEmpty()],
	async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(401).json({
				errors: errors.array(),
			});
		}
		const { comment } = req.body;
		try {
			const user = await User.findById(req.user.id).sort('-password');
			const post = await Post.findById(req.params.postId);

			const newComment = {
				user: req.user.id,
				text: comment,
				name: user.name,
				avatar: user.avatar,
			};

			post.comments.unshift(newComment);
			await post.save();
			res.status(200).json({
				comments: post.comments,
			});
		} catch (error) {
			console.error(error.message);
			res.status(500).json({ error: 'Server Error...' });
		}
	}
);

// @route   DELETE api/posts/comment/:postId
// @desc    Delete a comment from post
// @access  Private
router.delete('/comment/:postId/:comId', auth, async (req, res, next) => {
	try {
		const post = await Post.findById(req.params.postId);
		const comment = post.comments.find((comment) => comment.id === req.params.comId);
		if (!comment) {
			return res.status(404).json({
				error: {
					msg: 'Comment doesnt exists.',
				},
			});
		}

		if (comment.user.toString() !== req.user.id) {
			return res.status(401).json({
				error: {
					msg: 'Not authorized.',
				},
			});
		}
		post.comments = post.comments.filter((com) => com.id.toString() !== comment.id.toString());

		const newPost = await post.save();
		res.status(200).json({
			msg: "Comment deleted.",
			post: newPost
		})
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ error: 'Server Error...' });
	}
});

module.exports = router;
