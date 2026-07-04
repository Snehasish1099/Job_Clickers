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
