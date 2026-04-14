const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Blacklist = require('../models/blacklist');
const { registerEmail, adminNewUserEmail } = require('../utils/mailer');

exports.register = async (req, res) => {
  try {
    const { name, email, password, role, phone } = req.body;
    const existingUser = await User.findOne({email})
    if (existingUser) return res.status(400).json({ msg: 'User already exists' });
    const hashedPassword = await bcrypt.hash(password, 10);
    let user = new User({ name, email, password: hashedPassword, role, phone });
    await user.save();

    const payload = { user: { id: user.id, role: user.role } };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: 3600 });
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'Lax', maxAge: 3600000 });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });

    // Fire-and-forget signup emails so registration response is not blocked.
    Promise.allSettled([
      registerEmail(user.email, user.name),
      adminNewUserEmail(user.email, user.name, user.phone),
    ]).then((results) => {
      results.forEach((result, index) => {
        if (result.status === 'rejected') {
          const label = index === 0 ? 'registerEmail' : 'adminNewUserEmail';
          console.error(`${label} failed:`, result.reason?.message || result.reason);
        }
      });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

    let isMatch = false;
    if (user.password && user.password.startsWith('$2')) {
      isMatch = await bcrypt.compare(password, user.password);
    } else {
      // Legacy support for old plain-text rows, then migrate to hash.
      isMatch = user.password === password;
      if (isMatch) {
        user.password = await bcrypt.hash(password, 10);
        await user.save();
      }
    }

    if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });
    const payload = { user: { id: user.id, role: user.role } };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: 3600 });
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'Lax', maxAge: 3600000 });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.logout = async (req, res) => {
  try {
    const authHeader = req.header('Authorization') || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : '';

    if (!token) {
      return res.status(400).json({ msg: 'Token required for logout' });
    }

    const decoded = jwt.decode(token);
    if (!decoded || !decoded.exp) {
      return res.status(400).json({ msg: 'Invalid token' });
    }

    const expiresAt = new Date(decoded.exp * 1000);
    await Blacklist.create({ token, expiresAt });

    res.json({ msg: 'Logged out successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};