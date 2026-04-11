const Booking = require('../models/Booking');
const User = require('../models/User');
const { sendEmail, buildEmailHtml } = require('../utils/mailer');

exports.createBooking = async (req, res) => {
  try {
    const bookingPayload = {
      ...req.body,
      user: req.user.id,
    };

    const newBooking = new Booking(bookingPayload);
    const booking = await newBooking.save();

    // Respond immediately to user - don't wait for emails
    res.json(booking);

    // Send emails in background (non-blocking)
    const user = await User.findById(req.user.id).select('name email phone');
    const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;
    const websiteUrl = process.env.FRONTEND_URL || process.env.WEBSITE_URL || 'http://localhost:5173';

    if (user?.email) {
      sendEmail({
        to: user.email,
        subject: 'Pickup Request Received',
        text: `Hi ${user.name || 'User'}, your pickup request has been received. Booking ID: ${booking._id}.`,
        html: buildEmailHtml({
          title: 'Pickup Request Received',
          greeting: `Hi ${user.name || 'User'},`,
          paragraphs: [
            'Your pickup request has been received successfully.',
            'Our team will contact you soon with next steps.',
          ],
          details: [
            { label: 'Booking ID', value: String(booking._id) },
            { label: 'Status', value: booking.status },
            { label: 'Date', value: booking.date ? new Date(booking.date).toLocaleString() : '-' },
            { label: 'Address', value: booking.address || '-' },
            { label: 'Waste Image', value: booking.wasteImageDataUrl ? 'Attached' : '-' },
          ],
          ctaButton: {  label: 'View Booking', url: `${websiteUrl}` }
        }),
      }).catch(() => {}); // Silently handle email errors
    }

    if (adminEmail) {
      sendEmail({
        to: adminEmail,
        subject: 'New Pickup Request Submitted',
        text: `New booking request from ${user?.name || 'User'} (${user?.email || '-'})`,
        html: buildEmailHtml({
          title: 'New Pickup Request Submitted',
          greeting: 'Hello Admin,',
          paragraphs: ['A new pickup request has been submitted on SwachhPooja.'],
          details: [
            { label: 'User', value: user?.name || '-' },
            { label: 'Email', value: user?.email || '-' },
            { label: 'Phone', value: user?.phone || '-' },
            { label: 'Booking ID', value: String(booking._id) },
            { label: 'Status', value: booking.status },
            { label: 'Date', value: booking.date ? new Date(booking.date).toLocaleString() : '-' },
            { label: 'Address', value: booking.address || '-' },
            { label: 'Waste Image', value: booking.wasteImageDataUrl ? 'Attached' : '-' },
          ],
        }),
      }).catch(() => {}); // Silently handle email errors
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getBookings = async (req, res) => {
  try {
    let bookings;
    if (req.user.role === 'Admin') {
      bookings = await Booking.find().populate('user', 'email name phone');
    } else {
      bookings = await Booking.find({ user: req.user.id }).populate('user', 'email name phone');
    }
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status, assignedAgent, acceptanceTime } = req.body;
    let updateFields = {};
    if (status) updateFields.status = status;
    if (assignedAgent) updateFields.assignedAgent = assignedAgent;
    if (acceptanceTime) updateFields.acceptanceTime = acceptanceTime;
    const websiteUrl = process.env.FRONTEND_URL || process.env.WEBSITE_URL || 'http://localhost:5173';

    const existingBooking = await Booking.findById(req.params.id).select('status');

    const booking = await Booking.findByIdAndUpdate(req.params.id, updateFields, { new: true }).populate('user', 'email name phone');

    const isCompletedUpdate =
      typeof status === 'string' &&
      status.toLowerCase() === 'completed' &&
      existingBooking &&
      existingBooking.status !== 'Completed';

    // Respond immediately - send completion email in background
    res.json(booking);

    if (isCompletedUpdate && booking?.user?.email) {
      sendEmail({
        to: booking.user.email,
        subject: 'Your Pickup Request is Completed',
        text: `Hi ${booking.user.name || 'User'}, your pickup request ${booking._id} is now completed.`,
        html: buildEmailHtml({
          title: 'Pickup Request Completed',
          greeting: `Hi ${booking.user.name || 'User'},`,
          paragraphs: [
            'Great news! Your pickup request has been completed successfully.',
            'Thank you for using SwachhPooja and helping keep the environment clean.',
          ],
          details: [
            { label: 'Booking ID', value: String(booking._id) },
            { label: 'Final Status', value: booking.status },
            { label: 'Date', value: booking.date ? new Date(booking.date).toLocaleString() : '-' },
            { label: 'Address', value: booking.address || '-' },
          ],
          ctaButton: {
            label: 'Visit Website',
            url: websiteUrl,
          },
        }),
      }).catch(() => {}); // Silently handle email errors
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};