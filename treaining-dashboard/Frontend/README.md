# 🧠 Training Management Dashboard

A full-stack web app for managing training modules with **role-based access control** for instructors and trainees. Built with React, Node.js, MongoDB, and JWT authentication. Includes charts, module assignment, OTP-based password reset, and user profile editing.

---

## 🚀 Features

### 👨‍🏫 Instructor
- View all registered trainees
- Create & assign training modules
- Track each trainee’s progress
- Delete modules
- Visual progress charts

### 👨‍🎓 Trainee
- View assigned modules
- Mark modules as completed
- Track overall progress stats
- View charts of completed vs pending

### 🔐 Authentication
- Secure login & register with JWT
- Role-based dashboard access
- Forgot/reset password (via email OTP)
- Profile update (username, dob, gender, etc.)

---

## 🧰 Tech Stack

| Frontend | Backend | Database | Others |
|----------|---------|----------|--------|
| React + Vite | Node.js + Express | MongoDB | JWT, bcrypt, nodemailer |
| React Router DOM | | | Axios, react-toastify, react-icons |
| Chart.js + Recharts | | | CSS Modules |

---

## 📂 Project Structure (Frontend)

```
src/
├── components/     # Navbar, AuthForm, Cards, Charts
├── pages/          # Login, Dashboard, Profile, etc.
├── styles/         # Component-specific CSS
├── context/        # Global AuthContext
├── utils/          # Protected routes
├── App.jsx / main.jsx
```

---

## 📦 Setup Instructions

### 1. Backend Setup

- Clone the repo and install dependencies

```bash
cd backend
npm install
```

- Add a `.env` file with:

```env
JWT_SECRET=your_jwt_secret
MONGO_URI=your_mongo_connection_string
SENDER_EMAIL=your_email@example.com
EMAIL_PASSWORD=your_app_password
```

- Run backend

```bash
npm start
```

### 2. Frontend Setup

```bash
cd frontend
npm install
```

- Create `.env` file:

```env
VITE_API_BASE_URL=http://localhost:5000
```

- Run frontend

```bash
npm run dev
```

---

## ✨ Libraries Used

- Axios – HTTP requests
- React Toastify – Notifications
- Chart.js + Recharts – Stats and graphs
- React Icons – Modern icon set
- React Router DOM – Page routing

```md
![Dashboard](./screenshots/dashboard.png)
```

---

## 🙌 Author

Made with 💙 by **Patel Mihir**  
Project curated, designed, and built with clarity, visuals, and real-world structure.