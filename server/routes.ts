import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertEmailSubscriptionSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Email subscription endpoint
  app.post("/api/subscribe", async (req, res) => {
    try {
      const validatedData = insertEmailSubscriptionSchema.parse(req.body);
      
      // Check if email already exists
      const existingSubscription = await storage.getEmailSubscription(validatedData.email);
      if (existingSubscription) {
        return res.status(409).json({ 
          message: "Bu e-posta adresi zaten kayıtlı",
          alreadySubscribed: true 
        });
      }

      const subscription = await storage.createEmailSubscription(validatedData);
      
      res.status(201).json({ 
        message: "Başarıyla abone oldunuz!",
        subscription: {
          id: subscription.id,
          email: subscription.email,
          subscribedAt: subscription.subscribedAt
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: error.errors[0].message,
          field: error.errors[0].path[0]
        });
      }
      
      console.error("Email subscription error:", error);
      res.status(500).json({ message: "Bir hata oluştu, lütfen tekrar deneyin" });
    }
  });

  // Get all subscriptions (for admin purposes)
  app.get("/api/subscriptions", async (req, res) => {
    try {
      const subscriptions = await storage.getAllEmailSubscriptions();
      res.json(subscriptions);
    } catch (error) {
      console.error("Get subscriptions error:", error);
      res.status(500).json({ message: "Bir hata oluştu" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
