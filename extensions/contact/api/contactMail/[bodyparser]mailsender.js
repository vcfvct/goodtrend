const nodemailer = require('nodemailer');

module.exports = async (req, res, delegate, next) => {
	const { name, email, inquiry } = req.body;
	// Simple validation
	if (!email || !inquiry) {
		return res.status(400).json({ message: "Email and Inquiry are required." });
	}

	// Setting up the nodemailer transporter
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.SMTP_USER, // Your Gmail address
			pass: process.env.SMTP_PASSWORD // Your Gmail app password
		}
	});

	/**
	 * @type {import('nodemailer').SendMailOptions}
	 */
	const mailOptions = {
		from: email,
		to: "sales@goodtrendpromos.com",
		cc: email,
		subject: `New Inquiry from ${name || 'Customer'}`,
		text: `
		You have received a new inquiry.

		Name: ${name || 'Not provided'}
		Email: ${email}
		Inquiry: ${inquiry}
		`
	};

	try {
		// Send email
		await transporter.sendMail(mailOptions);
		res.status(200).json({ message: 'Email sent successfully' });
	} catch (error) {
		console.error("Error sending email:", error);
		res.status(500).json({ message: 'Failed to send email', error });
	}
};