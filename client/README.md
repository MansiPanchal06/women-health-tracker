# 🌸 Women Health & Period Tracker

> A Full Stack MERN Application for Women's Health

[![Live Demo](https://img.shields.io/badge/Live-Demo-pink)](https://women-health-tracker.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black)](https://github.com/MansiPanchal06/women-health-tracker)

## 🌐 Live Links
| Service | URL |
|---------|-----|
| 🎨 Frontend | https://women-health-tracker.vercel.app |
| ⚙️ Backend API | https://women-health-tracker-api.onrender.com |
| 💾 Database | MongoDB Atlas (Cloud) |

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔐 Authentication | Register, Login, JWT tokens, bcrypt hashing |
| 🩸 Period Tracker | Log cycles, predict next period, ovulation |
| 😊 Mood Tracker | Daily mood, energy & stress levels |
| 💧 Water Tracker | Daily intake, goals, progress bar |
| 📖 Health Blogs | Read articles by category & search |
| 👤 Profile | Update info, change password, cycle settings |

## 🛠️ Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- Axios
- React Router DOM
- Context API

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

### Security
- JWT (JSON Web Tokens)
- bcrypt password hashing

### Deployment
- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas

## 📁 Project Structure

\`\`\`
women-health-tracker/
├── client/                 # React Frontend
│   └── src/
│       ├── components/     # Reusable UI components
│       ├── pages/          # Page components
│       ├── context/        # Auth Context API
│       ├── services/       # Axios API calls
│       └── utils/          # Helper functions
│
└── server/                 # Node.js Backend
    ├── controllers/        # Business logic
    ├── models/             # MongoDB schemas
    ├── routes/             # API endpoints
    ├── middleware/         # JWT auth middleware
    └── config/             # Database config
\`\`\`

## 🚀 Run Locally

### Prerequisites
- Node.js v18+
- MongoDB Atlas account

### Backend Setup
\`\`\`bash
cd server
npm install
# Create .env file with your values
npm run dev
\`\`\`

### Frontend Setup
\`\`\`bash
cd client
npm install
# Create .env file with VITE_API_URL
npm run dev
\`\`\`

### Environment Variables

**server/.env**
\`\`\`
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
NODE_ENV=development
\`\`\`

**client/.env**
\`\`\`
VITE_API_URL=http://localhost:5000
\`\`\`

## 📸 Screenshots

### Dashboard
![Dashboard](screenshots/dashboard.png)

### Period Tracker
![Period](screenshots/period.png)

### Health Blogs
![Blogs](screenshots/blogs.png)

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |
| GET | /api/auth/profile | Get profile |
| POST | /api/period/add | Add period |
| GET | /api/period/predict | Get predictions |
| POST | /api/mood/add | Log mood |
| POST | /api/water/add | Add water |
| GET | /api/blog/all | Get all blogs |

## 👩‍💻 Developer

**Mansi Panchal**
- GitHub: [@MansiPanchal06](https://github.com/MansiPanchal06)
- LinkedIn: [Your LinkedIn URL]

## 📄 License
MIT License — feel free to use this project!

---
⭐ If you found this helpful, please give it a star!