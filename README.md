# FreshBasket — Grocery Delivery Platform

FreshBasket is a full-stack grocery delivery web application built as a Mega Intermediate Project. It provides customer and admin workflows with role-based authentication, a multi-collection MongoDB data model, clean REST APIs, and a fully integrated React frontend and Express backend.

## Core Features

- User registration and login with JWT authentication
- Role-based authorization for `user` and `admin`
- Grocery product browsing, search, category filtering and stock visibility
- Shopping cart with quantity updates and automatic totals
- Checkout and order placement
- User order history and order-status tracking
- Product reviews from authenticated users
- Admin product and category management
- Admin order management and status updates
- Responsive light/dark interface
- Centralized API error handling with proper HTTP status codes

## Data Model

FreshBasket uses six MongoDB collections:

1. Users
2. Categories
3. Products
4. Carts
5. Orders
6. Reviews

## Technology Stack

### Frontend
- React
- TypeScript
- Vite
- Redux Toolkit
- React Router
- Axios
- CSS

### Backend
- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- JWT
- bcryptjs

## Project Structure

```text
FreshBasket_Mega_Intermediate/
├── client/
│   └── src/
│       ├── api/
│       ├── components/
│       ├── pages/
│       ├── redux/
│       ├── types/
│       ├── App.tsx
│       └── main.tsx
├── server/
│   ├── scripts/
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       ├── types/
│       ├── utils/
│       ├── app.ts
│       └── server.ts
└── package.json
```

## Setup

Install root dependencies and both apps:

```bash
npm install
npm run install:all
```

Create `server/.env` using `server/.env.example` and create `client/.env` using `client/.env.example`.

Seed demo data:

```bash
npm run seed
```

Run frontend and backend together:

```bash
npm run dev
```

Frontend: `http://localhost:5173`

Backend: `http://localhost:5000`

## Demo Accounts

After running the seed command:

- Admin: `admin@freshbasket.com` / `Admin123!`
- User: `user@freshbasket.com` / `User123!`

## Mega Intermediate Acceptance Coverage

- Complex data model with at least 4 collections: **6 collections included**
- Role-based authentication: **user/admin JWT authorization included**
- Clean API contract and proper status codes: **included**
- Frontend and backend fully integrated: **included**

## Deployment

Recommended deployment:

- Frontend: Vercel
- Backend: Render, Railway, or Vercel serverless configuration
- Database: MongoDB Atlas
