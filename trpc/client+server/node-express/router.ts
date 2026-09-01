import { TRPCError } from "@trpc/server";
import { Resend } from "resend";
import { EmailSchema } from "./lib/schema";
import { rateLimitedProcedure, router } from "./trpc";

const resend = new Resend(process.env.RESEND_API_KEY);

export const appRouter = router({
	sendEmail: rateLimitedProcedure.input(EmailSchema).mutation(async ({ input }) => {
		const { data, error } = await resend.emails.send({
			from: "onboarding@resend.dev",
			to: [input.email],
			subject: "Hello world",
			html: `<p>Welcome John Doe!</p>`,
		});

		if (error) {
			console.error("Resend Error:", error);
			throw new TRPCError({ code: "BAD_GATEWAY", message: error.message });
		}

		return { success: true as const, data };
	}),
});

export type AppRouter = typeof appRouter;
