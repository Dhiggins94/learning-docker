const protect = (req, res, next) => {
  const { user } = req.session
  if (!user) {
    return res.status(401).json({status: 'fail', message: 'unauthorized'})
  }

  req.user = user;
  next()
  // next sends it thru the next middleware within the stack if user exist
}

module.exports = protect