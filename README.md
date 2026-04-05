# ToDo

A **Vue 3** single-page app for personal task management. It talks to a REST backend with **JWT** access and refresh tokens, and uses **Vuetify 4** for layout and components. The UI uses custom **light/dark purple** themes (see `src/core/plugins/vuetify.ts`).

---

## What you get

| Area                 | Behavior                                                                                                                                                        |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Home** (`/`)       | Simple welcome screen.                                                                                                                                          |
| **Tasks** (`/tasks`) | Grid of cards: task details, create, edit (title, body, category, deadline, completed), delete. Data loads on mount and updates optimistically after mutations. |
| **Auth**             | `/register`, `/login`, `/logout` — forms wired to the auth service; tokens persisted under `access` and `refresh` in `localStorage`.                            |
| **Shell**            | Persistent sidebar (`Navbar.vue`): navigation, theme toggle (emoji sun/moon).                                                                                   |

---

## Tech stack

| Layer     | Choice                                                                                                        |
| --------- | ------------------------------------------------------------------------------------------------------------- |
| Framework | Vue 3 (Composition API, `<script setup>`)                                                                     |
| UI        | Vuetify 4 + Material Design icons                                                                             |
| State     | Pinia (`auth` store: tokens, refresh helper)                                                                  |
| Routing   | Vue Router 5 (`createWebHistory`)                                                                             |
| HTTP      | Axios behind `FetchApiClient` (`src/core/services/apiCient.ts`) implementing `ApiClient` (`src/core/schemas`) |
| Build     | Vite 7, `@vitejs/plugin-vue`, `vite-plugin-vuetify`, Vue DevTools in dev                                      |
| Types     | TypeScript 5.9                                                                                                |
| Quality   | ESLint (Vue + TS), Prettier, Husky + lint-staged on commit                                                    |

---

## Requirements

- **Node.js** `^20.19.0` or `>=22.12.0` (see `package.json` → `engines`)

---

## Quick start

```bash
npm install
npm run dev
```

