const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const dns = require('dns');
dns.setServers(['8.8.8.8'], ['8.8.4.4'])

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '15mb' }));
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/chat', require('./routes/chatRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));

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