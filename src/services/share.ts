import type { ApiResponse, GenerateResponse } from "../types";

const BASE_URL = import.meta.env.VITE_API_URL ?? "https://hackmate-63hd.onrender.com";

/**
 * Fetch a previously stored plan from 0G Storage via its hash.
 * The backend endpoint: GET /api/v1/plan/:hash
 */
export async function fetchPlanByHash(hash: string): Promise<GenerateResponse> {
  const res = await fetch(`${BASE_URL}/api/v1/plan/${encodeURIComponent(hash)}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const errJson = await res.json().catch(() => ({})) as { message?: string };
    throw new Error(errJson.message ?? `Failed to load plan (${res.status})`);
  }

  const json = (await res.json()) as ApiResponse<GenerateResponse>;
  if (!json.success) {
    throw new Error((json as { message?: string }).message ?? "Failed to load plan");
  }
  return json.data;
}

/**
 * Build the shareable URL for a given storageHash.
 * Format: https://hack-mate-frontend-two.vercel.app/plan/0x...
 */
export function buildShareUrl(storageHash: string): string {
  const origin = typeof window !== "undefined" ? window.location.origin : "https://hack-mate-frontend-two.vercel.app";
  return `${origin}/plan/${storageHash}`;
}
