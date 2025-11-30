# Taskify MVP & Blue Ocean Strategy

## Blue Ocean Positioning
- **Calm, local-first personal ops desk.** Competes outside crowded SaaS PM tools by keeping all task data on-device with lightweight reminders and no accounts.
- **Neuro-inclusive focus.** Minimal visual noise plus optional rich context (tags, notes) lets users choose the cognitive load that fits their day.
- **Micro-rituals loop.** Encourages short planning/review cycles through due dates, reminders, and recurrence without kanban overhead.

## MVP Scope (must-have)
- Create, view, and delete tasks with completion toggles and theme toggle.
- Task metadata: priority badges, optional categories, tags, notes, and recurrence (daily/weekly/monthly) with automatic next-instance creation when completed.
- Scheduling aids: due dates and reminders (desktop notifications) with timestamped display, inline validation, and actionable snooze/dismiss controls.
- Local persistence using `localStorage` (1MB guardrail) and graceful recovery from corrupted payloads.
- Accessibility: keyboard-friendly controls, status text when list is empty, and error boundary fallback.

## Out of Scope (for now)
- Accounts, sync, or collaboration features.
- Mobile push delivery beyond browser notifications.
- Advanced planning views (calendar/kanban) and analytics.

## Success Criteria
- Add/edit/delete round-trip works without page reloads.
- Recurring tasks spawn next instance when completed and retain reminder offsets when provided.
- Reminders prompt once when the browser allows notifications, surface actionable snooze/dismiss controls, and fall back to inline status when notifications are blocked.
- Invalid or corrupted dates are dropped before rendering to prevent crashes.
- No data loss after refresh; corrupted storage clears automatically.

## Next Experiments
- Add optional focus-mode view that surfaces only today's priorities to reinforce the calm positioning.
- Lightweight "energy" tagging (high/low effort) to support neuro-inclusive planning.
- Export/import to keep local-first promise while enabling manual backups.
