"use server";

import { Resend } from "resend";
import { Email } from "@/components/email";
import { EmailSchema } from "@/lib/schema";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
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
		const { data, error } = await resend.emails.send({
			from: "onboarding@resend.dev",
			to: [email],
			subject: "Hello world",
			react: Email({ firstName: "John", lastName: "Doe" }),
		});

		if (error) return { error: error.message };
		return { success: true };
	} catch (e) {
		return { error: "A server crash or network error occurred." };
	}
}
