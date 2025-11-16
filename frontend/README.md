# Todo Frontend

Full-stack Todo Application Frontend built with React, TypeScript, TailwindCSS, and modern React libraries.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Backend server running (see backend README)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The app will run on `http://localhost:3000`

## 🏗️ Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   └── ProtectedRoute.tsx
│   ├── lib/
│   │   ├── api.ts
│   │   └── schemas.ts
│   ├── pages/
│   │   ├── Signup.tsx
│   │   ├── Login.tsx
│   │   ├── ForgotPassword.tsx
│   │   ├── ResetPassword.tsx
│   │   └── Todos.tsx
│   ├── services/
│   │   ├── authService.ts
│   │   └── todoService.ts
│   ├── store/
│   │   └── authStore.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🎨 Features

- **Authentication**: Signup, Login, Forgot Password, Reset Password
- **Todo Management**: Create, Read, Update, Delete, Toggle completed status
- **Protected Routes**: Automatic redirect for unauthenticated users
- **State Management**: Zustand with localStorage persistence
- **Form Validation**: React Hook Form with Zod schemas
- **API Integration**: React Query for data fetching and caching
- **Responsive Design**: Mobile-first TailwindCSS styling

## 🔧 Technologies

- React 18
- TypeScript
- TailwindCSS
- Zustand
- React Hook Form
- React Query
- React Router v6
- Axios
- Zod

## 📝 Notes

- Auth token is stored in Zustand with localStorage persistence
- API requests automatically include JWT token via axios interceptors
- All forms are validated using Zod schemas
- Protected routes redirect to login if user is not authenticated

