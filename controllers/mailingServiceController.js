const sendMail = require("../utils/mailingService");

/**
 * Handles contact form submissions and sends email using sendMail helper
 */
const contactUs = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const content = `
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `;

    const result = await sendMail(email, subject, content); // Replace with your target email

    if (result.accepted.length > 0) {
      return res.status(200).json({ success: true, message: "Message sent successfully." });
    } else {
      return res.status(500).json({ success: false, message: "Failed to send message.", error: result.error });
    }

  } catch (error) {
    console.error("Mail Controller Error:", error);
    return res.status(500).json({ success: false, message: "Internal server error.", error: error.message });
  }
};

module.exports = {
  contactUs,
};
