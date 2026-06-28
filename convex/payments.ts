import { v } from "convex/values";
import { internalMutation } from "./_generated/server";
import { internal } from "./_generated/api";

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const FIRST_REMINDER_AFTER = 15 * MINUTE;
const SECOND_REMINDER_AFTER = 1 * HOUR;
const THIRD_REMINDER_AFTER = 8 * HOUR;
const CANCEL_AFTER = 24 * HOUR;

/**
 * Scans unpaid, still-pending orders and:
 *  - sends the 1st payment reminder after 15 min,
 *  - sends the 2nd reminder after 1h,
 *  - sends the 3rd (final) reminder after 8h,
 *  - auto-cancels orders still unpaid after 24h (16h past the final reminder).
 * Driven by a cron (see convex/crons.ts). Idempotent: paymentReminderCount
 * guards against re-sending the same reminder.
 */
export const runPaymentReminders = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const unpaid = await ctx.db
      .query("orders")
      .withIndex("by_payment_status", (q) => q.eq("paymentStatus", "unpaid"))
      .collect();

    let reminded = 0;
    let cancelled = 0;

    for (const order of unpaid) {
      // Only chase orders that are still waiting to be paid/produced.
      if (order.status !== "pending") continue;

      const age = now - order._creationTime;
      const count = order.paymentReminderCount ?? 0;

      if (age >= CANCEL_AFTER) {
        // Manual override: keep this order alive despite being past the deadline.
        if (order.autoCancelPaused) continue;
        await ctx.db.patch(order._id, { status: "cancelled" });
        cancelled += 1;
        continue;
      }

      if (count === 0 && age >= FIRST_REMINDER_AFTER) {
        await ctx.scheduler.runAfter(
          0,
          internal.email.sendPaymentReminderEmail,
          { orderId: order._id, reminderNumber: 1 },
        );
        await ctx.db.patch(order._id, {
          paymentReminderCount: 1,
          lastPaymentReminderAt: now,
        });
        reminded += 1;
      } else if (count === 1 && age >= SECOND_REMINDER_AFTER) {
        await ctx.scheduler.runAfter(
          0,
          internal.email.sendPaymentReminderEmail,
          { orderId: order._id, reminderNumber: 2 },
        );
        await ctx.db.patch(order._id, {
          paymentReminderCount: 2,
          lastPaymentReminderAt: now,
        });
        reminded += 1;
      } else if (count === 2 && age >= THIRD_REMINDER_AFTER) {
        await ctx.scheduler.runAfter(
          0,
          internal.email.sendPaymentReminderEmail,
          { orderId: order._id, reminderNumber: 3 },
        );
        await ctx.db.patch(order._id, {
          paymentReminderCount: 3,
          lastPaymentReminderAt: now,
        });
        reminded += 1;
      }
    }

    if (reminded || cancelled) {
      console.log(
        `[payments] przypomnienia: ${reminded}, auto-anulowane: ${cancelled}`,
      );
    }
  },
});

/**
 * Manual override: exempt a single order from auto-cancellation (or re-enable it).
 */
export const setAutoCancelPaused = internalMutation({
  args: { orderId: v.id("orders"), paused: v.boolean() },
  handler: async (ctx, { orderId, paused }) => {
    await ctx.db.patch(orderId, { autoCancelPaused: paused });
  },
});

/**
 * Recovery helper: bring an order back to "pending", pin autoCancelPaused so the
 * cron leaves it alone, and send a payment reminder. Used to restore an order
 * that was auto-cancelled but should stay open. Atomic: the pause flag is set in
 * the same mutation, so a concurrent cron run can't re-cancel it.
 */
export const restoreAndRemind = internalMutation({
  args: { orderId: v.id("orders"), reminderNumber: v.number() },
  handler: async (ctx, { orderId, reminderNumber }) => {
    const order = await ctx.db.get(orderId);
    if (!order) throw new Error("Brak zamówienia.");
    await ctx.db.patch(orderId, {
      status: "pending",
      autoCancelPaused: true,
      paymentReminderCount: reminderNumber,
      lastPaymentReminderAt: Date.now(),
    });
    await ctx.scheduler.runAfter(0, internal.email.sendPaymentReminderEmail, {
      orderId,
      reminderNumber,
    });
  },
});
