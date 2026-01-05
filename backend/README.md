# E-Commerce Backend

This repository contains the backend for the NTI e‑commerce project — a RESTful API built with Node.js, Express and MongoDB that powers the frontend application.

## Table of contents
- [Features](#features)
- [Tech stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Environment](#environment)
- [Installation](#installation)
- [Available scripts](#available-scripts)
- [Running the app](#running-the-app)
- [API overview](#api-overview)
- [Authentication](#authentication)
- [Database seeding](#database-seeding)
- [Testing](#testing)
- [Docker](#docker)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features
- User registration and authentication (JWT)
- Product catalog (CRUD)
- Categories management
- Shopping cart and orders
- Basic role-based access control (user / admin)
- Validation and error handling
- Database seeding for dev/testing

## Tech stack
- Node.js
- Express
- MongoDB (Mongoose)
- JSON Web Tokens (JWT)
- bcrypt (password hashing)
- dotenv (environment variables)
- nodemon (development)

## Prerequisites
- Node.js 18+ (or compatible LTS)
- npm or yarn
- MongoDB instance (local or cloud — e.g., MongoDB Atlas)
- (Optional) Docker

## Environment
Create a `.env` file in the `backend` directory (or root if configured) with the variables below. Example:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=10
# Optional: for external services (email, payments)
# SMTP_HOST=
# SMTP_PORT=
# STRIPE_SECRET_KEY=
```

Keep secrets out of source control.

## Installation

From the `backend` folder:

```bash
# install dependencies
npm install
# or
yarn install
```

## Available scripts

Typical scripts defined in package.json (adjust if different):

- `npm run dev` — start in development mode with nodemon
- `npm start` — start production server (node / pm2)
- `npm test` — run tests
- `npm run lint` — run linting (if configured)
- `npm run seed` — seed the database with sample data (if a seed script exists)

## Running the app

Start the development server:

```bash
npm run dev
```

By default the API will be available at `http://localhost:5000/` (or the `PORT` defined in `.env`).

## API overview

Base URL: `/api/v1` (adjust if routes differ)

Important endpoints (examples — adjust to match implementation):

- Auth
  - `POST /api/v1/auth/register` — register new user
  - `POST /api/v1/auth/login` — login (returns JWT)
  - `GET  /api/v1/auth/me` — get current user (protected)
- Users (admin)
  - `GET /api/v1/users` — list users
  - `GET /api/v1/users/:id` — get user
  - `PUT /api/v1/users/:id` — update user
  - `DELETE /api/v1/users/:id` — delete user
- Products
  - `GET /api/v1/products` — list/filter products
  - `GET /api/v1/products/:id` — product details
  - `POST /api/v1/products` — create product (admin)
  - `PUT /api/v1/products/:id` — update product (admin)
  - `DELETE /api/v1/products/:id` — delete product (admin)
- Categories
  - `GET /api/v1/categories`
  - `POST /api/v1/categories` (admin)
- Cart / Orders
  - `POST /api/v1/cart` — add/update cart
  - `POST /api/v1/orders` — place order
  - `GET /api/v1/orders` — list user orders
  - `GET /api/v1/orders/:id` — order detail (owner or admin)

Notes:
- All `POST`, `PUT`, `DELETE` endpoints expect JSON requests with the appropriate Content-Type header.
- Use query params for filtering, sorting, pagination (e.g., `?page=1&limit=10&sort=-createdAt`).

## Authentication
- JWT-based authentication is used. Include header:
  - `Authorization: Bearer <token>`
- Passwords are hashed with bcrypt before storing.
- Certain routes are protected with authentication middleware; role checks are applied where admin privileges are required.

## Database seeding
If a seed script is available (e.g., `scripts/seed.js`), run:

```bash
npm run seed
# or
node scripts/seed.js
```

This will populate sample users, products, and categories to speed local development.

## Testing
If tests are included (Jest, Mocha, etc.):

```bash
npm test
```

Write unit and integration tests for routes, controllers, and models. For integration tests, use a dedicated test database or in-memory MongoDB (mongodb-memory-server).

## Docker (optional)
A sample `Dockerfile` and `docker-compose.yml` may be provided to run the API with MongoDB:

- Build image:
  ```bash
  docker build -t ecommerce-backend .
  ```
- Run with docker-compose:
  ```bash
  docker-compose up -d
  ```

Ensure environment variables are provided via `.env` or `docker-compose.yml`.

## Deployment
- Ensure `NODE_ENV=production`.
- Use process managers like PM2 or containers.
- Use a managed MongoDB (Atlas) or a production-grade DB instance.
- Keep JWT secret and other credentials in secure storage (Vault, cloud secret manager).

## Contributing
- Follow existing code style (ESLint, Prettier if configured).
- Open an issue to discuss major changes.
- Submit pull requests with clear titles and descriptions.
- Add tests for new features and run the test suite.

## Troubleshooting
- MongoDB connection issues: verify `MONGO_URI` and that the DB accepts connections.
- JWT auth issues: ensure `JWT_SECRET` is set and tokens are not expired.
- Port conflicts: check `PORT` in `.env`.

## License
Specify your project license here (e.g., MIT). Update `LICENSE` file accordingly.

## Contact
For questions, reach out to the maintainers listed in the repository or open an issue.
