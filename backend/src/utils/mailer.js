const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

if (transporter) {
  transporter.verify((error) => {
    if (error) {
      console.error('Error connecting to email server:', error.message);
    } else {
      console.log('Email server is ready to send messages');
    }
  });
} else {
  console.warn('Email transporter not configured. Set EMAIL_USER, CLIENT_ID, CLIENT_SECRET, and REFRESH_TOKEN.');
}

const sendEmail = async ({ to, subject, text, html }) => {
   console.log("📧 Email function called!");  // ADD KARO
  console.log("📧 Sending to:", to);   
  try {
    if (!transporter) {
      return { success: false, reason: 'email_not_configured' };
    }

    const info = await transporter.sendMail({
      from: `"SwachhPooja" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log(`Email sent to ${to}: ${info.messageId}`);

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error.message);
    return { success: false, reason: error.message };
  }
};

const formatIndiaDateTime = (value) => {
  if (!value) return null;

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return String(value);
  }

  return parsed.toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZoneName: 'short',
  });
};


async function registerEmail(userEmail, name){
  const to = userEmail;
  const upperName = name ? name.toUpperCase() : "USER";
  const weburl = 'https://swachh-pooja.vercel.app/';
 const subject = "🌿 Welcome to SwachhPooja — Let’s Keep Our Streets Clean 🙏";
  const text = `
       🎉 Welcome to 
       
       Hello ${upperName} 👋
       
       We’re excited to have you join Swachh Pooja! 🚀
       Your account has been successfully created and everything is ready for you to start exploring.
       
       ━━━━━━━━━━━━━━━━━━━━━━━
       ✨ What you can do next:
       ━━━━━━━━━━━━━━━━━━━━━━━
       
       🔐 Log in and set up your profile  
       📍 Report religious items  
        📸 Upload photo & location
        🚐 Our team will collect
        ♻️ Proper reuse / visarjan 
       
       ━━━━━━━━━━━━━━━━━━━━━━━
       
        Our mission is to protect our environment and honor every religious offering with dignity and care. 🌍✨
       
       🚀 Get Started Now:
        ${weburl}
       
       ━━━━━━━━━━━━━━━━━━━━━━━
       
       💬 Need Help?
       Our support team is always here for you.
       
       ✨ Welcome aboard! We’re glad you’re here.
       
       Warm regards,  
       Swachh Pooja Team 💼
       
       ━━━━━━━━━━━━━━━━━━━━━━━
       
       📩 Support: swacchpooja1@gmail.com  
       🔒 If you did not create this account, please contact us immediately.
       
       © 2024 SWACHH POOJA — All Rights Reserved.
       `;
  const html =  
  `<div style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,sans-serif;">
    
    <table align="center" width="100%" style="max-width:600px;margin:30px auto;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 10px 25px rgba(0,0,0,0.08);">
      
      <!-- Header -->
      <tr>
        <td style="background: linear-gradient(135deg, #166534, #22c55e);padding:30px;text-align:center;color:#fff;">
          <h1 style="margin:0;font-size:24px;">🎉 Welcome to Swachh Pooja</h1>
          <p style="margin:8px 0 0;font-size:14px;opacity:0.9;">Respecting Faith, Protecting Nature</p>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding:30px;">
          
          <h2 style="color:#333;margin-top:0;">Hello ${upperName} 👋</h2>

          <p style="color:#555;font-size:15px;line-height:1.6;">
            We’re excited to have you join <strong>Swachh Pooja</strong>! 🚀<br/>
            Your account has been created successfully. You can now start reporting and helping us keep our surroundings clean. 🌱
          </p>

          <!-- Features -->
          <div style="margin:20px 0;">
            <p style="margin:10px 0;font-size:14px;">🔐 Log in and set up your profile</p>
            <p style="margin:10px 0;font-size:14px;">📍 Report religious items</p>
            <p style="margin:10px 0;font-size:14px;">📸 Upload photo & location</p>
            <p style="margin:10px 0;font-size:14px;">🚐 Our team will collect</p>
            <p style="margin:10px 0;font-size:14px;">♻️ Proper reuse / visarjan</p>
          </div>

          <p style="color:#555;font-size:15px;line-height:1.6;">
            Our mission is to protect our environment and honor every religious offering with dignity and care. 🌍✨
          </p>

          <!-- Button -->
          <div style="text-align:center;margin:30px 0;">
            <a href=${weburl} target="_blank" rel="noopener"
               style="display:inline-block;padding:14px 28px;background: linear-gradient(135deg, #166534, #22c55e);color:#fff;text-decoration:none;border-radius:8px;font-size:15px;font-weight:bold;">
              🚀 Get Started Now
            </a>
          </div>

          <!-- Help -->
          <p style="color:#555;font-size:14px;">
            💬 <strong>Need Help?</strong><br/>
            Our support team is always here to help you anytime.
          </p>

          <p style="color:#555;font-size:14px;">
            ✨ Welcome aboard! We’re glad you’re here.
          </p>

          <p style="margin-top:20px;color:#333;font-weight:bold;">
            Warm regards,<br/>
            The Swachh Pooja Team 💼
          </p>

        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background:#f9fafb;padding:20px;text-align:center;font-size:12px;color:#888;">
          
          📩 Support: swachhpooja1@gmail.com<br/><br/>
          
          🔒 If you did not create this account, please contact us immediately.<br/><br/>
          
          © 2024 SWACHH POOJA — All Rights Reserved.
        
        </td>
      </tr>

    </table>

  </div>
  `;
  await sendEmail({to, subject,text,html})
}

async function adminNewUserEmail(userEmail, name, phone) {
  const to = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;
  const upperName = name ? name.toUpperCase() : "USER";

  const subject = "🚨 New User Registered on SwachhPooja";

  const text = `
      🚨 New User Registration Alert
      
      A new user has just signed up on Swachh Pooja.
      
      ━━━━━━━━━━━━━━━━━━━━━━━
      👤 User Details:
      ━━━━━━━━━━━━━━━━━━━━━━━
      
      Name: ${upperName}
      Email: ${userEmail}
      Phone: ${phone || "Not Provided"}
      
      ━━━━━━━━━━━━━━━━━━━━━━━
      
      📢 Please review the user details in the admin panel.
      
      ━━━━━━━━━━━━━━━━━━━━━━━
      
      © 2024 SWACHH POOJA
  `;

  const html = `
  <div style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,sans-serif;">
    
    <table align="center" width="100%" style="max-width:600px;margin:30px auto;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 10px 25px rgba(0,0,0,0.08);">
      
      <!-- Header -->
      <tr>
        <td style="background: linear-gradient(135deg, #7f1d1d, #ef4444);padding:30px;text-align:center;color:#fff;">
          <h1 style="margin:0;font-size:22px;">🚨 New User Registered</h1>
          <p style="margin:8px 0 0;font-size:14px;opacity:0.9;">Swachh Pooja Admin Alert</p>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding:30px;">
          
          <h2 style="color:#333;margin-top:0;">A new user has joined 🎉</h2>

          <p style="color:#555;font-size:15px;line-height:1.6;">
            A user has successfully registered on <strong>Swachh Pooja</strong>.
            Below are the details:
          </p>

          <!-- User Details Box -->
          <div style="background:#f9fafb;padding:20px;border-radius:10px;margin:20px 0;">
            <p style="margin:8px 0;"><strong>👤 Name:</strong> ${upperName}</p>
            <p style="margin:8px 0;"><strong>📧 Email:</strong> ${userEmail}</p>
            <p style="margin:8px 0;"><strong>📱 Phone:</strong> ${phone || "Not Provided"}</p>
          </div>

          <p style="color:#555;font-size:14px;">
            📊 You can manage this user from your admin dashboard.
          </p>

          <!-- Button -->
          <div style="text-align:center;margin:30px 0;">
            <a href="https://swachh-pooja.vercel.app/" target="_blank"
               style="display:inline-block;padding:14px 28px;background: linear-gradient(135deg, #7f1d1d, #ef4444);color:#fff;text-decoration:none;border-radius:8px;font-size:15px;font-weight:bold;">
              🔍 View in Admin Panel
            </a>
          </div>

          <p style="margin-top:20px;color:#333;font-weight:bold;">
            — Swachh Pooja System
          </p>

        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background:#f9fafb;padding:20px;text-align:center;font-size:12px;color:#888;">
          This is an automated notification email.<br/>
          © 2024 SWACHH POOJA
        </td>
      </tr>

    </table>

  </div>
  `;

  await sendEmail({
    to,
    subject,
    text,
    html
  });
}

async function adminRequestEmail(request) {
  const to = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;
  const formattedRequestDate = formatIndiaDateTime(request.date) || 'Not Provided';
  const formattedRequestAcceptanceTime = formatIndiaDateTime(request.acceptanceTime) || 'Not Yet Accepted';

  const subject = "📢 New Pickup Request - SwachhPooja";

  const text = `
      📢 New Request Received
      
      A user has submitted a new waste pickup request.
      
      ━━━━━━━━━━━━━━━━━━━━━━━
      📋 Request Details:
      ━━━━━━━━━━━━━━━━━━━━━━━
      
      👤 Name: ${request.reporterName || "Not Provided"}
      📱 Phone: ${request.reporterPhone || "Not Provided"}
      📍 Address: ${request.address || "Not Provided"}
      
      📅 Date: ${formattedRequestDate}
      📌 Status: ${request.status}
      
      🚚 Assigned Agent: ${request.assignedAgent || "Not Assigned"}
      ⏱ Acceptance Time: ${formattedRequestAcceptanceTime}
      
      ━━━━━━━━━━━━━━━━━━━━━━━
      
      📊 Please check admin panel for more details.
      
      © 2024 SWACHH POOJA
  `;

  const html = `
  <div style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,sans-serif;">
    
    <table align="center" width="100%" style="max-width:600px;margin:30px auto;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 10px 25px rgba(0,0,0,0.08);">
      
      <!-- Header -->
      <tr>
        <td style="background: linear-gradient(135deg, #1e3a8a, #3b82f6);padding:30px;text-align:center;color:#fff;">
          <h1 style="margin:0;font-size:22px;">📢 New Pickup Request</h1>
          <p style="margin:8px 0 0;font-size:14px;opacity:0.9;">Swachh Pooja Admin Notification</p>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding:30px;">
          
          <h2 style="color:#333;margin-top:0;">New request submitted 🚀</h2>

          <p style="color:#555;font-size:15px;line-height:1.6;">
            A user has submitted a new waste pickup request. Below are the details:
          </p>

          <!-- Details Box -->
          <div style="background:#f9fafb;padding:20px;border-radius:10px;margin:20px 0;">
            <p><strong>👤 Name:</strong> ${request.reporterName || "Not Provided"}</p>
            <p><strong>📱 Phone:</strong> ${request.reporterPhone || "Not Provided"}</p>
            <p><strong>📍 Address:</strong> ${request.address || "Not Provided"}</p>
            <hr style="margin:15px 0;"/>
            <p><strong>📅 Date:</strong> ${formattedRequestDate}</p>
            <p><strong>📌 Status:</strong> ${request.status}</p>
            <p><strong>🚚 Assigned Agent:</strong> ${request.assignedAgent || "Not Assigned"}</p>
            <p><strong>⏱ Acceptance Time:</strong> ${formattedRequestAcceptanceTime}</p>
          </div>


          <!-- Button -->
          <div style="text-align:center;margin:30px 0;">
            <a href="https://swachh-pooja.vercel.app/" target="_blank"
               style="display:inline-block;padding:14px 28px;background: linear-gradient(135deg, #1e3a8a, #3b82f6);color:#fff;text-decoration:none;border-radius:8px;font-size:15px;font-weight:bold;">
              🔍 View Request
            </a>
          </div>

          <p style="margin-top:20px;color:#333;font-weight:bold;">
            — Swachh Pooja System
          </p>

        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background:#f9fafb;padding:20px;text-align:center;font-size:12px;color:#888;">
          This is an automated notification email.<br/>
          © 2024 SWACHH POOJA
        </td>
      </tr>

    </table>

  </div>
  `;

  console.log("admin", to)
  await sendEmail({
    to,
    subject,
    text,
    html
  });
}

async function userRequestConfirmationEmail(populatedBooking, isAgentNotification = false) {
  const to = populatedBooking?.user?.email || populatedBooking.email;// adjust if needed
  const formattedBookingDate = formatIndiaDateTime(populatedBooking.date) || 'Not Provided';

  const name = populatedBooking.reporterName || "User";
  const upperName = name ? name.toUpperCase() : "USER";

  const subject = "✅ Your Pickup Request is Received - SwachhPooja";

  const text = `
      🎉 Request Submitted Successfully
      
      Hello ${upperName} 👋
      
      Your waste pickup request has been received successfully.
      
      ━━━━━━━━━━━━━━━━━━━━━━━
      📋 Your Request Details:
      ━━━━━━━━━━━━━━━━━━━━━━━
      
      📍 Address: ${populatedBooking.address || "Not Provided"}
      📅 Date: ${formattedBookingDate}
      📌 Status: ${populatedBooking.status}
      
      🚚 Assigned Agent: ${populatedBooking.assignedAgent || "Will be assigned soon"}
      
      ━━━━━━━━━━━━━━━━━━━━━━━
      
      Our team will review your request and take action shortly. 🚀
      
      Thank you for helping keep our environment clean 🌍✨
      
      — Swachh Pooja Team
  `;

  const html = `
  <div style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,sans-serif;">
    
    <table align="center" width="100%" style="max-width:600px;margin:30px auto;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 10px 25px rgba(0,0,0,0.08);">
      
      <!-- Header -->
      <tr>
        <td style="background: linear-gradient(135deg, #166534, #22c55e);padding:30px;text-align:center;color:#fff;">
          <h1 style="margin:0;font-size:22px;">✅ Request Received</h1>
          <p style="margin:8px 0 0;font-size:14px;opacity:0.9;">Swachh Pooja Confirmation</p>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding:30px;">
          
          <h2 style="color:#333;margin-top:0;">Hello ${upperName} 👋</h2>

          <p style="color:#555;font-size:15px;line-height:1.6;">
            Your pickup request has been successfully submitted. 🎉<br/>
            Our team will review and process it shortly.
          </p>

          <!-- Details -->
          <div style="background:#f9fafb;padding:20px;border-radius:10px;margin:20px 0;">
            <p><strong>📍 Address:</strong> ${populatedBooking.address || "Not Provided"}</p>
            <p><strong>📅 Date:</strong> ${formattedBookingDate}</p>
            <p><strong>📌 Status:</strong> ${populatedBooking.status}</p>
            <p><strong>🚚 Agent:</strong> ${populatedBooking.assignedAgent || "Will be assigned soon"}</p>
          </div>

          <!-- Button -->
          <div style="text-align:center;margin:30px 0;">
            <a href="https://swachh-pooja.vercel.app/" target="_blank"
               style="display:inline-block;padding:14px 28px;background: linear-gradient(135deg, #166534, #22c55e);color:#fff;text-decoration:none;border-radius:8px;font-size:15px;font-weight:bold;">
              🔍 Track Your Request
            </a>
          </div>

          <p style="color:#555;font-size:14px;">
            🌿 Thank you for contributing to a cleaner and greener environment.
          </p>

          <p style="margin-top:20px;color:#333;font-weight:bold;">
            — Swachh Pooja Team 💼
          </p>

        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background:#f9fafb;padding:20px;text-align:center;font-size:12px;color:#888;">
          📩 Support: swachhpooja1@gmail.com<br/><br/>
          © 2024 SWACHH POOJA
        </td>
      </tr>

    </table>

  </div>
  `;

  await sendEmail({
    to,
    subject,
    text,
    html
  });
}

async function bookingStatusUpdateEmail(booking) {
  const user = booking.user; // make sure populated
  const to = user?.email || booking.email;
  const formattedBookingDate = formatIndiaDateTime(booking.date) || 'Not Provided';

  const name = booking.reporterName || user?.name || "User";
  const upperName = name ? name.toUpperCase() : "USER";

  const status = booking.status;

  // 🎯 Dynamic Subject
  const subject = `📌 Your Request is ${status} - SwachhPooja`;

  // 🎨 Dynamic Message based on status
  let statusMessage = "";
  let color = "#3b82f6";

  if (status === "Confirmed") {
    statusMessage = "Your request has been accepted and our team will reach you soon 🚚";
    color = "#2563eb";
  } else if (status === "Completed") {
    statusMessage = "Your request has been successfully completed ✅ Thank you for keeping the environment clean 🌿";
    color = "#16a34a";
  } else if (status === "Cancelled") {
    statusMessage = "Your request has been cancelled. If this was a mistake, you can create a new request.";
    color = "#dc2626";
  } else {
    statusMessage = "Your request is currently being reviewed.";
  }

  const text = `
      📌 Request Status Update
      
      Hello ${upperName} 👋
      
      Your request status has been updated.
      
      ━━━━━━━━━━━━━━━━━━━━━━━
      📋 Details:
      ━━━━━━━━━━━━━━━━━━━━━━━
      
      📍 Address: ${booking.address || "Not Provided"}
      📅 Date: ${formattedBookingDate}
      📌 Status: ${status}
      
      ${statusMessage}
      
      ━━━━━━━━━━━━━━━━━━━━━━━
      
      Thank you for using Swachh Pooja 🌍
  `;

  const html = `
  <div style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,sans-serif;">
    
    <table align="center" width="100%" style="max-width:600px;margin:30px auto;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 10px 25px rgba(0,0,0,0.08);">
      
      <!-- Header -->
      <tr>
        <td style="background: linear-gradient(135deg, ${color}, #000000);padding:30px;text-align:center;color:#fff;">
          <h1 style="margin:0;font-size:22px;">📌 Status Updated</h1>
          <p style="margin:8px 0 0;font-size:14px;opacity:0.9;">Swachh Pooja Notification</p>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding:30px;">
          
          <h2 style="color:#333;margin-top:0;">Hello ${upperName} 👋</h2>

          <p style="color:#555;font-size:15px;line-height:1.6;">
            Your request status has been updated.
          </p>

          <!-- Status Box -->
          <div style="background:#f9fafb;padding:20px;border-radius:10px;margin:20px 0;">
            <p><strong>📍 Address:</strong> ${booking.address || "Not Provided"}</p>
            <p><strong>📅 Date:</strong> ${formattedBookingDate}</p>
            <p><strong>📌 Status:</strong> ${status}</p>
          </div>

          <!-- Message -->
          <p style="color:#555;font-size:15px;line-height:1.6;">
            ${statusMessage}
          </p>

          <!-- Button -->
          <div style="text-align:center;margin:30px 0;">
            <a href="https://swachh-pooja.vercel.app/" target="_blank"
               style="display:inline-block;padding:14px 28px;background: ${color};color:#fff;text-decoration:none;border-radius:8px;font-size:15px;font-weight:bold;">
              🔍 View Request
            </a>
          </div>

          <p style="margin-top:20px;color:#333;font-weight:bold;">
            — Swachh Pooja Team 💼
          </p>

        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background:#f9fafb;padding:20px;text-align:center;font-size:12px;color:#888;">
          📩 Support: swachhpooja1@gmail.com<br/><br/>
          © 2024 SWACHH POOJA
        </td>
      </tr>

    </table>

  </div>
  `;

  await sendEmail({
    to,
    subject,
    text,
    html
  });
}

async function adminStatusUpdateEmail(booking) {
  const to = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;
  const formattedAdminDate = formatIndiaDateTime(booking.date) || 'Not Provided';
  const formattedAdminAcceptanceTime = formatIndiaDateTime(booking.acceptanceTime) || 'Not Available';

  const name = booking.reporterName || "User";
  const upperName = name ? name.toUpperCase() : "USER";

  const status = booking.status;

  const subject = `📌 Booking Status Updated: ${status}`;

  // 🎯 Status based message
  let statusMessage = "";
  let color = "#3b82f6";

  if (status === "Confirmed") {
    statusMessage = "The request has been accepted by the team.";
    color = "#2563eb";
  } else if (status === "Completed") {
    statusMessage = "The request has been successfully completed.";
    color = "#16a34a";
  } else if (status === "Cancelled") {
    statusMessage = "The request has been cancelled.";
    color = "#dc2626";
  } else {
    statusMessage = "The request is currently pending review.";
  }

  const text = `
      📌 Booking Status Update
      
      A request status has been updated.
      
      ━━━━━━━━━━━━━━━━━━━━━━━
      📋 Details:
      ━━━━━━━━━━━━━━━━━━━━━━━
      
      👤 Name: ${upperName}
      📱 Phone: ${booking.reporterPhone || "Not Provided"}
      📍 Address: ${booking.address || "Not Provided"}
      
      📅 Date: ${formattedAdminDate}
      📌 Status: ${status}
      
      🚚 Assigned Agent: ${booking.assignedAgent || "Not Assigned"}
      ⏱ Acceptance Time: ${formattedAdminAcceptanceTime}
      
      ━━━━━━━━━━━━━━━━━━━━━━━
      
      ${statusMessage}
      
      © 2024 SWACHH POOJA
  `;

  const html = `
  <div style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,sans-serif;">
    
    <table align="center" width="100%" style="max-width:600px;margin:30px auto;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 10px 25px rgba(0,0,0,0.08);">
      
      <!-- Header -->
      <tr>
        <td style="background: linear-gradient(135deg, ${color}, #000000);padding:30px;text-align:center;color:#fff;">
          <h1 style="margin:0;font-size:22px;">📌 Status Updated</h1>
          <p style="margin:8px 0 0;font-size:14px;opacity:0.9;">Admin Notification</p>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding:30px;">
          
          <h2 style="color:#333;margin-top:0;">Request Status Changed 🔄</h2>

          <p style="color:#555;font-size:15px;line-height:1.6;">
            A booking/request status has been updated. Below are the details:
          </p>

          <!-- Details Box -->
          <div style="background:#f9fafb;padding:20px;border-radius:10px;margin:20px 0;">
            <p><strong>👤 Name:</strong> ${upperName}</p>
            <p><strong>📱 Phone:</strong> ${booking.reporterPhone || "Not Provided"}</p>
            <p><strong>📍 Address:</strong> ${booking.address || "Not Provided"}</p>
            <hr style="margin:15px 0;"/>
            <p><strong>📅 Date:</strong> ${formattedAdminDate}</p>
            <p><strong>📌 Status:</strong> ${status}</p>
            <p><strong>🚚 Agent:</strong> ${booking.assignedAgent || "Not Assigned"}</p>
            <p><strong>⏱ Acceptance Time:</strong> ${formattedAdminAcceptanceTime}</p>
          </div>

          <!-- Status Message -->
          <p style="color:#555;font-size:15px;">
            ${statusMessage}
          </p>

          <!-- Button -->
          <div style="text-align:center;margin:30px 0;">
            <a href="https://swachh-pooja.vercel.app/" target="_blank"
               style="display:inline-block;padding:14px 28px;background: ${color};color:#fff;text-decoration:none;border-radius:8px;font-size:15px;font-weight:bold;">
              🔍 View in Admin Panel
            </a>
          </div>

          <p style="margin-top:20px;color:#333;font-weight:bold;">
            — Swachh Pooja System
          </p>

        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background:#f9fafb;padding:20px;text-align:center;font-size:12px;color:#888;">
          This is an automated email notification.<br/>
          © 2024 SWACHH POOJA
        </td>
      </tr>

    </table>

  </div>
  `;

  await sendEmail({
    to,
    subject,
    text,
    html
  });
}

async function adminContactEmail(saved) {
  const to = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;

  const name = saved.name ? saved.name.toUpperCase() : "USER";

  const subject = "📩 New Contact Message - SwachhPooja";

  const text = `
      📩 New Contact Message
      
      A user has sent a message via contact form.
      
      ━━━━━━━━━━━━━━━━━━━━━━━
      👤 Name: ${name}
      📧 Email: ${saved.email}
      
      💬 Message:
      ${saved.message}
      
      ━━━━━━━━━━━━━━━━━━━━━━━
      
      Please respond to the user.
      
      © 2024 SWACHH POOJA
  `;

  const html = `
  <div style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,sans-serif;">
    
    <table align="center" width="100%" style="max-width:600px;margin:30px auto;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 10px 25px rgba(0,0,0,0.08);">
      
      <!-- Header -->
      <tr>
        <td style="background: linear-gradient(135deg, #7c3aed, #a855f7);padding:30px;text-align:center;color:#fff;">
          <h1 style="margin:0;font-size:22px;">📩 New Contact Message</h1>
          <p style="margin:8px 0 0;font-size:14px;opacity:0.9;">Admin Notification</p>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding:30px;">
          
          <h2 style="margin-top:0;">User Message Received 💬</h2>

          <div style="background:#f9fafb;padding:20px;border-radius:10px;margin:20px 0;">
            <p><strong>👤 Name:</strong> ${name}</p>
            <p><strong>📧 Email:</strong> ${saved.email}</p>
            <hr style="margin:15px 0;">
            <p><strong>💬 Message:</strong></p>
            <p style="color:#555;">${saved.message}</p>
          </div>

          <div style="text-align:center;margin:30px 0;">
            <a href="mailto:${saved.email}"
               style="display:inline-block;padding:12px 24px;background:#7c3aed;color:#fff;text-decoration:none;border-radius:8px;font-weight:bold;">
              ✉️ Reply to User
            </a>
          </div>

          <p style="font-weight:bold;">— Swachh Pooja System</p>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background:#f9fafb;padding:20px;text-align:center;font-size:12px;color:#888;">
          Automated email notification<br/>
          © 2024 SWACHH POOJA
        </td>
      </tr>

    </table>
  </div>
  `;

  await sendEmail({ to, subject, text, html });
}

async function userContactConfirmationEmail(saved) {
  const to = saved.email;

  const name = saved.name ? saved.name.toUpperCase() : "USER";

  const subject = "✅ We Received Your Message - SwachhPooja";

  const text = `
      Hello ${name} 👋
      
      Thank you for contacting Swachh Pooja.
      
      We have received your message and our team will get back to you soon.
      
      💬 Your Message:
      ${saved.message}
      
      🚀 We appreciate your effort in reaching out.
      
      — Swachh Pooja Team
  `;

  const html = `
  <div style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,sans-serif;">
    
    <table align="center" width="100%" style="max-width:600px;margin:30px auto;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 10px 25px rgba(0,0,0,0.08);">
      
      <!-- Header -->
      <tr>
        <td style="background: linear-gradient(135deg, #166534, #22c55e);padding:30px;text-align:center;color:#fff;">
          <h1 style="margin:0;font-size:22px;">✅ Message Received</h1>
          <p style="margin:8px 0 0;font-size:14px;">We’ll get back to you soon</p>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding:30px;">
          
          <h2>Hello ${name} 👋</h2>

          <p style="color:#555;">
            Thank you for contacting <strong>Swachh Pooja</strong> 🙏<br/>
            We have received your message and our team will respond shortly.
          </p>

          <div style="background:#f9fafb;padding:20px;border-radius:10px;margin:20px 0;">
            <p><strong>💬 Your Message:</strong></p>
            <p style="color:#555;">${saved.message}</p>
          </div>

          <p style="color:#555;">
            🚀 We appreciate your effort in helping us improve.
          </p>

          <p style="font-weight:bold;">— Swachh Pooja Team 💼</p>
        </td>
      </tr>

      <tr>
        <td style="background:#f9fafb;padding:20px;text-align:center;font-size:12px;color:#888;">
          📩 swachhpooja1@gmail.com<br/>
          © 2024 SWACHH POOJA
        </td>
      </tr>

    </table>
  </div>
  `;

  await sendEmail({ to, subject, text, html });
}

module.exports = {registerEmail, adminNewUserEmail, adminRequestEmail, adminStatusUpdateEmail, bookingStatusUpdateEmail, userRequestConfirmationEmail, adminContactEmail, userContactConfirmationEmail}