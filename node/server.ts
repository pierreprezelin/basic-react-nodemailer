import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import express from "express";
import { appRouter } from "./router";
import type { Context } from "./trpc";

const app = express();

app.set("trust proxy", true);

app.use(
	cors({
		origin: process.env.CLIENT_URL,
	}),
);

app.use(
	"/trpc",
	trpcExpress.createExpressMiddleware({
		router: appRouter,
		createContext: ({ req }): Context => ({
			ip: req.ip ?? "anonymous",
		}),
	}),
);

app.listen(5001, () => console.log("Server running on port 5001"));
