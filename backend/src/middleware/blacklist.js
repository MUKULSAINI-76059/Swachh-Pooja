const Blacklist = require('../models/blacklist');

const checkBlacklist = async (req, res, next) => {
 try{
  const authHeader = req.headers.authorization || '';
  const token = req.cookies?.token || (authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : '');

  if (!token) return next();

  const blocked = await Blacklist.findOne({ token });

  if (blocked) {
    return res.status(401).json({
      msg: "Session expired. Please login again."
    });
  }

  next();
}catch(err){
  console.error('Blacklist Check Error:', err.message);
  res.status(500).json({ error: 'Internal Server Error' }); 
}
};

module.exports = checkBlacklist;