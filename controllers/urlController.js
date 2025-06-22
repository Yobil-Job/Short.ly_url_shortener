const Url = require('./models/Url');

exports.shortenUrl = async (req, res) => {
  try {
    const { originalUrl, customCode } = req.body;
    
    // Validate URL
    if (!originalUrl.match(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/)) {
      return res.status(400).json({ error: 'Invalid URL' });
    }

    // Check if custom code is available
    if (customCode) {
      const existingUrl = await Url.findOne({ shortCode: customCode });
      if (existingUrl) {
        return res.status(400).json({ error: 'Custom code already in use' });
      }
    }

    const shortCode = customCode || await Url.generateShortCode();
    
    const newUrl = new Url({
      originalUrl,
      shortCode,
      isCustom: !!customCode,
      createdBy: req.user?._id || null
    });

    await newUrl.save();

    // For API responses
    if (req.accepts('json')) {
      return res.json({
        originalUrl,
        shortUrl: `${req.protocol}://${req.get('host')}/${shortCode}`,
        shortCode
      });
    }

    // For form submissions
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.redirectUrl = async (req, res) => {
  try {
    const url = await Url.findOneAndUpdate(
      { shortCode: req.params.code },
      { $push: { clicks: { clickedAt: new Date(), ipAddress: req.ip, userAgent: req.get('User-Agent') } } },
      { new: true }
    );

    if (!url) {
      return res.status(404).render('404');
    }

    res.redirect(url.originalUrl);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getUserUrls = async (req, res) => {
  try {
    const urls = await Url.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
    res.render('dashboard', { 
      recentUrls: urls,
      totalLinks: urls.length,
      totalClicks: urls.reduce((sum, url) => sum + url.clicks.length, 0),
      user: req.user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};