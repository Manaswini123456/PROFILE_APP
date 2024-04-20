import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import config from '../config.js';

// Function to generate a random OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
}

let nodeConfig = {
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: config.EMAIL, // generated ethereal user
        pass: config.PASSWORD, // generated ethereal password
    }
}

let transporter = nodemailer.createTransport(nodeConfig);

let MailGenerator = new Mailgen({
    theme: "default",
    product: {
        name: "Mailgen",
        link: 'https://mailgen.js/'
    }
});

export const registerMail = async (req, res) => {
    const { username, userEmail, text, subject } = req.body;

    // Generate OTP
    const otp = generateOTP();

    // Body of the email
    var email = {
        body: {
            name: username,
            intro: text || 'Welcome to Daily Tuition! We\'re very excited to have you on board.',
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.',
            otp: `Your One-Time Password (OTP): ${otp}` // Include OTP in the email
        }
    };

    var emailBody = MailGenerator.generate(email);

    let message = {
        from: '"Ethereal Email" <noreply@ethereal.email>', // Ethereal email address
        to: userEmail, // User's provided email address
        subject: subject || "Signup Successful",
        html: emailBody
    };

    // Send mail
    transporter.sendMail(message)
        .then(() => {
            return res.status(200).send({ msg: "You should receive an email from us." })
        })
        .catch(error => res.status(500).send({ error }));
};
