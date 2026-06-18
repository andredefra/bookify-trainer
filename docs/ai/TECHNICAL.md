# AI Features — Technical Reference

## Overview

The product has several AI surfaces, all backed by **OpenAI** through edge functions. A
separate set of AI features (marketing copy, document analysis, installment detection) uses
the **Lovable AI Gateway** instead — those are documented under
[`../admin-marketing/TECHNICAL.md`](../admin-marketing/TECHNICAL.md) and
[`../supabase/TECHNICAL.md`](../supabase/TECHNICAL.md). This doc covers the **trainer/client
product** AI.

| Surface | Edge function | Model / provider |
|---------|---------------|------------------|
| General fitness chat | `openai-chat` | OpenAI `gpt-4o-mini` |
| Trainer↔client chat (with workout context + image) | `openai-trainer-chat` | OpenAI `gpt-4o-mini` |
| Realtime voice assistant | `openai-realtime` | OpenAI Realtime API (WebSocket) |
| Training-program analysis | `analyze-training-program` | OpenAI |
| Single-workout analysis | `analyze-workout` | OpenAI |
| Program-document exercise extraction | `analyze-program-document` | **Lovable AI Gateway** |

Access to these is gated by [`useAIAccess`](../billing/TECHNICAL.md#useaiaccess--feature-gate)
(free = 5/month, pro = 100/day; demo forced to 4/5).

## Files

| File | Purpose |
|------|---------|
| `supabase/functions/openai-chat/index.ts` | General chat; supports `action_type` like `accept_plan` (writes `training_plans`) |
| `supabase/functions/openai-trainer-chat/index.ts` | Trainer chat with `user_context`, `workoutContext`, `imageUrl`; writes `ai_usage_tracking` |
| `supabase/functions/openai-realtime/index.ts` | WebSocket **relay** between the browser and OpenAI's Realtime API |
| `supabase/functions/analyze-training-program/index.ts` | Analyzes a full program + workout-log payload |
| `supabase/functions/analyze-workout/index.ts` | Analyzes a single workout |
| `supabase/functions/analyze-program-document/index.ts` | Extracts/classifies exercises from a branded program document (Lovable) |
| `src/hooks/useRealtimeVoice.ts` | Client hook driving the realtime voice session |
| `src/utils/RealtimeAudio.ts` | `AudioRecorder`, `AudioQueue`, `RealtimeChat`, PCM16 encode/decode helpers |
| `src/hooks/useAIAccess.ts` | Feature gate (see billing) |

## Chat functions

### `openai-chat`

- **Input:** `{ message, conversation_id?, action_type?, plan_id? }`
- Builds a **service-role** Supabase client. Beyond answering, it can take **actions** — e.g.
  `action_type === 'accept_plan'` updates a `training_plans` row.
- Calls `POST https://api.openai.com/v1/chat/completions` with model `gpt-4o-mini`.
- Secrets: `OPENAI_API_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`.

### `openai-trainer-chat`

- **Input:** `{ message, conversation_id?, user_context?, workoutContext?, imageUrl? }`
- Reads the user from the `Authorization` header, assembles trainer/client + workout context,
  and (when `imageUrl` is present) sends a vision message. Model `gpt-4o-mini`.
- **Writes `ai_usage_tracking`** for the user — this is the counter `useAIAccess` reads to
  enforce limits.

## Realtime voice

The realtime assistant is a **browser ↔ edge-function ↔ OpenAI** relay:

```
Browser (mic)                Edge function                 OpenAI
  AudioRecorder ── PCM16 ──►  openai-realtime  ── wss ──►  Realtime API
  AudioQueue    ◄── audio ──  (relay)          ◄── wss ──
```

- **`src/utils/RealtimeAudio.ts`:**
  - `AudioRecorder` — `getUserMedia` + `AudioContext` (24 kHz), streams mic frames.
  - `encodeAudioForAPI()` — Float32 → base64 PCM16.
  - `AudioQueue` / `playAudioData()` — sequential playback of returned audio chunks.
  - `RealtimeChat` — opens `wss://<projectId>.functions.supabase.co/openai-realtime`, wires
    recorder → socket and socket → playback, exposes `onConnectionChange`.
- **`src/hooks/useRealtimeVoice.ts`** — React wrapper: holds the `WebSocket` ref, connects to
  the same `wss://…/openai-realtime` URL, manages connection state and send/receive.
- **`openai-realtime` edge function** — accepts the WebSocket upgrade and relays frames to
  OpenAI's Realtime API; only secret is `OPENAI_API_KEY` (no Supabase client). It does **not**
  enforce `useAIAccess` limits server-side.

## Analysis functions

| Function | Input | Output |
|----------|-------|--------|
| `analyze-training-program` | `{ programId, programTitle, durationWeeks, currentWeek, completedSessions, totalSessions, goals[], difficulty, startDate, workoutLog[], fitnessData, userProfile }` | AI assessment of program progress/adherence |
| `analyze-workout` | `{ workoutLog: {name,date,duration,exercises[],notes}, fitnessData, userProfile }` | AI feedback on a single session |
| `analyze-program-document` | `{ documentText? }` | Extracted/classified exercises (uses Lovable AI Gateway, `LOVABLE_API_KEY`) |

`analyze-training-program` and `analyze-workout` call OpenAI directly with only
`OPENAI_API_KEY` (no Supabase client).

## Gotchas

- **Two AI providers.** Product AI = OpenAI; marketing/doc/installment AI = Lovable AI Gateway.
  Don't assume a single key or endpoint.
- **Limit enforcement is partial.** `useAIAccess` gates the **UI** and `openai-trainer-chat`
  writes the usage counter, but `openai-realtime` and the `analyze-*` functions don't
  independently enforce per-user quotas.
- **Demo mode.** With a `demo-user`, `useAIAccess` reports 4/5 usage regardless of real
  tracking — useful for demos, misleading for real limit testing.
- **No retrieval/RAG.** There is no embeddings/pgvector layer; context is assembled
  per-request from passed-in payloads and direct table reads.
