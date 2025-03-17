# MERN Authentication System

This is a full-stack authentication system built using the MERN stack (MongoDB, Express, React, and Node.js). It supports user registration, login, password recovery, and authentication using JWT.

![image](https://github.com/user-attachments/assets/92cd35c9-cc65-424c-8b46-3dfc338c33b5)

## Features
- User Registration & Login
- Password Reset with OTP Verification
- JWT-based Authentication
- Protected Routes
- Styled UI with Tailwind CSS
- Email-based OTP verification using Nodemailer

## Tech Stack
### Frontend:
- React
- React Router
- Tailwind CSS
- Axios

### Backend:
- Node.js
- Express.js
- MongoDB
- bcrypt.js (for password hashing)
- jsonwebtoken (for authentication)
- Nodemailer (for OTP email verification)

## Installation & Setup

### Prerequisites:
Ensure you have the following installed on your system:
- Node.js
- MongoDB

### Clone the repository
```sh
git clone https://github.com/your-repo/mern-auth.git
cd mern-auth
```

### Backend Setup
1. Navigate to the backend directory:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the backend directory and add the following:
   ```env
   PORT=8080
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your_email
   EMAIL_PASS=your_email_password
   ```
4. Start the backend server:
   ```sh
   npm start
   ```
   The backend will run on `http://localhost:8080`

### Frontend Setup
1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the frontend directory and add:
   ```env
   REACT_APP_BACKEND_URL=http://localhost:8080
   ```
4. Start the frontend server:
   ```sh
   npm start
   ```
   The frontend will run on `http://localhost:3000`

## Nodemailer Setup
Nodemailer is used to send OTP emails for password recovery. Ensure you set up an email account to send OTPs.

### Configure Nodemailer in `.env` file:
```env
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

### Example Usage in Backend:
```javascript
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});

async function sendOTP(email, otp) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is: ${otp}`
    };
    await transporter.sendMail(mailOptions);
}
```

## Running the Application
Once both frontend and backend servers are running, open `http://localhost:3000` in your browser to access the application.

## License
This project is open-source and available under the MIT License.

