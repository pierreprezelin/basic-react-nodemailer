"use server";

import { Resend } from "resend";
import { Email } from "@/components/email";
import { regex } from "@/utils/regex";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
	const email = formData.get("email") as string;

	if (!email) {
		return { error: "Une adresse email est requise." };
	}
	if (!regex.email.test(email)) {
		return { error: "Adresse email invalide." };
	}

	try {
		const { data, error } = await resend.emails.send({
			from: "onboarding@resend.dev",
			to: [email],
			subject: "Hello world",
			react: Email({ firstName: "Pierre", lastName: "Prézelin" }),
		});

		if (error) return { error: error.message };
		return { success: true };
	} catch (e) {
		return { error: "A server crash or network error occurred." };
	}
}
