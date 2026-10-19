# Task Manager (MERN)

A full-stack task management app: users register, log in, and manage their own tasks on a responsive dashboard.

## Features
- Register / login with JWT auth and bcrypt-hashed passwords
- Dashboard with total, pending, in-progress, completed counts and progress bar
- Task CRUD (title, description, due date, priority, status)
- Users can only access their own tasks
- Search and status filter, loading/error/success messages, mobile-friendly UI

## Tech Stack
React (Vite), React Router, Axios, Bootstrap 5, Node.js, Express, MongoDB + Mongoose, JWT, bcryptjs

## Local Setup
1. Clone the repo.
2. Backend:
   ```
   cd server
   npm install
   cp .env.example .env   # fill in values
   npm run dev
   ```
3. Frontend (new terminal):
   ```
   cd client
   npm install
   cp .env.example .env
   npm run dev
   ```
4. Open http://localhost:5173

## Environment Variables
**server/.env**: `PORT`, `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`
**client/.env**: `VITE_API_URL`

## API Endpoints
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | /api/auth/register | Create account | No |
| POST | /api/auth/login | Login | No |
| GET | /api/tasks | List my tasks | Yes |
| POST | /api/tasks | Create task | Yes |
| PUT | /api/tasks/:id | Update task | Yes |
| DELETE | /api/tasks/:id | Delete task | Yes |

## Screenshots
_Add screenshots: register, login, dashboard, task form, task list._

## Live Demo
https://projectment.netlify.app
