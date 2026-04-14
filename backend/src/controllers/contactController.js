const ContactMessage = require('../models/ContactMessage');
const { adminContactEmail, userContactConfirmationEmail } = require('../utils/mailer');

exports.createContactMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    const saved = await ContactMessage.create({
      name: String(name).trim(),
      email: String(email).trim(),
      message: String(message).trim(),
    });

    Promise.allSettled([
      adminContactEmail(saved),
      userContactConfirmationEmail(saved),
    ]).then((results) => {
      results.forEach((result, index) => {
        if (result.status === 'rejected') {
          const label = index === 0 ? 'adminContactEmail' : 'userContactConfirmationEmail';
          console.error(`${label} failed:`, result.reason?.message || result.reason);
        }
      });
    });

    return res.status(201).json({ success: true, message: 'Message submitted successfully.' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
