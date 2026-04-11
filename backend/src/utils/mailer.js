const nodemailer = require('nodemailer');

const hasOAuthConfig =
  process.env.EMAIL_USER &&
  process.env.CLIENT_ID &&
  process.env.CLIENT_SECRET &&
  process.env.REFRESH_TOKEN;

const transporter = hasOAuthConfig
  ? nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
      },
    })
  : null;

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

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error.message);
    return { success: false, reason: error.message };
  }
};

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const buildEmailHtml = ({
  title,
  greeting,
  paragraphs = [],
  details = [],
  ctaButton,
  footerNote = 'SwachhPooja Team',
}) => {
  const paragraphHtml = paragraphs
    .map((paragraph) => `<p style="margin:0 0 12px;color:#334155;font-size:15px;line-height:1.6;">${escapeHtml(paragraph)}</p>`)
    .join('');

  const detailsHtml = details.length
    ? `
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:14px;border-collapse:collapse;border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;">
        <tbody>
          ${details
            .map(
              (item) => `
                <tr>
                  <td style="padding:10px 12px;background:#f8fafc;font-size:13px;font-weight:600;color:#0f172a;width:35%;border-bottom:1px solid #e2e8f0;">${escapeHtml(item.label)}</td>
                  <td style="padding:10px 12px;font-size:13px;color:#334155;border-bottom:1px solid #e2e8f0;">${escapeHtml(item.value)}</td>
                </tr>
              `
            )
            .join('')}
        </tbody>
      </table>
    `
    : '';

  const ctaHtml = ctaButton?.url && ctaButton?.label
    ? `
      <p style="margin:20px 0 0;">
        <a
          href="${escapeHtml(ctaButton.url)}"
          target="_blank"
          rel="noopener noreferrer"
          style="display:inline-block;padding:11px 18px;background:#166534;color:#ffffff;text-decoration:none;border-radius:8px;font-size:14px;font-weight:600;"
        >${escapeHtml(ctaButton.label)}</a>
      </p>
    `
    : '';

  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${escapeHtml(title)}</title>
      </head>
      <body style="margin:0;padding:24px;background:#f1f5f9;font-family:Segoe UI,Arial,sans-serif;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e2e8f0;">
          <tr>
            <td style="padding:18px 22px;background:linear-gradient(135deg,#166534,#15803d);color:#ffffff;">
              <h1 style="margin:0;font-size:20px;line-height:1.35;">${escapeHtml(title)}</h1>
              <p style="margin:6px 0 0;font-size:13px;opacity:0.9;">SwachhPooja Notifications</p>
            </td>
          </tr>
          <tr>
            <td style="padding:22px;">
              <p style="margin:0 0 14px;color:#0f172a;font-size:15px;font-weight:600;">${escapeHtml(greeting)}</p>
              ${paragraphHtml}
              ${detailsHtml}
              ${ctaHtml}
              <p style="margin:18px 0 0;color:#64748b;font-size:12px;line-height:1.6;">${escapeHtml(footerNote)}</p>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
};

module.exports = { sendEmail, buildEmailHtml };
