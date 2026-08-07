# RomaTech.Ai

Marketing site + client portal for RomaTech.Ai — AI voice and chat agents for home service businesses.

Monorepo:

```
/frontend   Vite + React (JavaScript), Tailwind CSS, Framer Motion
/backend    FastAPI (Python), SQLAlchemy + Alembic, MySQL
```

## Prerequisites

- Node.js 18+
- Python 3.12 (3.14 currently fails to build some native wheels — use 3.12)
- Docker (for local MySQL via `docker-compose`)

## 1. Database

From the repo root:

```bash
docker compose up -d
```

Starts MySQL 8 on `localhost:3306` with user/password/db `romatech` (see `docker-compose.yml`). If port 3306 is already taken by another local MySQL install, either stop that one or change the port mapping in `docker-compose.yml` and update `DATABASE_URL` to match.

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

## Deploying to Hostinger (Business/Cloud hPanel)

Everything — frontend, backend, and database — runs on Hostinger. No external services needed.

### Database (MySQL, via hPanel)

1. hPanel → **Databases → MySQL Databases**. Create a database and a user, and note the host, database name, username, and password.
2. Your production `DATABASE_URL` (set as an env var, never committed):
   ```
   mysql+pymysql://<user>:<password>@<host>:3306/<database>
   ```

### Backend (FastAPI, via hPanel Python App)

1. hPanel → **Advanced → Setup Python App** → Create Application.
   - Application root: the `backend` folder of this repo (upload the whole repo via Git or File Manager first, or connect the GitHub repo if your plan supports it).
   - Application URL: pick the subdomain you want for the API, e.g. `api.yourdomain.com`.
   - Application startup file: `passenger_wsgi.py` (already in `backend/` — it wraps the FastAPI app for Passenger via `a2wsgi`, since Passenger speaks WSGI and FastAPI is ASGI).
2. hPanel gives you an "Enter to virtual environment" command — SSH in and run it, then:
   ```bash
   pip install -r requirements.txt
   alembic upgrade head
   ```
3. In the Python App's environment variables section, set:
   ```
   DATABASE_URL=mysql+pymysql://<user>:<password>@<host>:3306/<database>
   JWT_SECRET_KEY=<a long random string — generate one, don't reuse the local dev one>
   JWT_ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=15
   REFRESH_TOKEN_EXPIRE_DAYS=7
   CORS_ORIGINS=["https://app.yourdomain.com"]
   ENV=production
   ```
4. Restart the app from hPanel. Visit `https://api.yourdomain.com/docs` to confirm it's live.

### Frontend (React, static files)

1. Locally, set `frontend/.env` → `VITE_API_BASE_URL=https://api.yourdomain.com/api`, then build:
   ```bash
   npm run build
   ```
2. hPanel → **Subdomains** → create `app.yourdomain.com` (or use the root domain).
3. Upload everything from `frontend/dist/` into that subdomain's document root (File Manager or FTP).
4. Add an `.htaccess` file in that same folder so client-side routing works on refresh:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

## Notes on auth

- Access tokens (15 min) are kept in memory on the frontend (never localStorage) and sent as `Authorization: Bearer`.
- Refresh tokens (7 days) are set as an httpOnly cookie scoped to `/api/auth`, and are hashed before being stored in the `refresh_tokens` table.
- On page load, the frontend calls `POST /api/auth/refresh` once to silently restore a session from the cookie.
- An axios interceptor catches a single 401, retries `/api/auth/refresh`, and replays the original request once.
- The refresh cookie is `SameSite=None; Secure` so it works when frontend and backend are on different subdomains (e.g. `app.` vs `api.`). This requires HTTPS on both — Hostinger's subdomains and Python Apps get free SSL by default.

## Editing marketing copy

All public-facing copy — hero, problem cards, pricing tiers, FAQ, demo chat script — lives in [`frontend/src/data/content.js`](frontend/src/data/content.js). Edit it directly; no component changes needed for copy tweaks.

The voice demo expects an audio file at `frontend/public/demo/sample-call.mp3` — add your own recording there (the path is set in `content.js`).

## Project structure

```
backend/
  app/
    core/       config, database session, security (JWT/bcrypt), deps (get_current_user, require_admin), rate limiter, error helpers, GUID type (portable UUID column for MySQL)
    models/     SQLAlchemy models: User, Lead, RefreshToken
    schemas/    Pydantic request/response schemas
    routers/    auth, users, leads, admin
  alembic/      migrations
  passenger_wsgi.py   Hostinger/Passenger entry point (wraps FastAPI for WSGI)

frontend/
  src/
    components/           marketing site components
    components/dashboard/ client + admin portal components
    context/               AuthContext
    data/content.js         all marketing copy
    lib/                    axios instance, token store
    pages/                  route-level pages
```
