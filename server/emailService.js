import nodemailer from 'nodemailer';

export const sendLeadNotification = async (lead) => {
  const ownerEmail = process.env.OWNER_EMAIL || "drswhite32@gmail.com";
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  const emailSubject = `[NEW DENTAL LEAD] ${lead.patient_name} - ${lead.service} (ID: ${lead.lead_id})`;
  const emailHtml = `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc; padding: 24px; color: #0f172a;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        <div style="background-color: #0f172a; padding: 24px; text-align: center; border-bottom: 3px solid #c5a059;">
          <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 600;">Dr's White 32 Dental</h1>
          <p style="color: #c5a059; margin: 4px 0 0 0; font-size: 13px; letter-spacing: 1px; text-transform: uppercase;">New Patient Appointment Request</p>
        </div>
        <div style="padding: 24px;">
          <div style="background-color: #f1f5f9; border-left: 4px solid #c5a059; padding: 12px 16px; margin-bottom: 20px; border-radius: 4px;">
            <p style="margin: 0; font-size: 14px; font-weight: 600; color: #0f172a;">Lead ID: <span style="color: #c5a059;">${lead.lead_id}</span></p>
            <p style="margin: 4px 0 0 0; font-size: 12px; color: #64748b;">Source: ${lead.source.toUpperCase()} | Status: ${lead.status}</p>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px; width: 35%;">Patient Name:</td>
              <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 600;">${lead.patient_name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Phone Number:</td>
              <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 600;"><a href="tel:${lead.phone}" style="color: #0f172a; text-decoration: none;">${lead.phone}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Email:</td>
              <td style="padding: 8px 0; color: #0f172a; font-size: 14px;">${lead.email || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Treatment:</td>
              <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 600;">${lead.service}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Preferred Date:</td>
              <td style="padding: 8px 0; color: #0f172a; font-size: 14px;">${lead.preferred_date}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Preferred Time:</td>
              <td style="padding: 8px 0; color: #0f172a; font-size: 14px;">${lead.preferred_time}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Patient Notes:</td>
              <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-style: italic;">"${lead.message}"</td>
            </tr>
          </table>

          <div style="text-align: center; margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
            <a href="tel:${lead.phone}" style="background-color: #0f172a; color: #ffffff; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-size: 13px; font-weight: 600; display: inline-block; margin-right: 8px;">Call Patient</a>
            <a href="https://wa.me/91${lead.phone.replace(/[^0-9]/g, '')}" style="background-color: #25D366; color: #ffffff; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-size: 13px; font-weight: 600; display: inline-block;">WhatsApp</a>
          </div>
        </div>
        <div style="background-color: #f8fafc; padding: 12px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0;">
          Dr's White 32 Dental • Sanath Nagar, Hyderabad • Automated Lead Engine
        </div>
      </div>
    </div>
  `;

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: parseInt(smtpPort || '587', 10),
        secure: smtpPort === '465',
        auth: { user: smtpUser, pass: smtpPass }
      });

      const info = await transporter.sendMail({
        from: `"Dr's White 32 Lead Engine" <${smtpUser}>`,
        to: ownerEmail,
        subject: emailSubject,
        html: emailHtml
      });

      console.log('✅ Lead notification email dispatched:', info.messageId);
      return { success: true, mode: 'smtp', messageId: info.messageId };
    } catch (err) {
      console.warn('⚠️ SMTP send error, fallback to logged lead event:', err.message);
      return { success: true, mode: 'fallback_logged', note: err.message };
    }
  } else {
    console.log('📬 [DEMO MODE] Email Notification Generated for:', ownerEmail);
    console.log(`📋 Lead Details: ID=${lead.lead_id}, Name=${lead.patient_name}, Phone=${lead.phone}, Service=${lead.service}`);
    return { success: true, mode: 'demo_logged', recipient: ownerEmail };
  }
};
