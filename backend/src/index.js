const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const checkBlacklist = require('./middleware/blacklist');
const dns = require('dns');
const cookieParser = require('cookie-parser');
dns.setServers(['8.8.8.8'], ['8.8.4.4'])

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json({ limit: '15mb' }));
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', checkBlacklist, require('./routes/userRoutes'));
app.use('/api/bookings', checkBlacklist, require('./routes/bookingRoutes'));
app.use('/api/payments', checkBlacklist, require('./routes/paymentRoutes'));
app.use('/api/chat', checkBlacklist, require('./routes/chatRoutes'));
app.use('/api/contact', checkBlacklist, require('./routes/contactRoutes'));

// Error Handler
app.use(require('./middleware/errorHandler'));

const BASE_PORT = Number(process.env.PORT || 6006);

const startServer = (port) => {
	const server = app
		.listen(port, () => {
			console.log(`Server running on port ${port}`);
		})
		.on('error', (error) => {
			if (error.code === 'EADDRINUSE') {
				console.error(`Port ${port} is already in use. Stop the existing process and restart backend.`);
				process.exit(1);
			}

			console.error('Failed to start server:', error.message);
			process.exit(1);
		});

	return server;
};

const bootstrap = async () => {
	console.log('Connecting to MongoDB...');
	await connectDB();
	startServer(BASE_PORT);
};

bootstrap().catch((error) => {
	console.error('Startup failed:', error.message);
	process.exit(1);
});