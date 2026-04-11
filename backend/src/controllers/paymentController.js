const Payment = require('../models/Payment');

exports.processPayment = async (req, res) => {
  try {
    const payment = new Payment({ ...req.body, user: req.user.id });
    await payment.save();
    res.json(payment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};