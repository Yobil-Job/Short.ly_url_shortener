const Url = require('../models/url');

// Helper function to process clicks by time
function processClicksByTime(clicks) {
  const timeMap = {};
  
  clicks.forEach(click => {
    const date = new Date(click.clickedAt).toLocaleDateString();
    timeMap[date] = (timeMap[date] || 0) + 1;
  });
  
  return timeMap;
}

// Helper function to process device data
function processDeviceData(clicks) {
  const deviceMap = {};
  
  clicks.forEach(click => {
    let deviceType = 'Unknown';
    
    if (click.userAgent) {
      if (/mobile/i.test(click.userAgent)) {
        deviceType = 'Mobile';
      } else if (/tablet|ipad/i.test(click.userAgent)) {
        deviceType = 'Tablet';
      } else if (/windows|macintosh|linux/i.test(click.userAgent)) {
        deviceType = 'Desktop';
      }
    }
    
    deviceMap[deviceType] = (deviceMap[deviceType] || 0) + 1;
  });
  
  return deviceMap;
}

// Helper function to process geographic data
function processGeoData(clicks) {
  const geoMap = {};
  
  clicks.forEach(click => {
    const location = click.ipLocation || 'Unknown';
    geoMap[location] = (geoMap[location] || 0) + 1;
  });
  
  return geoMap;
}

// Single URL analytics
exports.getUrlAnalytics = async (req, res) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.code });
    
    if (!url) {
      return res.status(404).render('404', { 
        user: req.session.user || null,
        message: 'URL not found' 
      });
    }

    // Process data for charts
    const clickTrends = processClicksByTime(url.clicks);
    const deviceData = processDeviceData(url.clicks);
    const geoData = processGeoData(url.clicks);

    res.render('analytics', {
      user: req.session.user || null,
      url,
      baseUrl: `${req.protocol}://${req.get('host')}`,
      clickTrends,
      deviceData,
      geoData
    });

  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).render('error', {
      user: req.session.user || null,
      message: 'Failed to load analytics',
      error: process.env.NODE_ENV === 'development' ? error : null
    });
  }
};

// All URLs analytics dashboard
exports.getAllAnalytics = async (req, res) => {
  try {
    const urls = await Url.find({ createdBy: req.session.user._id });
    
    // Aggregate data across all URLs
    const allClicks = urls.flatMap(url => url.clicks);
    const clickTrends = processClicksByTime(allClicks);
    const deviceData = processDeviceData(allClicks);
    const geoData = processGeoData(allClicks);

    res.render('all-analytics', {
      user: req.session.user,
      urls,
      baseUrl: `${req.protocol}://${req.get('host')}`,
      clickTrends,
      deviceData,
      geoData,
      totalLinks: urls.length,
      totalClicks: allClicks.length
    });

  } catch (error) {
    console.error('All analytics error:', error);
    res.status(500).render('error', {
      user: req.session.user,
      message: 'Failed to load analytics',
      error: process.env.NODE_ENV === 'development' ? error : null
    });
  }
};