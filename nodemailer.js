const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json()); // Middleware to parse JSON

require('dotenv').config();
// Email Sending Route
app.post("/send-email", async (req, res) => {
    const { to, subject, text } = req.body;

    try {
        // 1. Create a Transporter
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.user, // Replace with your Gmail
                pass: process.env.password // Replace with your Gmail password or App Password
            }
        });

        // 2. Define Mail Options
        let mailOptions = {
            from: process.env.user, // Sender Email
            to: to, // Receiver Email
            subject: subject, // Email Subject
            text: text // Email Body (Plain Text)
        };

        // 3. Send Email
        let info = await transporter.sendMail(mailOptions);
        console.log("Email Sent: " + info.response);

        res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to send email" });
    }
});

// Start Server
app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
