# SwachhPooja Backend

Express + MongoDB backend for the SwachhPooja application.

## Features

- Authentication and user management
- Booking and pickup request APIs
- Contact message handling
- Email notifications for booking and contact flows
- Admin-friendly booking fetch and status update endpoints

## Requirements

- Node.js 18+
- npm
- MongoDB connection string

## Setup

```bash
npm install
```

Create a `.env` file in the backend root:

```env
PORT=6006
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
ADMIN_EMAIL=admin@example.com
EMAIL_USER=your_email@example.com
CLIENT_ID=your_oauth_client_id
CLIENT_SECRET=your_oauth_client_secret
REFRESH_TOKEN=your_oauth_refresh_token
```

## Scripts

```bash
npm run dev
npm start
```

## Notes

- Booking images are stored directly in MongoDB as base64 data URLs in the booking document.
- The backend serves the booking APIs on the port defined by `PORT`, defaulting to `6006`.
- If port `6006` is already in use, stop the existing Node process before restarting the backend.