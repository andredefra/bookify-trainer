// Shared Google Gemini helper for admin AI edge functions.
// The key is read only from the GEMINI_API_KEY secret and never returned or logged.

/** Single place to change the Gemini model. */
export const GEMINI_MODEL = "gemini-2.5-flash";

const BASE = "https://generativelanguage.googleapis.com/v1beta/models";

export class GeminiError extends Error {
  status: number;
  code: "missing_key" | "invalid_key" | "unavailable" | "bad_response";
  constructor(code: GeminiError["code"], message: string, status: number) {
    super(message);
    this.code = code;
    this.status = status;
  }
}

export type GeminiPart = Record<string, unknown>;
export interface GeminiContent { role: "user" | "model"; parts: GeminiPart[] }

export interface GeminiRawOptions {
  system?: string;
  contents: GeminiContent[];
  json?: boolean;
  tools?: Array<{ name: string; description: string; parameters?: Record<string, unknown> }>;
  maxOutputTokens?: number;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Low-level call: returns the first candidate's parts. Retries 429/5xx twice with backoff. */
export async function geminiRaw(opts: GeminiRawOptions): Promise<GeminiPart[]> {
  const key = Deno.env.get("GEMINI_API_KEY");
  if (!key) throw new GeminiError("missing_key", "Chiave Gemini mancante", 500);

  const body: Record<string, unknown> = { contents: opts.contents };
  if (opts.system) body.systemInstruction = { parts: [{ text: opts.system }] };
  const gen: Record<string, unknown> = {};
  if (opts.json) gen.responseMimeType = "application/json";
  if (opts.maxOutputTokens) gen.maxOutputTokens = opts.maxOutputTokens;
  if (Object.keys(gen).length) body.generationConfig = gen;
  if (opts.tools?.length) body.tools = [{ functionDeclarations: opts.tools }];

  let lastStatus = 0;
  for (let attempt = 0; attempt < 3; attempt++) {
    if (attempt > 0) await sleep(800 * 2 ** (attempt - 1) + Math.random() * 300);
    const res = await fetch(`${BASE}/${GEMINI_MODEL}:generateContent`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify(body),
    });
    lastStatus = res.status;
    if (res.ok) {
      const data = await res.json();
      const parts = data?.candidates?.[0]?.content?.parts;
      if (!Array.isArray(parts)) {
        const reason = data?.promptFeedback?.blockReason ?? data?.candidates?.[0]?.finishReason ?? "nessun contenuto";
        throw new GeminiError("bad_response", `Risposta Gemini vuota (${reason})`, 502);
      }
      return parts;
    }
    await res.text().catch(() => "");
    if (res.status === 400 || res.status === 401 || res.status === 403) {
      throw new GeminiError("invalid_key", "Chiave Gemini non valida o senza permessi", res.status === 400 ? 400 : 403);
    }
    if (res.status !== 429 && res.status < 500) {
      throw new GeminiError("bad_response", `Errore Gemini ${res.status}`, 500);
    }
  }
  throw new GeminiError(
    "unavailable",
    lastStatus === 429
      ? "Gemini è sovraccarico o hai superato la quota: riprova tra qualche minuto."
      : "Gemini non è raggiungibile al momento: riprova tra qualche minuto.",
    lastStatus === 429 ? 429 : 503,
  );
}

export interface GeminiTextOptions {
  system?: string;
  history?: Array<{ role: "user" | "assistant"; content: string }>;
  prompt: string;
  json?: boolean;
}

/** Text helper: system + chat history + prompt → text (JSON string when json=true). */
export async function geminiText(opts: GeminiTextOptions): Promise<string> {
  const contents: GeminiContent[] = [
    ...(opts.history ?? []).map((h) => ({
      role: (h.role === "assistant" ? "model" : "user") as "user" | "model",
      parts: [{ text: h.content }],
    })),
    { role: "user", parts: [{ text: opts.prompt }] },
  ];
  const parts = await geminiRaw({ system: opts.system, contents, json: opts.json });
  return parts.map((p) => (typeof p.text === "string" ? p.text : "")).join("");
}

/** Convert any error into an HTTP-friendly { status, message } without leaking secrets. */
export function geminiErrorInfo(e: unknown): { status: number; message: string } {
  if (e instanceof GeminiError) return { status: e.status, message: e.message };
  return { status: 500, message: e instanceof Error ? e.message : String(e) };
}
