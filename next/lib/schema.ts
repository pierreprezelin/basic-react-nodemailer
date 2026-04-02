import { z } from "zod";

export const EmailSchema = z.object({
	email: z.string().min(1, "L'email est requis").email("Le format de l'email est invalide."),
});

export type EmailInput = z.infer<typeof EmailSchema>;
