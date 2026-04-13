const Booking = require('../models/Booking');
const {adminRequestEmail, userRequestConfirmationEmail, adminStatusUpdateEmail, bookingStatusUpdateEmail} = require('../utils/mailer');

exports.createBooking = async (req, res) => {
  try {
    const bookingPayload = {
      ...req.body,
      user: req.user.id,
    };

    const newBooking = new Booking(bookingPayload);
    const booking = await newBooking.save();
    const populatedBooking = await booking.populate('user', 'email name phone');
    


    // Respond immediately to user - don't wait for emails
    res.json(populatedBooking);


     // ✅ Background email (non-blocking)
    setImmediate(async () => {
      try {
        await adminRequestEmail(populatedBooking);
        await userRequestConfirmationEmail(populatedBooking, true);
       // For agent notification

      } catch (emailError) {
        console.error('Email Error:', emailError.message);
      }
    });

  } catch (err) {
    if (res.headersSent) {
      console.error('createBooking post-response error:', err.message);
      return;
    }
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
    if (res.headersSent) return;
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
    const booking = await Booking.findByIdAndUpdate(req.params.id, updateFields, { new: true }).populate('user', 'email name phone');

    // Respond immediately
    res.json(booking);

    setImmediate(async () => {
      await bookingStatusUpdateEmail(booking);
       await adminStatusUpdateEmail(booking);
    });
  } catch (err) {
    if (res.headersSent) {
      console.error('updateBookingStatus post-response error:', err.message);
      return;
    }
    res.status(500).json({ error: err.message });
  }
};