# Basic React NodeMailer

A simple setup to send emails from an input, with the help of [React](https://react.dev/), [Node.js](https://nodejs.org/) and [Resend](https://resend.com/). As it's for learning purpose, the 3 projects are in the same repository to keep things tidy.

**It features:**

- 2 examples, one with the Next.js API and one with base React and an Node.js ([Express](https://expressjs.com/)) server
- Rate limits to prevent spam (with a timer with for better UX)
- Schema validation on both client and server-side with [Zod](https://zod.dev/)
- Success and error handling, with human-readable messages

## Setup

**You'll need a Resend account to create your own API keys. Don't forget to create a `.env.local` file at the root of each of the main folders below with `RESEND_API_KEY=<your-key>`.**

All commands are for [Bun](https://bun.com/), but you can use [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/) or whatever you want.

### 📂 next

Using Next.js included API system for an all-in-one implementation:

1. Install packages with `bun i`
2. Run `bun dev`
3. The server will now run on `localhost:3000`

### 📂 react

Using React in its native form, with React Router and the server in the `node/` folder:

1. Install packages with `bun i`
2. Run `bun dev`
3. The server will now run on `localhost:5173`

### 📂 node

Used for in the `react/` folder to setup a Node.js server with the Express framework:

1. Install packages with `bun i`
2. Run `bun server.js`
3. The server will now run on `localhost:5001`
