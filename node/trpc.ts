import { initTRPC, TRPCError } from "@trpc/server";
import { ZodError } from "zod";

export type Context = { ip: string };

const t = initTRPC.context<Context>().create({
	errorFormatter(opts) {
		const { shape, error } = opts;
		return {
			...shape,
			message:
				error.code === "BAD_REQUEST" && error.cause instanceof ZodError
					? (error.cause.issues[0]?.message ?? shape.message)
					: shape.message,
		};
	},
});

export const router = t.router;
export const publicProcedure = t.procedure;

const lastRequestByIp = new Map<string, number>();
const RATE_LIMIT_MS = 10_000;

export const rateLimitedProcedure = publicProcedure.use(({ ctx, next }) => {
	const now = Date.now();
	for (const [ip, at] of lastRequestByIp) if (now - at >= RATE_LIMIT_MS) lastRequestByIp.delete(ip);

	if (lastRequestByIp.has(ctx.ip)) {
		throw new TRPCError({
			code: "TOO_MANY_REQUESTS",
			message: "Too many requests. Please wait 10 seconds between each submission.",
		});
	}

	lastRequestByIp.set(ctx.ip, now);
	return next();
});
