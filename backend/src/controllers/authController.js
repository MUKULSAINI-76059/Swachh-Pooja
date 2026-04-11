const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { sendEmail, buildEmailHtml } = require('../utils/mailer');

exports.register = async (req, res) => {
  try {
    const { name, email, password, role, phone } = req.body;
    const existingUser = await User.findOne({email})
    if (existingUser) return res.status(400).json({ msg: 'User already exists' });
    let user = new User({ name, email, password, role, phone });
    await user.save();

    const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;
    const websiteUrl = process.env.FRONTEND_URL || process.env.WEBSITE_URL || 'http://localhost:5173';

    await sendEmail({
      to: email,
      subject: 'Welcome to SwachhPooja',
      text: `Hi ${name}, your account has been created successfully. You can now report puja waste pickups.`,
      html: buildEmailHtml({
        title: 'Welcome to SwachhPooja',
        greeting: `Hi ${name},`,
        paragraphs: [
          'Your account has been created successfully.',
          'You can now log in and submit puja waste pickup requests.',
          'Thank you for helping us keep streets clean and green.',
        ],
        ctaButton: {
          label: 'Visit SwachhPooja Website',
          url: websiteUrl,
        },
      }),
    });

    if (adminEmail) {
      await sendEmail({
        to: adminEmail,
        subject: 'New User Registration',
        text: `A new user registered: ${name} (${email})`,
        html: buildEmailHtml({
          title: 'New User Registration',
          greeting: 'Hello Admin,',
          paragraphs: ['A new user has registered on SwachhPooja.'],
          details: [
            { label: 'Name', value: name },
            { label: 'Email', value: email },
            { label: 'Phone', value: phone || '-' },
          ],
        }),
      });
    }

    const payload = { user: { id: user.id, role: user.role } };
    jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user || user.password !== password) return res.status(400).json({ msg: 'Invalid Credentials' });
    const payload = { user: { id: user.id, role: user.role } };
    jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};