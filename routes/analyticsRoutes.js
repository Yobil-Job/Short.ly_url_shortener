const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const { ensureAuth } = require('../middleware/auth');

// @desc    Show all URLs analytics dashboard
// @route   GET /analytics/all
router.get('/all', ensureAuth, analyticsController.getAllAnalytics);

// @desc    Show single URL analytics
// @route   GET /analytics/:code
router.get('/:code', ensureAuth, analyticsController.getUrlAnalytics);

module.exports = router;


