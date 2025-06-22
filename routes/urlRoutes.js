const express = require('express');
const router = express.Router();
const Url = require('../models/url');

// @desc    Create new short URL
// @route   POST /shorten
router.post('/shorten', async (req, res) => {
    try {
      const { originalUrl, customCode } = req.body;
      const hasCustomCode = Boolean(customCode);
      
      if (!originalUrl) {
        return res.status(400).json({ error: 'Original URL is required' });
      }
  
      // Basic URL validation
      try {
        new URL(originalUrl);
      } catch (err) {
        return res.status(400).json({ error: 'Invalid URL format' });
      }
  
      let shortCode = customCode || await Url.generateShortCode();
      
      if (hasCustomCode) {
        const exists = await Url.findOne({ shortCode });
        if (exists) {
          return res.status(400).json({ error: 'That custom alias is already in use.' });
        }
      }
  
      const newUrl = new Url({
        originalUrl,
        shortCode,
        isCustom: hasCustomCode,
        createdBy: req.session.user?._id
      });
  
      await newUrl.save();
  
      res.status(201).json({
        success: true,
        originalUrl,
        shortUrl: `${req.protocol}://${req.get('host')}/${shortCode}`,
        shortCode,
        isCustom: hasCustomCode
      });
  
    } catch (error) {
      console.error("Shortening error:", error);
      res.status(500).json({ error: 'Internal server error. Please try again.' });
    }
});

module.exports = router;