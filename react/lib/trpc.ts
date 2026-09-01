import { createTRPCClient, httpBatchLink, TRPCClientError } from "@trpc/client";
import type { AppRouter } from "../../node/router";

export const trpc = createTRPCClient<AppRouter>({
	links: [httpBatchLink({ url: "http://localhost:5001/trpc" })],
});

export function getErrorMessage(err: unknown, fallback: string): string {
	if (err instanceof TRPCClientError) return err.message;
	return fallback;
}
