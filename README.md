# ![RealWorld Example App](logo.png)

> Full-stack [RealWorld](https://github.com/gothinkster/realworld) implementation powered by the React Router v7 framework, TypeScript, Tailwind CSS v4, and the official RealWorld API schema.

### Demo (coming soon) &nbsp;&nbsp;&nbsp;&nbsp; [Spec](https://github.com/gothinkster/realworld)

This project showcases a production-style CRUD application with authentication, feed management, markdown authoring, and responsive UI patterns. It follows idiomatic **React Router data APIs** (loaders/actions), keeps networking type-safe through OpenAPI-generated clients, and leans on SSR-first rendering for great SEO and performance.

For more background on the RealWorld initiative or to pair this frontend with other backends, visit the main [RealWorld](https://github.com/gothinkster/realworld) repository.

# How it works

This application uses modern web technologies and leverages React Router’s server + client data APIs for streaming SSR, nested routing, and optimistic UI patterns.

## Architecture Overview

### Core Technologies

- **React Router v7** – Framework mode with loader/action data APIs, SSR, and flat-routes
- **TypeScript** – End-to-end type safety (components, loaders, API wrappers)
- **Tailwind CSS v4** – Utility-first styling via the new `@tailwindcss/vite` plugin
- **OpenAPI tooling** – `openapi-typescript` + `openapi-fetch` for strongly typed API calls

### Key Architectural Patterns

#### 1. **SSR by Default**
- All routes stream HTML from the server before hydrating on the client.
- Subsequent navigation reuses loaders/actions for granular fetching.

#### 2. **Type-Safe API Layer**
- OpenAPI schema (`openapi/schema.yml`) generates `app/consts/schema.d.ts`.
- `openapi-fetch` + custom middleware ensure consistent headers and error handling.

#### 3. **Flexible Data Loading**
- Each route module exports loaders/actions for data mutations and fetching.
- Shared logic extracted into `app/hooks` and `app/libs` helpers.

#### 4. **Authentication Flow**
- JWT stored via secure HTTP-only cookie (`app/session.server.ts`).
- Loaders/actions gate access by checking `SESSION_SECRET`-backed sessions.
- Client API calls reuse the issued token through a fetch middleware.

#### 5. **Styling and Components**
- Tailwind v4 is configured once in `app/app.css`.
- Shared UI primitives live under `app/components` (buttons, navigation, avatars, etc.).

### Project Structure

```
app/
├── app.css                  # Tailwind v4 entry point
├── components/              # Presentational + reusable UI pieces
├── consts/                  # Global constants + generated API schema
├── hooks/                   # Custom hooks (session, fetcher, user state)
├── libs/
│   ├── actions/             # Shared loaders/actions helpers
│   ├── api/                 # Typed OpenAPI client + middleware
│   └── schemas/             # zod schemas for forms
├── routes/                  # File-system routes (fs-routes powered)
│   ├── _home.*              # Feed + tabbed home routes
│   ├── article.$slug.tsx    # Article detail
│   ├── editor.($slug.)      # Article craete/edit page
│   ├── login.tsx            # Login page
│   ├── register.tsx         # register page
│   ├── settings/            # Change User profile
│   ├── editor.($slug)/      # Create/update editor
│   ├── profile.$username.*  # Profile feeds
│   └── api.*                # Server-only API proxy routes
├── routes.ts                # `flatRoutes()` entry
├── root.tsx                 # Root layout, error boundary, document head
├── session.server.ts        # Cookie/session helpers
└── store/                   # Zustand-like user store for cross-route sharing
```

### Features

- ✅ **Authentication** - Register, login, logout with JWT
- ✅ **Articles** - Create, read, update, delete articles
- ✅ **Comments** - Add and delete comments to articles
- ✅ **Favorites** - Favorite/unfavorite articles
- ✅ **Follow** - Follow/unfollow users
- ✅ **Profiles** - View user profile pages
- ✅ **Editor** - Create/Edit markdown articles
- ✅ **Pagination** - Paginated article feeds
- ✅ **Tags** - Filter articles by tag
- ✅ **Feeds** - Your feed / Global feed

# Getting Started

## Prerequisites

- Node.js 18+ (the Dockerfile targets Node 20 Alpine)
- npm 9+ (lockfile committed as `package-lock.json`; pnpm/yarn will work but are not configured in CI)

## Installation

```sh
npm install
```

## Environment Variables

Create a `.env` file in the project root with the required secrets (no template file is committed):

```env
SESSION_SECRET=replace-with-long-random-string
NEXT_PUBLIC_API_ENDPOINT=https://api.realworld.show/api
```

- `SESSION_SECRET` powers the secure HTTP-only cookie in `app/session.server.ts`.
- `NEXT_PUBLIC_API_ENDPOINT` configures the OpenAPI client (`app/libs/api`); defaults to the public RealWorld API but can be pointed to any compatible backend.

Restart the dev server whenever these values change.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the React Router dev server with hot reloading (port logged in terminal, defaults to 5173). |
| `npm run build` | Create optimized client + server bundles in `./build`. |
| `npm run start` | Serve the production build via `react-router-serve` (defaults to port 3000, respects `PORT`). |
| `npm run typecheck` | Generate loader/action types (`react-router typegen`) and run `tsc --noEmit`. |
| `npm run openapi` | Regenerate `app/consts/schema.d.ts` from `openapi/schema.yml`. Run this after editing the schema. |

## Development

```sh
npm run dev
```

Open the logged local URL (usually http://localhost:5173). API requests proxy directly to `NEXT_PUBLIC_API_ENDPOINT`, so ensure CORS is properly configured if you switch to a self-hosted backend.

## Build & Preview

```sh
npm run build
npm run start
```

`npm run start` consumes the generated `build/server/index.js` output. Set `PORT` if you need something other than 3000.

## Docker

```
docker build -t realworld-remix .
docker run --rm -p 3000:3000 \
  -e SESSION_SECRET=replace-me \
  -e NEXT_PUBLIC_API_ENDPOINT=https://api.realworld.show/api \
  realworld-remix
```

The multi-stage Dockerfile installs dependencies, builds the project, and runs `npm run start` inside Node 20 Alpine. Provide your secrets at runtime (do not bake them into the image).

# Tech Stack

- **Framework**: React Router v7 (framework mode)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + custom CSS tokens
- **Networking**: `openapi-fetch`, `openapi-react-query`, and Zod validation helpers
- **State Management**: Route loaders/actions and lightweight stores in `app/store`
- **Authentication**: JWT via secure cookies + API middleware token forwarding

# Troubleshooting

- Missing types after modifying routes? Run `npm run typecheck` to refresh `react-router` typegen output.
- API requests failing locally? Double-check `NEXT_PUBLIC_API_ENDPOINT` and ensure CORS allows your dev origin.
- Session errors in development? Provide a long, random `SESSION_SECRET`; short strings will cause cookie signing failures.

# License

MIT