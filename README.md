# RomaTech.Ai

Marketing site + client portal for RomaTech.Ai — AI voice and chat agents for home service businesses.

Monorepo:

```
/frontend   Vite + React (JavaScript), Tailwind CSS, Framer Motion
/backend    FastAPI (Python), SQLAlchemy + Alembic, PostgreSQL
```

## Prerequisites

- Node.js 18+
- Python 3.12 (3.14 currently fails to build some native wheels — use 3.12)
- Docker (for local Postgres via `docker-compose`)

## 1. Database

From the repo root:

```bash
docker compose up -d
```

Starts Postgres 16 on `localhost:5432` with user/password/db `romatech` (see `docker-compose.yml`).

## 2. Backend

```bash
cd backend
python3.12 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

Edit `.env` if needed (defaults match `docker-compose.yml`). Then run the initial migration:

```bash
alembic upgrade head
```

Start the API:

```bash
uvicorn app.main:app --reload --port 8000
```

API is now at `http://localhost:8000`, interactive docs at `http://localhost:8000/docs`.

### Creating an admin user

There's no signup flow for admins — register normally through the app, then promote the account:

```sql
UPDATE users SET role = 'admin' WHERE email = 'you@example.com';
```

### Running migrations

```bash
# after changing a model
alembic revision --autogenerate -m "describe the change"
alembic upgrade head
```

## 3. Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Runs at `http://localhost:5173`. `VITE_API_BASE_URL` in `.env` should point at the backend (`http://localhost:8000/api` by default).

## Notes on auth

- Access tokens (15 min) are kept in memory on the frontend (never localStorage) and sent as `Authorization: Bearer`.
- Refresh tokens (7 days) are set as an httpOnly cookie scoped to `/api/auth`, and are hashed before being stored in the `refresh_tokens` table.
- On page load, the frontend calls `POST /api/auth/refresh` once to silently restore a session from the cookie.
- An axios interceptor catches a single 401, retries `/api/auth/refresh`, and replays the original request once.

## Editing marketing copy

All public-facing copy — hero, problem cards, pricing tiers, FAQ, demo chat script — lives in [`frontend/src/data/content.js`](frontend/src/data/content.js). Edit it directly; no component changes needed for copy tweaks.

The voice demo expects an audio file at `frontend/public/demo/sample-call.mp3` — add your own recording there (the path is set in `content.js`).

## Project structure

```
backend/
  app/
    core/       config, database session, security (JWT/bcrypt), deps (get_current_user, require_admin), rate limiter, error helpers
    models/     SQLAlchemy models: User, Lead, RefreshToken
    schemas/    Pydantic request/response schemas
    routers/    auth, users, leads, admin
  alembic/      migrations

frontend/
  src/
    components/           marketing site components
    components/dashboard/ client + admin portal components
    context/               AuthContext
    data/content.js         all marketing copy
    lib/                    axios instance, token store
    pages/                  route-level pages
```
