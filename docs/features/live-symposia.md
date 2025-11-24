# Live Symposia Workspace

The Live Symposia experience layers agenda management, stage chat, and protocol drafting into a single room. It reuses the existing research workspace markdown canvas while adding real-time presence and AI assistance.

## Joining a symposium

1. Navigate to **Home → Live Symposia** or open `/symposia/symp-001` directly.
2. If authentication is enabled, sign in with the demo credentials from the README.
3. Join the room to load agenda, speaker queue, roster, polls, and the shared protocol canvas.
4. Post questions or reactions in the chat and cast votes on live polls.
5. Draft protocol updates in Markdown; presence pills show who else is active.

## Mock-data mode

- When no realtime backend is configured, the room uses the seeded mock in `src/data/symposiumData.js` and still supports optimistic updates for agenda, chat, notes, polls, and presence.
- Presence chips and reactions render immediately and are reconciled if a WebSocket endpoint becomes available.
- AI summaries run locally via `src/api/aiService.js` without calling external services.

## Backend / realtime wiring

- `src/api/symposiumClient.js` provides `useSymposiumChannel(roomId)` to publish and subscribe to symposium events (agenda updates, notes, polls, chat, reactions, presence).
- The hook leans on `RealtimeContext` for socket wiring; when offline it still updates local state for demos.
- Stage, agenda, and chat components subscribe to the same channel so multiple tabs/users stay in sync when a backend is present.

## AI Notetaker

- The right rail surfaces **Summary**, **Action items**, and **Citation suggestions** based on live notes.
- A `Refresh` control re-runs `generateSummary`, `actionItems`, and `citationSuggestions` for manual verification.

## Screenshots

- Add UI captures (e.g., `docs/assets/live-symposia.png`) that show the stage, agenda, chat, and AI Notetaker. Include them in README or docs once generated.
