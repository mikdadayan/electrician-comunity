const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");
const isAuth = require("../../middlewares/is-auth");

// // @route   GET api/users
// // @desc    Test route
// // @access  Public
// router.get("/", (req, res, next) => {
//   res.send("User/Auth route!");
// });

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get("/", isAuth, async (req, res, next) => {
  // console.log("^^^^^^^^");
  try {
    // console.log("%%%%%%%5");
    const user = await User.findById({ _id: req.user.id }).select("name email");
    res.status(200).json({
      user: {
        name: user.name,
        email: user.email,
      },
    });
    console.log(user);
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
  res.send("Auth route!");
});

// @route   Post api/auth
// @desc    Register route
// @access  Public
router.post(
  "/signup",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please Include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with minimum 6 characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        res.status(400).json({ errors: [{ msg: "Email already exists" }] });
      }

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      user = new User({
        name,
        email,
        password,
        avatar,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

// @route   Post api/auth
// @desc    Authenticate user & get route
// @access  Public
router.post(
  "/login",
  [
    check("email", "Please Include a valid email").isEmail(),
    check("password", "Password is required").isLength({ min: 6 }),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      console.log("**********");

      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const payload = {
        user: {
          email: user.email,
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) {
            throw err;
          }
          return res.status(202).json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

module.exports = router;
