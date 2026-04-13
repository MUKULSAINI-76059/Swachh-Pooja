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

    setImmediate( async () => {
     await adminContactEmail(saved);
    await userContactConfirmationEmail(saved);
  });

    return res.status(201).json({ success: true, message: 'Message submitted successfully.' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
