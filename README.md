# Dotori School - MERN Stack Application

A full-stack web application for Dotori School, an afterschool program in the Redmond/Bellevue area. Built with MongoDB, Express.js, React, and Node.js (MERN stack).

## Features

- **Frontend (React)**
  - Responsive single-page application with React Router
  - Home, About, Programs, Team, and Contact pages
  - Interactive registration popup
  - Contact form with multiple student support

- **Backend (Express + Node.js)**
  - RESTful API endpoints
  - Contact form submission handling
  - Email notifications via Nodemailer
  - MongoDB integration for data persistence

- **Database (MongoDB)**
  - Contact submissions storage
  - Student information management
  - Newsletter subscription tracking

## Project Structure

```
dotori/
├── client/                # React frontend
│   ├── public/           # Static assets
│   │   └── assets/       # Images, PDFs, etc.
│   ├── src/
│   │   ├── components/   # React components (Header, etc.)
│   │   ├── pages/        # Page components (Home, About, etc.)
│   │   ├── App.js        # Main App component with routing
│   │   └── styles.css    # Global styles
│   └── package.json
│
├── server/               # Express backend
│   ├── api/             # API route handlers
│   │   └── contact.js   # Contact form handler
│   ├── config/          # Configuration files
│   │   └── db.js        # MongoDB connection
│   ├── models/          # Mongoose models
│   │   └── Contact.js   # Contact schema
│   ├── index.js         # Server entry point
│   ├── .env             # Environment variables
│   └── package.json
│
├── public/              # Original static HTML files (archived)
├── package.json         # Root package.json
└── README.md
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager
- SMTP credentials (for email functionality)

## Installation

### 1. Install all dependencies

```bash
npm run install-all
```

Or manually:

```bash
# Install root dependencies
npm install

# Install server dependencies
cd server && npm install

# Install client dependencies
cd ../client && npm install
```

### 2. Set up environment variables

Create a `.env` file in the `server/` directory:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/dotori-school
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/dotori-school

# Server
PORT=3001

# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### 3. Start MongoDB

If using local MongoDB:

```bash
# Start MongoDB service
mongod
```

Or use MongoDB Atlas (cloud database) - update MONGODB_URI in .env

## Running the Application

### Development Mode (Recommended)

Run both client and server concurrently:

```bash
npm run dev
```

This will start:
- React dev server on http://localhost:3000
- Express API server on http://localhost:3001

### Production Mode

Build and run:

```bash
# Build React app
npm run build

# Start server (serves built React app)
NODE_ENV=production npm start
```

### Run Separately

```bash
# Terminal 1 - Start server
npm run server

# Terminal 2 - Start client
npm run client
```

## API Endpoints

### Contact Form
- **POST** `/api/contact` - Submit contact form
  ```json
  {
    "parentFirstName": "John",
    "parentLastName": "Doe",
    "email": "john@example.com",
    "phone": "123-456-7890",
    "students": [
      {
        "firstName": "Jane",
        "lastName": "Doe",
        "grade": "2nd"
      }
    ],
    "message": "Interested in programs",
    "newsletter": true
  }
  ```

### Get Contacts (Admin)
- **GET** `/api/contacts` - Get all contact submissions
- **GET** `/api/contacts/:id` - Get single contact by ID
- **DELETE** `/api/contacts/:id` - Delete contact

## Scripts

- `npm run dev` - Run client and server concurrently
- `npm run server` - Run server only
- `npm run client` - Run client only
- `npm run build` - Build React app for production
- `npm start` - Run production server
- `npm run install-all` - Install all dependencies

## Technologies Used

### Frontend
- React 19.2
- React Router DOM 7.9
- Axios 1.13
- CSS3

### Backend
- Node.js
- Express.js 5.1
- Mongoose (MongoDB ODM)
- Nodemailer 7.0
- CORS 2.8
- dotenv 17.2

### Database
- MongoDB

## Security Notes

- Never commit `.env` files to version control
- Use app passwords for Gmail SMTP (not your main password)
- Enable 2FA and create app-specific passwords in Gmail
- Validate and sanitize all user inputs
- Use HTTPS in production

## Deployment

### Vercel (Recommended)

The project is configured for Vercel deployment with both frontend and backend.

**Prerequisites:**
- MongoDB Atlas account (free tier available at mongodb.com/cloud/atlas)
- Vercel account (vercel.com)

**Steps:**

1. **Set up MongoDB Atlas:**
   - Create a cluster on MongoDB Atlas
   - Get your connection string
   - Whitelist Vercel IP addresses (or allow access from anywhere: 0.0.0.0/0)

2. **Deploy to Vercel:**
   ```bash
   # Install Vercel CLI (optional)
   npm i -g vercel

   # Deploy
   vercel
   ```

3. **Set Environment Variables in Vercel Dashboard:**
   - Go to your project settings on Vercel
   - Add the following environment variables:
     - `MONGODB_URI` - Your MongoDB Atlas connection string
     - `SMTP_HOST` - smtp.gmail.com
     - `SMTP_PORT` - 465
     - `SMTP_SECURE` - true
     - `SMTP_USER` - Your Gmail address
     - `SMTP_PASS` - Your Gmail app password
     - `NODE_ENV` - production

4. **Redeploy** after setting environment variables

**Notes:**
- The React frontend is built and served as static files
- The Express backend runs as Vercel serverless functions
- MongoDB connections are cached for optimal performance
- All API routes are handled through `/api/*`

### Alternative: Heroku
1. Create Heroku app
2. Set config vars (environment variables)
3. Connect to MongoDB Atlas
4. Deploy with Git: `git push heroku main`

## Contact

- **Email:** info@dotorischool.org
- **Address:** 12721 NE Bel Red Rd. #220 (2nd Floor), Bellevue WA 98005

## License

© 2025 Dotori School. All rights reserved.
