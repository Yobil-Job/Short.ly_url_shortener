const express = require('express');
const router = express.Router();
const Url = require('../models/url');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

// @desc    Login/Landing page
// @route   GET /
router.get('/', ensureGuest, (req, res) => {
    res.redirect('/login');
});

// @desc    Dashboard
// @route   GET /dashboard
router.get('/dashboard', ensureAuth, async (req, res) => {
    try {
      const urls = await Url.find({ createdBy: req.session.user._id }).sort({ createdAt: -1 });
      
      res.render('dashboard', {
        user: req.session.user,
        baseUrl: `${req.protocol}://${req.get('host')}`,
        recentUrls: urls.slice(0, 5),
        totalLinks: urls.length,
        totalClicks: urls.reduce((sum, url) => sum + url.clicks.length, 0),
        mostPopular: [...urls].sort((a, b) => b.clicks.length - a.clicks.length)[0]
      });
    } catch (err) {
      console.error('Dashboard error:', err);
      res.status(500).render('error', { 
        message: 'Failed to load dashboard',
        error: err,
        user: req.session.user
      });
    }
});


// @desc    My Links page
// @route   GET /my-links
router.get('/my-links', ensureAuth, async (req, res) => {
    try {
      const urls = await Url.find({ createdBy: req.session.user._id }).sort({ createdAt: -1 });
      
      res.render('my-links', {
        user: req.session.user,
        urls,
        baseUrl: `${req.protocol}://${req.get('host')}`,
        title: 'My Links'
      });
    } catch (error) {
      console.error('My links error:', error);
      res.status(500).render('error', {
        user: req.session.user,
        message: 'Failed to load your links',
        error: process.env.NODE_ENV === 'development' ? error : null
      });
    }
});


// @desc    Developer API page
// @route   GET /developer
router.get('/developer', ensureAuth, (req, res) => {
    res.render('developer', {
      user: req.session.user,
      title: 'Developer'
    });
});

module.exports = router; 