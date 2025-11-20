import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import http from 'http';
import { Server } from 'socket.io';
// Fix for Mailjet import - use dynamic import
import Mailjet from 'node-mailjet';

// Load environment variables
dotenv.config();

// Set default for Redis usage
process.env.USE_REDIS = process.env.USE_REDIS || 'false';

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Mailjet client
const mailjet = Mailjet.apiConnect(
  process.env.MAILJET_API_KEY,
  process.env.MAILJET_SECRET_KEY
);

// Security Middleware
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Middleware
app.use(
  cors({
    origin: [process.env.CLIENT_URL || 'https://vicportfolio.onrender.com',
    'http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],

  })
);
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(compression());

// Static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use('/uploads', express.static(join(__dirname, 'uploads')));

// Create HTTP server
const server = http.createServer(app);

// Create Socket.IO server with CORS configuration
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Email API server is running' });
});

// Routes
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ error: 'Name, email, and message are required' });
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res
        .status(400)
        .json({ error: 'Please enter a valid email address' });
    }

    const data = {
      Messages: [
        {
          From: {
            Email: process.env.MAILJET_FROM_EMAIL,
            Name: process.env.MAILJET_FROM_NAME,
          },
          To: [
            {
              Email: process.env.MAILJET_TO_EMAIL,
              Name: process.env.MAILJET_TO_NAME,
            },
          ],
          Subject: 'New Contact Form Submission',
          HTMLPart: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
              <h2 style="color: #333; text-align: center;">New Contact Form Submission</h2>
              <div style="background-color: #f8f9fa; border-radius: 8px; padding: 15px; margin: 20px 0;">
                <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
                <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
                <p style="margin: 5px 0;"><strong>Message:</strong></p>
                <p style="margin: 5px 0; white-space: pre-wrap;">${message}</p>
              </div>
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #777; font-size: 12px;">
                <p>© ${new Date().getFullYear()} Portfolio Contact Form. All rights reserved.</p>
              </div>
            </div>
          `,
          TextPart: `
            New Contact Form Submission

            Name: ${name}
            Email: ${email}

            Message:
            ${message}
          `,
        },
      ],
    };

    const result = await mailjet
      .post('send', { version: 'v3.1' })
      .request(data);

    return res.status(200).json({
      success: true,
      message: 'Email sent successfully',
      messageId: result.body.Messages[0].To[0].MessageID,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({
      error: 'Failed to send email. Please try again later.',
      details:
        process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong on the server' });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Email API available at http://localhost:${PORT}/api/contact`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});

// Export for testing
export { app, server, io };
