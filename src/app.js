const express = require('express');
const nodemailer = require('nodemailer');
const connectDb = require('./db/db');
const waitModel = require('./model/wait.model')
const dotenv = require("dotenv")
dotenv.config()
const cors = require("cors")

const app = express();
app.use(express.json());
app.use(cors())

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: "getshortment@gmail.com",
        pass:  "zeia umna bgvd ksru",
    },
});

app.get('/', (req, res) => {
    res.send('This is the backend root route.');
});

app.post('/send-waitlist-email', async (req, res) => {
const { email } = req.body;

try {
const newCustomer = new waitModel({ email });
await newCustomer.save();

const mailOptions = {
    from: "Shortment",
    to: email,
    subject: `Waitlist Update for Shortment`,
    html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
            <h2 style="color: #0073e6;">Waitlist Update for Shortment</h2>
            <p>Hello</p>
            <p>Thank you for your interest in Shortment! You've been added to our waitlist.</p>
            <p>We're working hard to get everyone on board. You'll receive an email when your spot is available.</p>
            <p>If you have any questions, reach us at ${"getshortment@gmail.com"}.</p>
            <p>Thank you for your patience and support!</p>
            <p>Best regards,</p>
            <p>The Shortment Team</p>
        </div>
    `,
};
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return res.status(500).json({ 
            message: 'Failed to send email', 
            error: error.message 
        });
    }
    res.status(200).json({ 
        message: 'Waitlist email sent successfully', 
    });
});
} catch (err) {
res.status(500).json({ message: 'Server error', error: err.message });
}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    connectDb()
    console.log(`Server running on port ${PORT}`);
});
