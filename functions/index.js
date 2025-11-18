const functions = require('firebase-functions');
const admin = require('firebase-admin');
const sgMail = require('@sendgrid/mail');

admin.initializeApp();

// Read SendGrid config from functions config: set with
// firebase functions:config:set sendgrid.key="YOUR_KEY" sendgrid.sender="no-reply@yourdomain.com"
const SENDGRID_KEY = functions.config().sendgrid && functions.config().sendgrid.key;
const SENDER = (functions.config().sendgrid && functions.config().sendgrid.sender) || 'no-reply@yourdomain.com';
if (SENDGRID_KEY) sgMail.setApiKey(SENDGRID_KEY);

exports.sendCustomReset = functions.https.onCall(async (data, context) => {
  const email = data && data.email;
  const redirectUrl = (data && data.redirectUrl) || 'https://your-app-domain.com/login';

  if (!email) {
    throw new functions.https.HttpsError('invalid-argument', 'Missing email');
  }

  try {
    // Generate a Firebase password reset link
    const link = await admin.auth().generatePasswordResetLink(email, {
      url: redirectUrl,
      handleCodeInApp: false,
    });

    // Build HTML email (customize branding as needed)
    const html = `
      <div style="font-family: Arial, sans-serif; color:#111;">
        <div style="max-width:560px; margin:20px auto; padding:24px; border-radius:10px; background:#ffffff;">
          <h2 style="margin:0 0 12px 0; color:#0b5fff; font-size:20px;">Reset your password</h2>
          <p style="margin:0 0 12px 0; color:#333; font-size:14px;">Hi,</p>
          <p style="margin:0 0 18px 0; color:#333; font-size:14px;">Click the button below to securely reset your password for your account.</p>
          <p style="text-align:center; margin:22px 0;">
            <a href="${link}" style="display:inline-block; background:#0b5fff; color:#fff; padding:12px 20px; border-radius:8px; text-decoration:none; font-weight:600;">Reset Password</a>
          </p>
          <p style="margin:0 0 12px 0; color:#666; font-size:13px;">If you didn't request this, you can ignore this email.</p>
          <p style="margin:18px 0 0 0; color:#999; font-size:12px;">Thanks,<br/>The Team</p>
        </div>
      </div>
    `;

    if (!SENDGRID_KEY) {
      console.warn('SendGrid API key not set. Skipping send.');
      return { success: true, message: 'Link generated (send skipped – no SendGrid key configured)', link };
    }

    const msg = {
      to: email,
      from: SENDER,
      subject: 'Reset your password',
      html,
    };

    await sgMail.send(msg);

    return { success: true };
  } catch (err) {
    console.error('sendCustomReset error:', err);
    throw new functions.https.HttpsError('internal', err.message || 'Unknown error');
  }
});
