# Job_Clickers

Monorepo with two apps:

- `backend/` - Express + MongoDB API
- `front-end/` - Next.js app router frontend

## Layout

- `backend/index.js` starts the API server
- `backend/routes/` contains route definitions
- `backend/controllers/` contains request handlers
- `front-end/app/` contains route pages
- `front-end/src/` contains shared UI, hooks, Redux, and utilities

## Run

Backend:

```sh
cd backend
npm run dev
```

Frontend:

```sh
cd front-end
npm run dev
```

## Environment Files

The project uses separate `.env` files for the backend and frontend.

### `backend/.env`

Purpose:

- stores server-only configuration
- connects the API to MongoDB
- configures authentication and app runtime settings
- holds third-party OAuth placeholders for future use

Current keys:

- `MONGO_URI` - MongoDB connection string
- `DB_NAME` - database name appended to the URI
- `PORT` - backend server port# Job_Clickers

Monorepo with two apps:

- `backend/` - Express + MongoDB API
- `front-end/` - Next.js app router frontend

## Layout

- `backend/index.js` starts the API server
- `backend/routes/` contains route definitions
- `backend/controllers/` contains request handlers
- `front-end/app/` contains route pages
- `front-end/src/` contains shared UI, hooks, Redux, and utilities

## Run

Backend:

```sh
cd backend
npm run dev
```

Frontend:

```sh
cd front-end
npm run dev
```

## Environment Files

The project uses separate `.env` files for the backend and frontend.

### `backend/.env`

Purpose:

- stores server-only configuration
- connects the API to MongoDB
- configures authentication and app runtime settings
- holds third-party OAuth placeholders for future use

Current keys:

- `MONGO_URI` - MongoDB connection string
- `DB_NAME` - database name appended to the URI
- `PORT` - backend server port
- `JWT_SECRET` - signs and verifies auth tokens
- `SESSION_SECRET` - session-related secret
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` - Google OAuth placeholders
- `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` - GitHub OAuth placeholders

### `front-end/.env`

Purpose:

- stores client-side configuration for the Next.js app
- tells the frontend where the backend API lives
- only exposes values meant to be public in the browser

Current keys:

- `NEXT_PUBLIC_BASE_URL` - base URL for API requests from the frontend

### Notes

- Do not commit real secrets in a public repository.
- Backend env values should stay private because they are used on the server.
- Frontend env values are only safe to expose if they are prefixed with `NEXT_PUBLIC_`.

- `JWT_SECRET` - signs and verifies auth tokens
- `SESSION_SECRET` - session-related secret
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` - Google OAuth placeholders
- `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` - GitHub OAuth placeholders

### `front-end/.env`

Purpose:

- stores client-side configuration for the Next.js app
- tells the frontend where the backend API lives
- only exposes values meant to be public in the browser

Current keys:

- `NEXT_PUBLIC_BASE_URL` - base URL for API requests from the frontend

### Notes

- Do not commit real secrets in a public repository.
- Backend env values should stay private because they are used on the server.
- Frontend env values are only safe to expose if they are prefixed with `NEXT_PUBLIC_`.
