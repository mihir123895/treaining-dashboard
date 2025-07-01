
# 🎓 Training Management Dashboard (MERN Stack)

A full-featured training management system with **role-based dashboards** for Instructors and Trainees. Includes login/signup, progress tracking, password reset via OTP, and module assignment features.

---

## 📌 Features

### 👨‍🎓 Trainee
- View assigned training modules
- Mark modules as completed
- View personal training progress (completed, pending, % done)
- Update profile info

### 👨‍🏫 Instructor
- View all registered trainees
- Add or delete training modules
- Assign modules to trainees
- Track each trainee's module progress

### 🔐 Authentication
- Signup & Login with JWT (stored in cookie)
- Role-based access control (`instructor` / `trainee`)
- Forgot password via email OTP
- Reset password securely
- Logout
- Profile update

---

## 🧰 Tech Stack

| Layer       | Technology         |
|-------------|--------------------|
| Backend     | Node.js, Express.js |
| Frontend    | React.js (recommended) |
| Database    | MongoDB with Mongoose |
| Auth        | JWT (JSON Web Tokens), bcryptjs |
| Mail        | Nodemailer (OTP Support) |

---

## 📁 Folder Structure (Backend)

```
├── controllers/
│   ├── UserController.js
│   └── moduleController.js
├── models/
│   ├── User.js
│   └── Module.js
├── routes/
│   ├── user.js
│   └── module.js
├── middleware/
│   ├── auth.js
│   └── authorizeRole.js
├── config/
│   └── nodemailer.js
├── .env
├── server.js
└── package.json
```

---

## 🚀 Getting Started (Backend)

### 1. Clone Repo
```bash
git clone https://github.com/your-username/training-dashboard.git
cd training-dashboard
```

### 2. Install Packages
```bash
npm install
```

### 3. Set Up `.env`
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
SENDER_EMAIL=your_email@gmail.com
SENDER_PASS=your_email_password_or_app_password
```

### 4. Start Server
```bash
npm run dev
```

> Make sure MongoDB is running. You can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or `mongod` locally.

---

## 📡 API Endpoints

### ✅ Auth

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/user/register` | Register new user |
| POST | `/api/user/login` | Login user |
| POST | `/api/user/logout` | Logout user |
| PUT | `/api/user/update-profile` | Update user profile |
| POST | `/api/user/forgot-password` | Send OTP to email |
| POST | `/api/user/reset-password` | Reset password with OTP |
| GET | `/api/user/all-users` | (Instructor only) Get all users |

### 📚 Modules

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/module/create` | (Instructor) Create & assign module |
| DELETE | `/api/module/:id` | (Instructor) Delete module |
| GET | `/api/module/all-progress` | (Instructor) View all trainee progress |
| GET | `/api/module/my` | (Trainee) View my modules |
| PATCH | `/api/module/complete/:id` | (Trainee) Mark module as complete |
| GET | `/api/module/my-progress` | (Trainee) View my progress stats |

---

## 🌐 Frontend (Recommended)

Frontend can be built using **React.js**, with:
- Conditional dashboards based on user role
- Charts (e.g., [Recharts](https://recharts.org/), [Chart.js](https://www.chartjs.org/))
- Axios for API calls
- Cookie-based token auth

---

## 🏁 Deployment

- Backend: [Render](https://render.com), [Railway](https://railway.app)
- Frontend: [Vercel](https://vercel.com), [Netlify](https://netlify.com)

---

## 👨‍💻 Author

- **Mihir Patel**
- Full Stack Developer | MERN Stack | Internship Project

---

## 📜 License

This project is for educational & internship purposes only.

---

## 🧪 Dummy API Endpoints (for Testing)

These endpoints are useful during frontend integration and testing.

### 👤 User

| Method | Route | Description |
|--------|-------|-------------|
| GET    | `/api/user/me`               | Get current logged-in user info (token required) |
| PUT    | `/api/user/update-profile`   | Update user profile (protected) |
| POST   | `/api/user/logout`           | Logout and clear cookie |

### 📦 Modules

| Method | Route | Description |
|--------|-------|-------------|
| GET    | `/api/module/my`             | Get trainee's assigned modules |
| GET    | `/api/module/my-progress`    | Get trainee's module progress |
| PATCH  | `/api/module/complete/:id`   | Mark a module as complete |

### 👨‍🏫 Instructor-only (Protected)

| Method | Route | Description |
|--------|-------|-------------|
| GET    | `/api/user/all-users`       | Get all users (instructors only) |
| POST   | `/api/module/create`        | Create and assign a training module |
| DELETE | `/api/module/:id`           | Delete a module |
| GET    | `/api/module/all-progress`  | Get progress stats of all trainees |

> 🔐 All protected routes require JWT token (in cookie).


---

## 🧪 Dummy API Endpoints Usage Guide (For Postman)

### 🔐 AUTH & USER

#### POST `/api/user/register`
**Registers a new user**
```json
{
  "username": "mihir",
  "email": "mihir@example.com",
  "password": "mihir123",
  "role": "trainee"
}
```

#### POST `/api/user/login`
**Logs in user & sets cookie**
```json
{
  "email": "mihir@example.com",
  "password": "mihir123"
}
```

#### POST `/api/user/forgot-password`
**Sends OTP to email**
```json
{
  "email": "mihir@example.com"
}
```

#### POST `/api/user/reset-password`
**Resets password with OTP**
```json
{
  "email": "mihir@example.com",
  "otp": "123456",
  "newPassword": "newpass123"
}
```

#### PUT `/api/user/update-profile` (Protected)
**Update personal info**
```json
{
  "username": "Mihir Patel",
  "photo": "data:image/png;base64,...",
  "gender": "Male",
  "dob": "2004-04-02",
  "phone": "9876543210",
  "role": "trainee"
}
```

#### GET `/api/user/all-users` (Instructor only)
**Returns all users**

#### POST `/api/user/logout`
**Logs out the user**

---

### 📚 MODULES

#### POST `/api/module/create` (Instructor only)
**Creates and assigns training modules**
```json
{
  "title": "Module 1",
  "description": "Learn Node.js",
  "assignedTo": ["userId1", "userId2"]
}
```

#### DELETE `/api/module/:id` (Instructor only)
**Deletes a module by ID**

#### GET `/api/module/all-progress` (Instructor only)
**View trainee progress**

#### GET `/api/module/my` (Trainee only)
**View modules assigned to trainee**

#### PATCH `/api/module/complete/:id` (Trainee only)
**Mark module as complete**

#### GET `/api/module/my-progress` (Trainee only)
**View completed vs. pending modules**

---

> ⚠️ For protected routes, ensure JWT token is sent via cookie.
