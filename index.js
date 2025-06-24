const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Route to handle contact form
app.post("/send-email", async (req, res) => {
  const { fullname, email, message } = req.body;

  // Configure transporter (use your Gmail or other SMTP credentials)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "nikhilmukheja1@gmail.com", // 🔒 your Gmail
      pass: "neno mwlz dthp popg", // 🔑 use App Password, not your normal password
    },
  });

  // Email content
  const mailOptions = {
    from: email,
    to: "nikhilmukheja1@gmail.com", // Where you want to receive the form message
    subject: `New Contact Form Submission from ${fullname}`,
    text: `Name: ${fullname}\n\nEmail: ${email}\n\nMessage:${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
