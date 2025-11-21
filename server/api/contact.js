const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    parentFirstName,
    parentLastName,
    email,
    phone,
    message,
    newsletter,
    students
  } = req.body;

  if (!parentFirstName || !parentLastName || !email || !phone) {
    return res.status(400).json({ error: 'All required fields must be filled out.' });
  }

  if (!students || students.length === 0 || !students[0]) {
    return res.status(400).json({ error: 'At least one student name is required.' });
  }

  try {
    // Save to MongoDB
    const contact = new Contact({
      parentFirstName,
      parentLastName,
      email,
      phone,
      message: message || '',
      newsletter: newsletter || false,
      students: students
    });

    await contact.save();
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const fullName = `${parentFirstName} ${parentLastName}`;
    const studentsText = students && students.length > 0 
      ? `<p><strong>Students:</strong> ${students.join(', ')}</p>` 
      : '';
    const newsletterText = newsletter 
      ? '<p><strong>Newsletter:</strong> Yes, would like to receive updates</p>' 
      : '';

    await transporter.sendMail({
      from: `"${fullName}" <${email}>`,
      to: 'info@dotorischool.org',
      subject: `Contact Form Submission from ${fullName}`,
      text: `Name: ${fullName}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\nMessage: ${message || 'No message'}\nStudents: ${students ? students.join(', ') : 'None'}\nNewsletter: ${newsletter ? 'Yes' : 'No'}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Parent Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        ${studentsText}
        <p><strong>Message:</strong><br>${message || 'No message provided'}</p>
        ${newsletterText}
      `
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Error sending email:', err);
    res.status(500).json({ error: 'Failed to send email.' });
  }
};
