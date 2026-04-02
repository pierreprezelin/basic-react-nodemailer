"use client";

import { useState, useTransition } from "react";
import { sendEmail } from "./actions";

export default function Home() {
	const [value, setValue] = useState<string>("");
	const [status, setStatus] = useState<{ msg: string; type: "success" | "error" | null }>({ msg: "", type: null });
	const [isPending, startTransition] = useTransition();
	const [seconds, setSeconds] = useState<number>(0);

	const handleAction = async (formData: FormData) => {
		startTransition(async () => {
			const result = await sendEmail(formData);

			if (result?.error) {
				setStatus({ msg: result.error, type: "error" });
			} else {
				setValue("");
				setStatus({ msg: "Email envoyé avec succès !", type: "success" });
				setSeconds(10);
				const timer = setInterval(() => {
					setSeconds((prev) => {
						if (prev <= 1) {
							clearInterval(timer);
							setStatus({ msg: "", type: null });
						}
						return prev - 1;
					});
				}, 1000);
			}
		});
	};

	return (
		<div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black h-screen">
			<main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black sm:items-start">
				<form
					action={handleAction}
					className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left"
				>
					<h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
						Basic React NodeMailer (Next.js)
					</h1>
					<div className="w-125">
						<label
							htmlFor="email"
							className="block mb-2.5 text-sm font-medium text-heading"
						>
							Email
						</label>
						<div className="relative">
							<input
								type="email"
								id="email"
								name="email"
								className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-body disabled:opacity-50 disabled:cursor-not-allowed transition-all"
								value={value}
								placeholder="john.doe@domain.com"
								autoComplete="email"
								disabled={isPending || seconds > 0}
								required
								onChange={(e) => setValue(e.target.value)}
							/>
							<button
								className="absolute inset-e-1.5 bottom-1.5 text-black bg-white hover:bg-brand-strong box-border border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-xs font-medium leading-5 rounded text-xs px-3 py-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:cursor-pointer hover:bg-white/90"
								disabled={isPending || seconds > 0}
							>
								{isPending ? "Envoi..." : "Envoyer"}
							</button>
						</div>
						{status.type === "success" && <p className="mt-2.5 font-medium text-sm text-green-400">{status.msg}</p>}
						{status.type === "error" && <p className="mt-2.5 font-medium text-sm text-red-400">{status.msg}</p>}
						{seconds > 0 && (
							<p className="font-medium text-sm text-blue-400">
								Veuillez patienter {seconds}s avant d'envoyer un autre email.
							</p>
						)}
					</div>
				</form>
			</main>
		</div>
	);
}
