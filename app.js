require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const Url = require('./models/url');

// --- Route Imports ---
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/authRoutes');
const urlRoutes = require('./routes/urlRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// --- Middleware ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'a-very-strong-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,
    maxAge: 24 * 60 * 60 * 1000
  }
}));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// --- Database Connection ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Successfully connected to MongoDB Atlas");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// --- Route Definitions ---
app.use('/', indexRoutes);
app.use('/', authRoutes);
app.use('/', urlRoutes);
app.use('/analytics', analyticsRoutes);


// --- Catch-all Redirect ---
// This MUST be loaded after all other app routes
app.get('/:code', async (req, res, next) => {
  try {
    const url = await Url.findOneAndUpdate(
      { shortCode: req.params.code },
      { $push: { clicks: { clickedAt: new Date(), ipAddress: req.ip, userAgent: req.get('User-Agent') } } },
      { new: true }
    );

    if (!url) {
      // If no URL is found, it's a 404
      return res.status(404).render('404', { 
        user: req.session.user || null, 
        title: 'Page Not Found' 
      });
    }

    // Redirect to the original URL
    res.redirect(url.originalUrl.includes('://') ? url.originalUrl : `https://${url.originalUrl}`);

  } catch (error) {
    console.error("Redirect error:", error);
    res.status(500).render('error', {
      user: req.session.user || null,
      message: 'Error redirecting URL'
    });
  }
});


// --- Error Handlers ---
// 404 handler for any other unhandled routes
app.use((req, res) => {
  res.status(404).render('404', { 
    user: req.session.user || null, 
    title: 'Page Not Found' 
  });
});

// General error handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).render('error', {
    user: req.session?.user || null,
    title: 'Error',
    message: 'Something went wrong on our end!',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

