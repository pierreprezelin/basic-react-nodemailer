import { createTRPCClient, httpBatchLink, TRPCClientError } from "@trpc/client";
import type { AppRouter } from "@/app/api/trpc/router";

export const trpc = createTRPCClient<AppRouter>({
	links: [httpBatchLink({ url: "/api/trpc" })],
});

export function getErrorMessage(err: unknown, fallback: string): string {
	if (err instanceof TRPCClientError) return err.message;
	return fallback;
}
