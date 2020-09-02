const express = require('express');
const router = express.Router();
const config = require('config');
const { check, validationResult } = require('express-validator');

const auth = require('../../middlewares/is-auth');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const request = require('request');

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Profile Works' }));

// @route   GET api/profile/myprofile
// @desc    Get my profile
// @access  Private
router.get('/myprofile', auth, async (req, res, next) => {
	try {
		const profile = await Profile.findOne({
			user: req.user.id,
		}).populate('user', ['name', 'avatar']);
		if (!profile) {
			return res.status(400).json({
				msg: 'There is not profile for this user',
			});
		}
		// console.log(profsile);
		return res.status(200).json({
			msg: 'My Profile Endpoint',
			profile: profile,
			description: {
				method: 'GET',
				path: '/api/profile/myprofile',
				info: 'For get  all profiles GET /api/profile/profiles',
			},
		});
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error...');
	}
	res.send('Profile route!');
});

// @route   POST api/profile
// @desc    Post add or update profile
// @access  Private

router.post(
	'/',
	[
		auth,
		[check('status', 'Status is required').not().isEmpty(), check('skills', 'Skills is required').not().isEmpty()],
	],
	async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(401).json({
				errors: errors.array(),
			});
		}
		const {
			company,
			location,
			status,
			skills,
			bio,
			website,
			youtube,
			twitter,
			facebook,
			instagram,
			linkedin,
		} = req.body;

		const profileFields = {};

		profileFields.user = req.user.id;

		if (company) profileFields.company = company;
		if (website) profileFields.website = website;
		if (location) profileFields.location = location;
		if (status) profileFields.status = status;
		if (bio) profileFields.bio = bio;
		if (skills) {
			profileFields.skills = skills.split(',').map((skill) => skill.trim());
		}

		profileFields.social = {};

		if (youtube) profileFields.social.youtube = youtube;
		if (twitter) profileFields.social.twitter = twitter;
		if (facebook) profileFields.social.facebook = facebook;
		if (instagram) profileFields.social.instagram = instagram;
		if (linkedin) profileFields.social.linkedin = linkedin;

		try {
      let profile = await Profile.findOne({ user: req.user.id });
			if (profile) {
        console.log(req.user.id)
				profile = await Profile.findOneAndUpdate(
					{ user: req.user.id },
					{ $set: profileFields },
					{ new: true }
        );
				return res.status(202).json({
					msg: 'Changes on profile executed.',
					profile: profile,
				});
			}
			profile = new Profile(profileFields);
			await profile.save();
			res.status(200).json({
				msg: 'Profile is created',
				profile: profileFields,
			});
		} catch (error) {
			console.error(error.message);
			res.status(500).json({
        errors: [
          {msg: "Server error..."},
        ]
			});
		}
	}
);

// @route   GET api/profile/profiles
// @desc    Get all profiles
// @access  Public
router.get('/profiles', async (req, res, next) => {
	try {
		const profiles = await Profile.find().populate('user', ['name', 'avatar']).exec();
		console.log(profiles);
		if (profiles.length === 0) {
			return res.status(400).json({
				msg: 'No profiles exists yet',
			});
		}

		return res.status(200).json({
			msg: 'Geting all users profiles',
			profiles: profiles,
			description: {
				method: 'GET',
				path: '/api/profile/profiles',
				info: 'For get myprofile GET /api/profile/myprofile',
			},
		});
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ error: 'Server Error...' });
	}
});

// @route   GET api/profile/:userId
// @desc    Get user profile by userId
// @access  Public
router.get('/:userId', async (req, res, next) => {
	try {
		const profile = await Profile.findOne({ user: req.params.userId }).populate('user', ['name', 'avatar']).exec();
		console.log(profile);
		if (!profile) {
			return res.status(400).json({
				msg: 'Profile not found.',
			});
		}

		return res.status(200).json({
			msg: 'Geting user profile',
			profile: profile,
			description: {
				method: 'GET',
				path: '/api/profile/:userId',
				info: 'For all users profiles GET /api/profile/profiles',
			},
		});
	} catch (error) {
		console.error('%%%%%%%%%%%%%%%%%%%%%%%', error);
		if (error.kind == 'ObjectId') {
			return res.status(400).json({ msg: 'Profile not found.' });
		}
		res.status(500).json({ error: 'Server Error...' });
	}
});

