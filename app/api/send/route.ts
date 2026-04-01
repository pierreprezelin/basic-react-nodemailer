import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { Email } from "@/components/email";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
	try {
		const { email } = await req.json();

		if (!email) {
			return NextResponse.json({ error: "Email is required" }, { status: 400 });
		}

		const { data, error } = await resend.emails.send({
			from: "onboarding@resend.dev",
			to: [email],
			subject: "Hello world",
			react: Email({ firstName: "John", lastName: "Doe" }),
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
