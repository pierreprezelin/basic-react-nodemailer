# Basic React NodeMailer

A basic boilerplate to send emails from an input, with the help of [React](https://react.dev/), [Node.js](https://nodejs.org/) and [Resend](https://resend.com/).

**It features:**

- 2 variants: `classic/` (plain REST) and `trpc/` (end-to-end type-safety with [tRPC](https://trpc.io/))
- 2 examples for each variant, one with the Next.js API and one with base React and a Node.js ([Express](https://expressjs.com/)) server
- Success and error handling, with human-readable messages
- Server-side schema validation with [Zod](https://zod.dev/)

## Setup

**You'll need a Resend account to create your own API keys. Don't forget to create a `.env.local` file at the root of each of the main folders below with `RESEND_API_KEY=<your-key>`.**

All commands are for [Bun](https://bun.com/), but you can use your package manager of choice ([npm](https://www.npmjs.com/), [pnpm](https://pnpm.io/fr/), [yarn](https://yarnpkg.com/)...)

The repo is a workspace: run `bun i` once at the root to install every sub-project's packages in a single command.

Each variant (`classic/` and `trpc/`) contains the same 3 folders:

### 📂 nextjs

Using Next.js included API system for an all-in-one implementation:

1. Install packages with `bun i`
2. Run `bun dev`
3. The server will now run on `localhost:3000`

### 📂 client+server/react

Using React in its native form, with React Router and the server in the `client+server/node-express/` folder:

1. Install packages with `bun i`
2. Run `bun dev`
3. The server will now run on `localhost:5173`

### 📂 client+server/node-express

Used for in the `client+server/react/` folder to setup a Node.js server with the Express framework:

1. Install packages with `bun i`
2. Run `bun server.ts`
3. The server will now run on `localhost:5001`