// @route   DELETE api/profile
// @desc    DELETE user and user profile
// @access  Private
router.delete('/delete', auth, async (req, res, next) => {
	try {
		await Profile.findOneAndDelete({ user: req.user.id });
		await User.findByIdAndDelete(req.user.id);
		res.status(200).json({
			msg: 'User deleted',
		});
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ error: 'Server Error...' });
	}
});

// @route   PUT api/profile/experience
// @desc    Add to user profile work experience
// @access  Private
router.put(
	'/experience',
	[
		auth,
		[
			check('title', 'Status is required').not().isEmpty(),
			check('company', 'Skills is required').not().isEmpty(),
			check('from', 'Skills is required').not().isEmpty(),
		],
	],
	async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(401).json({
				errors: errors.array(),
			});
		}
		const { title, company, location, from, to, current, description } = req.body;
		const newExp = {
			title,
			company,
			location,
			from,
			to,
			current,
			description,
		};

		try {
			const profile = await Profile.findOne({ user: req.user.id });
			if (!profile) {
				return res.status(400).json({
					msg: 'Profile not found.',
				});
			}
			profile.experience.unshift(newExp);
			await profile.save();
			res.status(200).json({
				msg: 'Added new experience',
				experience: profile.experience,
			});
		} catch (error) {
			console.error(error.message);
			res.status(500).json({
				error: error.message,
			});
		}
	}
);

// @route   DELETE api/profile/experience/expId
// @desc    DELETE user profile work experience
// @access  Private
router.delete('/experience/:expId', auth, async (req, res, next) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id });
		const updatedExp = profile.experience.filter((experience) => experience._id != req.params.expId);
		console.log(updatedExp);
		profile.experience = updatedExp;
		await profile.save();
		res.status(200).json({
			msg: 'experience item removed',
			profile: profile,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: error.message,
		});
	}
});

// @route   PUT api/profile/education
// @desc    Add to user profile education
// @access  Private
router.put(
	'/education',
	[
		[
			check('school').not().isEmpty(),
			check('degree').not().isEmpty(),
			check('fieldofstudy').not().isEmpty(),
			check('from').not().isEmpty(),
		],
		auth,
	],
	async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(401).json({
				errors: errors.array(),
			});
		}

		const { school, degree, fieldofstudy, from, to, current, description } = req.body;

		const newEdu = {
			school,
			degree,
			fieldofstudy,
			from,
			to,
			current,
			description,
		};

		try {
			const profile = await Profile.findOne({ user: req.user.id });
			if (!profile) {
				return res.status(400).json({
					msg: 'Profile not found.',
				});
			}
			profile.education.unshift(newEdu);
			await profile.save();
			res.status(200).json({
				msg: 'Added new education item',
				education: profile.education,
			});
		} catch (error) {
			console.error(error.message);
			res.status(500).json({
				error: 'Server error...',
			});
		}
	}
);

// @route   DELETE api/profile/education/eduId
// @desc    DELETE user profile education
// @access  Private
router.delete('/education/:eduId', auth, async (req, res, next) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id });
		const updatedEdu = profile.education.filter((education) => education._id != req.params.eduId);
		// console.log(updatedEdu);
		profile.education = updatedEdu;
		await profile.save();
		res.status(200).json({
			msg: 'education item removed',
			profile: profile,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: error.message,
		});
	}
});

// @route   GET api/profile/github/:username
// @desc    GET github repository by given username
// @access  Public
// router.get('/github/:username', (req, res, next) => {
//   try {
//     const options = {
//       uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubClientSecret')}`,
//       method: 'GET',
//       headers: {"user-agent": "node.js"}
//     };
//     console.log("&&&&&&&&" )

//     request(options, (error, response, body) => {
//       console.log("&&&&&&&&" ,error)
//       if(error) throw error;
//       if(response.statusCode !== 200){
//         return res.status(404).json({msg: 'No github profile found.'});
//       }
//       res.status(200).json(JSON.parse(body));
//     })
//   } catch(error) {
//     console.error(error);
//     res.status(500).json({
//       error: 'Server Error...'
//     })
//   }
// })

module.exports = router;
