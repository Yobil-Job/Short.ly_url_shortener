module.exports = {
  ensureAuth: function (req, res, next) {
    if (req.session.user) {
      return next();
    } else {
      res.redirect('/login');
    }
  },
  ensureGuest: function (req, res, next) {
    if (req.session.user) {
      res.redirect('/dashboard');
    } else {
      return next();
    }
  },
}; 