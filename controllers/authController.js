const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.getRegister = (req, res) => {
  res.render('auth/register', { user: null, title: 'Register' });
};

exports.postRegister = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).render('auth/register', { 
        error: 'Email already in use',
        email,
        user: null
      });
    }

    const user = new User({ email, password });
    await user.save();

    req.session.user = user;
    req.session.save(err => {
      if (err) {
        console.error('Session save error on register:', err);
        return res.status(500).render('auth/register', { 
          error: 'Registration failed',
          user: null
        });
      }
      res.redirect('/');
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).render('auth/register', { 
      error: 'Registration failed',
      user: null
    });
  }
};

exports.getLogin = (req, res) => {
  res.render('auth/login', { user: null, title: 'Login' });
};

exports.postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).render('auth/login', { 
        error: 'Invalid credentials',
        email,
        user: null
      });
    }

    req.session.user = user;
    req.session.save(err => {
      if (err) {
        console.error('Session save error on login:', err);
        return res.status(500).render('auth/login', { 
          error: 'Login failed',
          user: null
        });
      }
      res.redirect('/');
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).render('auth/login', { 
      error: 'Login failed',
      user: null
    });
  }
};

exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error(err);
      return res.redirect('/');
    }
    res.clearCookie('connect.sid');
    res.redirect('/login');
  });
};