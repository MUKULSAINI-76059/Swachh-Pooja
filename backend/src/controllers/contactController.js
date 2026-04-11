const ContactMessage = require('../models/ContactMessage');
const { sendEmail, buildEmailHtml } = require('../utils/mailer');

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

    const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;
    if (adminEmail) {
      sendEmail({
        to: adminEmail,
        subject: 'New Contact Message Received',
        text: `New message from ${saved.name} (${saved.email})`,
        html: buildEmailHtml({
          title: 'New Contact Message',
          greeting: 'Hello Admin,',
          paragraphs: ['A new contact form message was submitted on SwachhPooja.'],
          details: [
            { label: 'Name', value: saved.name },
            { label: 'Email', value: saved.email },
            { label: 'Message', value: saved.message },
            { label: 'Submitted At', value: new Date(saved.createdAt).toLocaleString() },
          ],
        }),
      }).catch(() => {});
    }

    return res.status(201).json({ success: true, message: 'Message submitted successfully.' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
