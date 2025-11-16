# Full Stack Todo Application

A complete full-stack todo application built with React, TypeScript, Node.js, Express, and MongoDB.

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn

### Installation & Setup

1. **Clone or navigate to the project directory**

2. **Backend Setup:**
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/todoapp
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

3. **Frontend Setup:**
```bash
cd frontend
npm install
```

Start the frontend development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## 📁 Project Structure

```
fullstack-todo/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── models/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── utils/
│   │   ├── types/
│   │   └── app.ts
│   ├── package.json
|
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── store/
│   │   ├── lib/
│   │   └── App.tsx
│   ├── package.json
|
└── README.md
```

## 🎯 Features

### Authentication
- ✅ User Signup
- ✅ User Login
- ✅ Forgot Password
- ✅ Reset Password
- ✅ JWT Token Authentication
- ✅ Protected Routes

### Todo Management
- ✅ Create Todo
- ✅ List All Todos
- ✅ Update Todo Text
- ✅ Delete Todo
- ✅ Toggle Todo Completed Status

## 🛠️ Tech Stack

### Backend
- Node.js + Express + TypeScript
- MongoDB + Mongoose
- JWT Authentication
- bcrypt for password hashing
- Zod for validation
- Error logging to MongoDB

### Frontend
- React + TypeScript
- TailwindCSS
- Zustand (State Management)
- React Hook Form + Zod
- React Query
- React Router v6
- Axios

## 📡 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token

### Todos (Protected)
- `POST /api/todos` - Create todo
- `GET /api/todos` - Get all todos
- `PUT /api/todos/:id` - Update todo
- `PATCH /api/todos/:id/toggle` - Toggle todo status
- `DELETE /api/todos/:id` - Delete todo

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Protected API routes
- Input validation with Zod
- Error logging to MongoDB
- Axios interceptors for token handling

## 📝 Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/todoapp
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

## 🎨 UI Features

- Clean, minimal design (Notion/Trello style)
- Fully responsive (mobile-friendly)
- Reusable components
- Form validation with error messages
- Loading states
- Modal dialogs for editing

## 📚 Documentation

- [Backend README](./backend/README.md)
- [Frontend README](./frontend/README.md)

## 🚦 Running the Application

1. Start MongoDB (if running locally)
2. Start the backend: `cd backend && npm run dev`
3. Start the frontend: `cd frontend && npm run dev`
4. Open `http://localhost:3000` in your browser

## 📝 Notes

- All backend errors are logged to a MongoDB collection named `logs`
- JWT tokens expire after 7 days
- Password reset tokens expire after 1 hour
- Auth state persists in localStorage via Zustand

