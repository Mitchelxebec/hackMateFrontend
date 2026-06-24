import type { ApiResponse, GenerateResponse } from "../types";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export async function generatePlan(
  projectIdea: string,
): Promise<GenerateResponse> {
  let res: Response;

  try {
    res = await fetch(`${BASE_URL}/api/v1/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectIdea }),
    });
  } catch (err) {
    // Network failure or CORS block
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.toLowerCase().includes("failed to fetch") || msg.toLowerCase().includes("network")) {
      throw new Error(
        "Cannot reach the server. Check your connection or the server may be starting up (cold start on Render can take ~30s)."
      );
    }
    throw new Error(`Network error: ${msg}`);
  }

  if (!res.ok) {
    let errorMessage = `Server error (${res.status})`;
    try {
      const errJson = await res.json() as { message?: string };
      if (errJson.message) errorMessage = errJson.message;
    } catch {
      // non-JSON error body
    }
    throw new Error(errorMessage);
  }

  const json = (await res.json()) as ApiResponse<GenerateResponse>;

  if (!json.success) {
    throw new Error((json as { message?: string }).message ?? "Generation failed");
  }

  return json.data;
}
