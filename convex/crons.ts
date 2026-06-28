import { cronJobs } from "convex/server";

import { internal } from "./_generated/api";

const crons = cronJobs();

// Every 5 min: send payment reminders (15min, 1h, 8h) and auto-cancel after 24h.
crons.interval(
  "payment reminders",
  { minutes: 5 },
  internal.payments.runPaymentReminders,
  {},
);

export default crons;
