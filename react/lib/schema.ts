import { z } from "zod";

export const EmailSchema = z.object({
	email: z.string().min(1, "An email address is required.").email("Email format is invalid."),
});

export type EmailInput = z.infer<typeof EmailSchema>;
