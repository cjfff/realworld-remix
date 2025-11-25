# ![RealWorld Example App](logo.png)

> ### [Remix + React Router] codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld) spec and API.

### [Demo](#) &nbsp;&nbsp;&nbsp;&nbsp; [RealWorld](https://github.com/gothinkster/realworld)

This codebase demonstrates a fully fledged fullstack application built with **Remix** and **React Router** including CRUD operations, authentication, routing, and more.

Every effort has been made to stay true to **React Router** and **Remix** best practices.

For more on how this project works, or to try with other frontends/backends, see the main [RealWorld](https://github.com/gothinkster/realworld) repo.

# How it works

This application uses modern web technologies and leverages the power of Remix for SSR, React Router for client-side navigation, and idiomatic React throughout.

## Architecture Overview

### Core Technologies

- **Remix** – Modern fullstack React framework with first-class SSR support
- **React Router** – Powerful routing for data loading & nested UIs
- **TypeScript** – Type-safe development
- **Tailwind CSS** – Utility-first CSS framework

### Key Architectural Patterns

#### 1. **Server-side Rendering by Default**
- All routes render on the server initially for optimal SEO and fast page loads.
- Client-side transitions and data loading handled by React Router.

#### 2. **Type-Safe API Layer**
- All API entities fully typed using TypeScript interfaces.
- Error handling and validation integrated at endpoints.

#### 3. **Flexible Data Loading**
- Loader functions fetch data on both server and client.
- Mutations handled via Remix's action API.

#### 4. **Authentication Flow**
- JWT stored in secure, HTTP-only cookies.
- Authentication checked in loaders and actions.
- Session managed via cookie utilities.

#### 5. **Styling and Components**
- Tailwind CSS preconfigured.
- Global utility class support and purging for production.

### Project Structure

```
app/
├── routes/                  # Route modules
│   ├── articles.tsx         # Article pages
│   ├── editor.tsx           # Editor form
│   ├── login.tsx            # Authentication pages
│   ├── profile.tsx          # User profile
│   └── settings.tsx         # User settings
├── components/              # Shared UI components
├── styles/                  # Tailwind CSS setup
├── utils/                   # Utility functions (API, session, etc)
├── entry.client.tsx         # Remix entry for client
├── entry.server.tsx         # Remix entry for server
└── root.tsx                 # Root layout and error boundaries
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

- Node.js 18+
- npm (or pnpm/yarn)

## Installation

```sh
npm install
```

## Environment Variables

Copy and edit `.env.example`:

```env
API_URL=https://api.realworld.show/api
SESSION_SECRET=your-secret-key-here
```

## Development

Start the development server with HMR:

```sh
npm run dev
```

Visit http://localhost:5173 to view the app.

## Build for Production

```sh
npm run build
```

## Deployment

### Docker

```sh
docker build -t realworld-remix .
docker run -p 3000:3000 realworld-remix
```
Docker can be deployed to any platform supporting containers.

### DIY Node

Deploy the output of `npm run build`. The server is production-ready.

```
├──
