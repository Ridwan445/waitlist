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
    const { customerName, customerEmail, productName} = req.body;

    const newCustomer = new waitModel({ customerName, customerEmail, productName });
    await newCustomer.save();

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: customerEmail,
        subject: `Waitlist Update for ${productName}`,
        html: `
            <div style="font-family: Arial, sans-serif; color: #333;">
                <h2 style="color: #0073e6;">Waitlist Update for ${productName}</h2>
                <p>Dear ${customerName},</p>
                <p>Thank you for your interest in ${productName}! We're excited to let you know that you've been added to our waitlist.</p>
                <p>We're working hard to get everyone on board as soon as possible. You'll receive another email as soon as your spot is available.</p>
                <p>In the meantime, if you have any questions or need further information, feel free to reach out to us at ${"getshortment@gmail.com"}.</p>
                <p>Thank you for your patience and support!</p>
                <p>Best regards,</p>
                <p>The Shortment Team</p>
            </div>
        `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ message: 'Failed to send email', error});
        }
        res.status(200).json({ message: 'Waitlist email sent successfully', info });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    connectDb()
    console.log(`Server running on port ${PORT}`);
});
