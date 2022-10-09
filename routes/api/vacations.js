const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Vacation = require('../../models/Vacation');
const User = require('../../models/User');
const checkObjectId = require('../../middleware/checkObjectId');

// @route    POST api/posts
// @desc     Create a post
// @access   Private
router.post(
  '/',
  auth,
  check('text', 'Text is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newVacation = new Vacation({
        text: req.body.text,
        name: user.name,
        user: req.user.id
      });

      const vacation = await newVacation.save();

      res.json(vacation);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/posts
// @desc     Get all posts
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const vacation = await Vacation.find().sort({ date: -1 }); //-1 does the most recent first
    res.json(vacations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/posts/:id
// @desc     Get post by ID
// @access   Private
router.get('/:id', auth, checkObjectId('id'), async (req, res) => {
  try {
    const vacation = await Vacation.findById(req.params.id);

    if (!vacation) {
      return res.status(404).json({ msg: 'Vacation not found' });
    }

    res.json(vacation);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/posts/:id
// @desc     Delete a post
// @access   Private
router.delete('/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const vacation = await Vacation.findById(req.params.id);

    if (!vacation) {
      return res.status(404).json({ msg: 'Vacation not found' });
    }

    // Check user
    if (vacation.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await vacation.remove();

    res.json({ msg: 'Vacation removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});


// @route    POST api/posts/comment/:id
// @desc     Comment on a post
// @access   Private
router.post(
  '/comment/:id',
  auth,
  checkObjectId('id'),
  check('text', 'Text is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const vacation = await Vacation.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        user: req.user.id
      };

      vacation.comments.unshift(newComment);

      await vacation.save();

      res.json(vacation.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/posts/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const vacation = await Vacation.findById(req.params.id);

    // Pull out comment
    const comment = vacation.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }
    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    vacation.comments = vacation.comments.filter(
      ({ id }) => id !== req.params.comment_id
    );

    await Vacation.save();

    return res.json(vacation.comments);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
