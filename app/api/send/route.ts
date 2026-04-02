import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { Email } from "@/components/email";
import { regex } from "@/utils/regex";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
	try {
		const { email } = await req.json();

		if (!email) {
      return { error: "Email is required." };
    }
    if (!regex.email.test(email)) {
			return { error: "Email must be valid." };
		}

		const { data, error } = await resend.emails.send({
			from: "onboarding@resend.dev",
			to: [email],
			subject: "Hello world",
			react: Email({ firstName: "Pierre", lastName: "Prézelin" }),
		});

		if (error) {
			console.error("Resend Error:", error);
			return NextResponse.json({ error: error.message }, { status: 500 });
		}

		return NextResponse.json({ success: true, data });
	} catch (error: any) {
		console.error("Server Error:", error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