Open the URL Vite prints (typically **http://localhost:5173**).

### Production build

```bash
npm run build
npm run preview
```

`preview` serves the contents of `dist/` locally so you can sanity-check the bundle before deploy.

---

## Configuration

There is **no `.env` file** in the repo: the API **base URL** and path segments live in **`src/core/services/urls.ts`**.

- Change `urls.base` if your API is not at `http://127.0.0.1:8000/`.
- Adjust `urls.auth.*` and `urls.api.*` if your backend uses different routes.

Restart `npm run dev` after edits.

---

## Backend API (Django reference)

The routes below match the companion **Django** project layout: root `urlpatterns` in `todo_manager/urls.py` mount `path("api/", include("todo.urls"))` and `path("auth/", include("auth_user.urls"))`, plus admin and OpenAPI docs.

### Site root (Django)

| Path prefix          | Notes                                    |
| -------------------- | ---------------------------------------- |
| `admin/`             | Django admin                             |
| `api/`               | Task REST API (`todo/urls.py`)           |
| `auth/`              | JWT + registration (`auth_user/urls.py`) |
| `schema/`            | OpenAPI schema (drf-spectacular)         |
| `schema/swagger-ui/` | Swagger UI                               |

### `auth/` — `auth_user/urls.py`

| Path (after base URL)   | View / purpose                                   |
| ----------------------- | ------------------------------------------------ |
| `auth/tg/register/`     | Telegram registration (not used by this web app) |
| `auth/web/register/`    | Web registration                                 |
| `auth/token/`           | Obtain JWT pair (login)                          |
| `auth/token/refresh/`   | Refresh access token                             |
| `auth/token/blacklist/` | Blacklist refresh token (logout)                 |

### `api/` — `todo/urls.py`

| Path (after base URL) | View / purpose                                                  |
| --------------------- | --------------------------------------------------------------- |
| `api/list/`           | List tasks                                                      |
| `api/list/<int:pk>`   | Single task detail (**no** trailing slash after `pk` in Django) |
| `api/create/`         | Create task                                                     |
| `api/update/<int:pk>` | Update task                                                     |
| `api/delete/<int:pk>` | Delete task                                                     |

---

## What this SPA calls

All requests use `urls.base` from **`src/core/services/urls.ts`**. Paths are relative to that origin.

### Auth (no `Authorization` on register/login)

Used by this app:

| Method | Path                    | Purpose                                                                      |
| ------ | ----------------------- | ---------------------------------------------------------------------------- |
| POST   | `auth/web/register/`    | Register; tokens in `RegisterResponse` (`src/modules/auth/schemas/auth.ts`). |
| POST   | `auth/token/`           | Login → `LoginRefreshResponse`.                                              |
| POST   | `auth/token/refresh/`   | Body `{ refresh }` — new access (and refresh) tokens.                        |
| POST   | `auth/token/blacklist/` | Logout.                                                                      |

### Tasks (Bearer when logged in)

`makeAuthHeader()` sends `Authorization: Bearer <access>` if `localStorage` has `access`.

| Method | Path              | Purpose                     |
| ------ | ----------------- | --------------------------- |
| GET    | `api/list/`       | Load list → `TaskDetail[]`. |
| POST   | `api/create/`     | Create (`TaskCreate`).      |
| PATCH  | `api/update/<pk>` | Update (`TaskUpdate`).      |
| DELETE | `api/delete/<pk>` | Delete.                     |

**Not wired in this repo:** `GET api/list/<pk>` (detail) — the UI loads the full list and edits in place.

Task fields: `pk`, `title`, `body`, `category`, `deadline`, `completed`, `created_at`, `updated_at` — see `src/modules/todo/schemas/todo.ts`.

---

## Architecture notes

- **Modules**: Feature code sits under `src/modules/auth` and `src/modules/todo`; shared infrastructure is under `src/core`.
- **API layer**: One axios instance per base URL; typed `get` / `post` / `patch` / `delete` on `FetchApiClient`.
- **Auth and tasks**: Auth services call unauthenticated endpoints; todo services attach the Bearer header from Pinia/localStorage so the same client can be used for both styles.

---

## Scripts

| Command               | Description                                    |
| --------------------- | ---------------------------------------------- |
| `npm run dev`         | Dev server with HMR                            |
| `npm run build`       | Vite production build (`vite build`)           |
| `npm run preview`     | Serve `dist/`                                  |
| `npm run lint`        | ESLint over the project (`--fix`)              |
| `npm run format`      | Prettier for `src/**/*.{js,vue,css,scss,hmtl}` |
| `npm run format:html` | Prettier for `*.html`                          |

**Git hooks**: `prepare` installs Husky; staged JS/Vue/JSON/CSS/MD files are linted/formatted via lint-staged (see `package.json`).

---

## Project structure

```
src/
├── core/
│   ├── components/     # Navbar
│   ├── plugins/        # Vuetify themes (lightPurple / darkPurple)
│   ├── router/         # Root routes + module route imports
│   ├── schemas/        # Shared types (e.g. ApiClient)
│   ├── services/       # apiCient.ts, urls.ts
│   └── views/          # HomeView
├── modules/
│   ├── auth/
│   │   ├── routes/
│   │   ├── schemas/
│   │   ├── services/   # register, login, logout, refresh
│   │   ├── store/      # Pinia auth store
│   │   └── views/      # Login, Register, Logout
│   └── todo/
│       ├── components/ # TodoCreate, TodoDetail, TodoUpdate, TodoDelete, Datetime, …
│       ├── routes/
│       ├── schemas/    # Task types
│       ├── services/   # tasksListView, CRUD + utils (dates, auth header)
│       └── views/      # TodoView (task list page)
├── App.vue             # Shell: Navbar + <RouterView />
└── main.ts             # Vue, Vuetify, Pinia, router
```

**Import alias**: `@` → `src/` (see `vite.config.ts`).

---

## Troubleshooting

| Symptom                    | Things to check                                                                                                                                                                  |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tasks fail or stay empty   | Backend running; `urls.base` correct; user logged in so `access` exists in `localStorage`.                                                                                       |
| CORS errors                | Backend must allow the Vite origin (e.g. `http://localhost:5173`).                                                                                                               |
| 401 on tasks after a while | Refresh flow: store exposes `updateAccess()` using `auth/token/refresh/` — ensure your app calls it where appropriate (e.g. axios interceptor) if you add token expiry handling. |

---

If you adopt **environment-based URLs** later, prefer `import.meta.env` in Vite and keep `urls.ts` as a thin mapping from env to path constants.
