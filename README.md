# hehe_project
csci426 project
# hehe travels 2 ✈️

A modern, role-based flight management application built with React and Tailwind CSS. Users can register flights, manage bookings, and admins can create and manage flight data.

## Project Description

**hehe travels 2** is a simple yet elegant flight management platform designed to demonstrate role-based access control and modern UI/UX principles. The application supports two user roles:

- **User**: Can view available flights, register for flights, and manage their travel bookings.
- **Admin**: Can create, edit, and manage flight data in a centralized dashboard.

### Key Features

- 🔐 **Role-Based Authentication**: Simple login with two roles (user/admin) with password validation
- 🎨 **Modern UI**: Clean, gradient-based design using Tailwind CSS
- 📱 **Responsive Design**: Fully responsive layout that works on desktop and mobile devices
- ✈️ **Flight Management**: Admins can add, edit, and delete flights
- 📋 **Travel Registration**: Users can browse and register for available flights
- 🔓 **Session Management**: Logout functionality with automatic redirect to login
- 🎯 **Role-Based Navigation**: Different UI elements and routes based on user role
# hehe_project
csci426 project

# hehe travels 2 ✈️

A modern, role-based flight management application built with React and Tailwind CSS. The frontend now connects to a backend API (Node/Express) to persist and retrieve data.

## Project Summary

**hehe travels 2** is a simple flight management platform demonstrating role-based access control, CRUD operations for travel templates, user bookings, and a clean Tailwind UI. The app supports two roles (regular users and admins) and includes authentication handled by the backend API.

## Key Features

- 🔐 Role-Based Authentication (backend-supported)
- 🎨 Clean UI built with Tailwind CSS and responsive layouts
- ✈️ Admin CRUD for travels (create, edit, delete)
- 📋 User booking flow (register, view bookings, pay/cancel)
- 🧾 Persistent data via backend API endpoints (e.g., `/api/travels`, `/api/bookings`, `/api/login`)
- 🧩 Context-based state management with a `UserContext` provider

## Tech Stack

- **Frontend**: React 18 (Create React App)
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State Management**: React Context API
- **Backend**: Node.js + Express (API server). The frontend communicates with the backend API under `/api` (default base URL: http://localhost:5000).

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Frontend

1. Install dependencies:

```bash
npm install
```

2. Start the frontend dev server:

```bash
npm start
```

The frontend runs by default at `http://localhost:3000`.

### Backend (recommended)

The frontend expects a backend API at `http://localhost:5000/api` by default. If you have the backend available, start it so the frontend can fetch and persist data (endpoints used include `/api/travels`, `/api/bookings`, `/api/login`, `/api/SignUp`). Typical steps from the backend folder:

```bash
npm install
npm start # or `npm run dev` if using nodemon
```

To change the API base URL for the frontend, create a `.env` file in the project root and set:

```bash
REACT_APP_API_URL=http://localhost:5000
```

(Then update fetch/axios calls to use `process.env.REACT_APP_API_URL` if desired.)

## Roles & Credentials (demo)

This demo uses simple/demo credentials for local testing (replace with your backend users in production):

- **User**: `user` / `user`
- **Admin**: `admin` / `admin`

Note: The app uses role values from the backend (`user.role`) to hide/show UI elements (e.g., `Register`, `Manage`, `Bookings`).

## Project Structure (important files)

```
src/
├── App.js
├── index.js
├── App.css
├── index.css
├── components/
│   ├── About.jsx        # About page (role-specific content)
│   ├── Bookings.jsx     # User bookings list + pay/cancel actions
│   ├── Footer.jsx       # Footer with logout
│   ├── Home.jsx         # Landing + role-driven feature cards
│   ├── Login.jsx        # Login page (calls backend /api/login)
│   ├── Manage.jsx       # Admin dashboard: add/edit/remove travels
│   ├── Navbar.jsx       # Role-based navigation links
│   ├── Register.jsx     # User travel selection / booking UI
│   ├── SignUp.jsx       # Sign up form (calls backend /api/SignUp)
│   ├── update.jsx       # Edit travel form (styled similar to Register)
│   └── UserContext.js   # Provides `user`, `token`, `login()`, `logout()`
```

## Component Notes

- `UserContext` (`src/components/UserContext.js`): Wrap your app with `UserProvider` so `user` and auth helpers are available. The provider renders `children` (i.e., the nested app/UI) inside the context so they can consume the context values.

- `ProtectedRoute` (used in routing): checks `user` and optionally `allowedRoles`. If a user is unauthenticated it redirects to `/login`; if authenticated but not authorized it redirects to `/`.

- `Login.jsx`: Performs POST `/api/login`, then calls `login(userData, token)` from `UserContext` and navigates to `/` on success.

- `Manage.jsx`: Admin-only CRUD interface for travel templates; uses `/api/travels` endpoints.

- `Register.jsx`: Lists travels from `/api/travels`, lets users select one and POST a booking to `/api/bookings`.

- `Bookings.jsx`: Fetches bookings for the current user and allows payment (PUT) and cancel (DELETE) via `/api/bookings` endpoints.

- `update.jsx`: Styled edit form for a single travel template (fetches travel by id and PUTs updates to `/api/travels/:id`).

## Running the App Locally

1. Start the backend API on port 5000 (or set `REACT_APP_API_URL` to your API URL).
2. Start the frontend:

```bash
npm start
```

3. Open `http://localhost:3000`.

## Troubleshooting

- If the frontend cannot reach the API, verify the backend is running and the base URL in API calls matches your backend address.
- Check browser console and the network tab for failed requests.

## Future Work

- Switch to environment-based API base URL usage in all API calls
- Add JWT refresh / secure token handling
- Add server-side validation and better error messaging
- Add tests and CI pipeline

---

**Enjoy hehe travels 2! ✈️🌍**

- **Mobile**: Single-column layout, stacked components
- **Tablet**: Adjusted spacing and padding
- **Desktop**: Full-width layout with optimal spacing
- Uses Tailwind CSS breakpoints (`md:`, `lg:`) for responsive design

## Available Scripts

### `npm start`

Runs the app in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.
The build is minified and optimized for best performance.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

## Future Enhancements

- 🔐 Backend authentication with JWT tokens
- 💾 Database integration (MongoDB, Firebase)
- 📧 Email notifications for flight bookings
- 🗺️ Real flight data integration (FlightRadar, Skyscanner API)
- 💳 Payment integration for flight bookings
- 📊 Admin analytics dashboard
- 🌙 Dark mode toggle
- 🌍 Multi-language support

## Troubleshooting

### Port 3000 already in use
```bash
# Windows PowerShell
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Dependencies issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Clear browser cache
Press `Ctrl + Shift + Delete` and select "All time" to clear cache.

## License

This project is open source and available under the MIT License.

---

**Enjoy hehe travels 2! ✈️🌍**
