# Todo Backend API

Full-stack Todo Application Backend built with Node.js, Express, TypeScript, and MongoDB.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (running locally or MongoDB Atlas)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/todoapp
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

3. Start the development server:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

## 📡 API Endpoints

### Authentication

- `POST /api/auth/signup` - Create a new user account
- `POST /api/auth/login` - Login user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token

### Todos (Protected Routes)

- `POST /api/todos` - Create a new todo
- `GET /api/todos` - Get all todos for authenticated user
- `PUT /api/todos/:id` - Update todo text
- `PATCH /api/todos/:id/toggle` - Toggle todo completed status
- `DELETE /api/todos/:id` - Delete a todo

### Request Headers

For protected routes, include:
```
Authorization: Bearer <your-jwt-token>
```

## 🏗️ Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── db.ts
│   ├── models/
│   │   ├── User.ts
│   │   └── Todo.ts
│   ├── controllers/
│   │   ├── authController.ts
│   │   └── todoController.ts
│   ├── routes/
│   │   ├── authRoutes.ts
│   │   └── todoRoutes.ts
│   ├── middleware/
│   │   ├── auth.ts
│   │   └── errorHandler.ts
│   ├── utils/
│   │   └── logger.ts
│   ├── types/
│   │   └── dto.ts
│   └── app.ts
├── package.json
├── tsconfig.json
└── README.md
```

## 🔒 Security Features

- JWT authentication
- Password hashing with bcrypt
- Input validation with Zod
- Error logging to MongoDB
- Protected routes

## 📝 Notes

- All errors are logged to a MongoDB collection named `logs`
- Password reset tokens expire after 1 hour
- JWT tokens expire after 7 days

