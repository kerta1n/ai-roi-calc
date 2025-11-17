import { sql } from "drizzle-orm";
import { pgTable, text, varchar, decimal, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const calculations = pgTable("calculations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  industry: text("industry").$type<string | null>(),
  missedCalls: text("missed_calls").notNull(),
  customerValue: text("customer_value").notNull(),
  conversionRate: text("conversion_rate").notNull(),
  annualSavings: text("annual_savings").notNull(),
  additionalRevenue: text("additional_revenue").notNull(),
  annualCost: text("annual_cost").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertCalculationSchema = createInsertSchema(calculations).omit({
  id: true,
  createdAt: true,
});

export type InsertCalculation = z.infer<typeof insertCalculationSchema>;
export type Calculation = typeof calculations.$inferSelect;
