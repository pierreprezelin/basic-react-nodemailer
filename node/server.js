import express from "express";
import rateLimit from "express-rate-limit";
import cors from "cors";
import { Resend } from "resend";
import { EmailSchema } from "./lib/schema";

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(
	cors({
		origin: process.env.CLIENT_URL,
	}),
);
app.use(express.json());

const limiter = rateLimit({
	windowMs: 10 * 1000,
	max: 1, // Limit each IP to 1 request per windowMs
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
	message: {
		error: "Too many requests. Please wait 10 seconds between each submission.",
	},
});

app.post("/api/send", limiter, async (req, res) => {
	const result = EmailSchema.safeParse(req.body);

	if (!result.success) {
		return res.status(400).json({
			error: result.error.issues[0]?.message || "Please enter a valid email address.",
		});
	}

	const { email } = result.data;

	try {
		const { data, error } = await resend.emails.send({
			from: "onboarding@resend.dev",
			to: [email],
			subject: "Hello world",
			html: `<p>Welcome John Doe!</p>`,
		});

		if (error) {
			console.error("Resend Error:", error);
			return res.status(error.statusCode).json({ success: false, error });
		}
		res.status(200).json({ success: true, data });
	} catch (err) {
		res.status(500).json({ error: "Server connection error." });
	}
});

app.listen(5001, () => console.log("Server running on port 5001"));
