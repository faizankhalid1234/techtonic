# Tech Tonic — Backend API

Express + MongoDB API for auth and orders.

## Setup

```bash
cd backend
cp env.sample .env
# Edit .env with your MongoDB URI and JWT_SECRET (must match frontend .env.local)
npm install
npm run dev
```

Runs on **http://127.0.0.1:4000**

## Endpoints

- `GET /api/health`
- `POST /api/auth/register` — `{ name, email, password }`
- `POST /api/auth/login` — `{ email, password }`
- `POST /api/auth/logout`
- `GET /api/auth/me` — `{ user: { name, email } | null }`
- `POST /api/orders` — requires session cookie
