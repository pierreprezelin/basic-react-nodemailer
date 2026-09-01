"use server";

import { headers } from 'next/headers';
import { LRUCache } from 'lru-cache';
import { Resend } from "resend";
import { Email } from "@/components/email";
import { EmailSchema } from "@/lib/schema";

const tokenCache = new LRUCache({
  max: 500,
  ttl: 1000 * 10, 
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
	const ip = (await headers()).get("x-forwarded-for") || "anonymous";

	if (tokenCache.has(ip)) {
    return { error: "Trop de requêtes. Veuillez patienter 10 secondes entre chaque envoi." };
	}
	
	const rawEmail = formData.get("email") as string;
	const validatedFields = EmailSchema.safeParse({ email: rawEmail });

	if (!rawEmail) {
		return { error: "Une adresse email est requise." };
	}
	if (!validatedFields.success) {
		return { error: "Adresse email invalide." };
	}

	const { email } = validatedFields.data;

	try {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { data, error } = await resend.emails.send({
			from: "onboarding@resend.dev",
			to: [email],
			subject: "Hello world",
			react: Email({ firstName: "John", lastName: "Doe" }),
		});

		if (error) return { error: error.message };
		tokenCache.set(ip, true);
		return { success: true };
	} catch (e) {
		return { error: `A server crash or network error occurred: ${e}` };
	}
}
