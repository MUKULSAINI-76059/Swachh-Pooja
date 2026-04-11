const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'], default: 'Pending' },
  reporterName: { type: String, trim: true },
  reporterPhone: { type: String, trim: true },
  address: { type: String },
  wasteImageDataUrl: { type: String },
  assignedAgent: { type: String },
  acceptanceTime: { type: String },
}, { timestamps: true });
module.exports = mongoose.model('Booking', bookingSchema);