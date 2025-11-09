import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, jsonb, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table for Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  points: integer("points").notNull().default(100),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const emailSubscriptions = pgTable("email_subscriptions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  subscribedAt: timestamp("subscribed_at").notNull().defaultNow(),
  isActive: text("is_active").notNull().default("true"),
});

export const contactMessages = pgTable("contact_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const partnershipApplications = pgTable("partnership_applications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const advertisingApplications = pgTable("advertising_applications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Upsert user schema for Replit Auth
export const upsertUserSchema = createInsertSchema(users).pick({
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  profileImageUrl: true,
});

export const insertEmailSubscriptionSchema = createInsertSchema(emailSubscriptions).pick({
  email: true,
}).extend({
  email: z.string().email("Lütfen geçerli bir e-posta adresi girin"),
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).pick({
  firstName: true,
  lastName: true,
  email: true,
  phone: true,
  message: true,
}).extend({
  firstName: z.string().min(1, "Ad gerekli"),
  lastName: z.string().min(1, "Soyad gerekli"),
  email: z.string().email("Lütfen geçerli bir e-posta adresi girin"),
  phone: z.string().min(10, "Lütfen geçerli bir telefon numarası girin"),
  message: z.string().min(1, "Mesaj gerekli"),
});

export const insertPartnershipApplicationSchema = createInsertSchema(partnershipApplications).pick({
  name: true,
  email: true,
  company: true,
  message: true,
}).extend({
  name: z.string().min(1, "Ad gerekli"),
  email: z.string().email("Lütfen geçerli bir e-posta adresi girin"),
  company: z.string().min(1, "Şirket/Organizasyon gerekli"),
  message: z.string().min(1, "Mesaj gerekli"),
});

export const insertAdvertisingApplicationSchema = createInsertSchema(advertisingApplications).pick({
  name: true,
  email: true,
  company: true,
  message: true,
}).extend({
  name: z.string().min(1, "Ad gerekli"),
  email: z.string().email("Lütfen geçerli bir e-posta adresi girin"),
  company: z.string().min(1, "Şirket/Kurum gerekli"),
  message: z.string().min(1, "Reklam detayları gerekli"),
});

export type UpsertUser = z.infer<typeof upsertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertEmailSubscription = z.infer<typeof insertEmailSubscriptionSchema>;
export type EmailSubscription = typeof emailSubscriptions.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertPartnershipApplication = z.infer<typeof insertPartnershipApplicationSchema>;
export type PartnershipApplication = typeof partnershipApplications.$inferSelect;
export type InsertAdvertisingApplication = z.infer<typeof insertAdvertisingApplicationSchema>;
export type AdvertisingApplication = typeof advertisingApplications.$inferSelect;
