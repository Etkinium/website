import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertEmailSubscriptionSchema, insertContactMessageSchema, insertPartnershipApplicationSchema, insertAdvertisingApplicationSchema } from "@shared/schema";
import { z } from "zod";
import { setupAuth, isAuthenticated } from "./replitAuth";
import "./types";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup Replit Auth middleware
  await setupAuth(app);

  // Auth endpoint - Get current user (public, returns null if not authenticated)
  app.get('/api/auth/user', async (req: any, res) => {
    // Return null if not authenticated instead of 401
    if (!req.isAuthenticated() || !req.user?.claims?.sub) {
      return res.json(null);
    }

    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      if (!user) {
        return res.json(null);
      }
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Kullanıcı bilgileri alınırken hata oluştu" });
    }
  });

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

  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      
      const contactMessage = await storage.createContactMessage(validatedData);
      
      res.status(201).json({ 
        message: "Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.",
        contact: {
          id: contactMessage.id,
          createdAt: contactMessage.createdAt
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: error.errors[0].message,
          field: error.errors[0].path[0]
        });
      }
      
      console.error("Contact form error:", error);
      res.status(500).json({ message: "Bir hata oluştu, lütfen tekrar deneyin" });
    }
  });

  // Get all contact messages (for admin purposes)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getAllContactMessages();
      res.json(contacts);
    } catch (error) {
      console.error("Get contacts error:", error);
      res.status(500).json({ message: "Bir hata oluştu" });
    }
  });

  // Partnership application endpoint
  app.post("/api/partnership", async (req, res) => {
    try {
      const validatedData = insertPartnershipApplicationSchema.parse(req.body);
      
      const application = await storage.createPartnershipApplication(validatedData);
      
      res.status(201).json({ 
        message: "İş birliği başvurunuz alındı! Uzman ekibimiz en kısa sürede sizlerle iletişime geçecektir.",
        application: {
          id: application.id,
          createdAt: application.createdAt
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: error.errors[0].message,
          field: error.errors[0].path[0]
        });
      }
      
      console.error("Partnership application error:", error);
      res.status(500).json({ message: "Bir hata oluştu, lütfen tekrar deneyin" });
    }
  });

  // Advertising application endpoint
  app.post("/api/advertising", async (req, res) => {
    try {
      const validatedData = insertAdvertisingApplicationSchema.parse(req.body);
      
      const application = await storage.createAdvertisingApplication(validatedData);
      
      res.status(201).json({ 
        message: "Reklam başvurunuz alındı! En kısa sürede sizinle iletişime geçeceğiz.",
        application: {
          id: application.id,
          createdAt: application.createdAt
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: error.errors[0].message,
          field: error.errors[0].path[0]
        });
      }
      
      console.error("Advertising application error:", error);
      res.status(500).json({ message: "Bir hata oluştu, lütfen tekrar deneyin" });
    }
  });

  // Get all partnership applications (for admin purposes)
  app.get("/api/partnerships", async (req, res) => {
    try {
      const applications = await storage.getAllPartnershipApplications();
      res.json(applications);
    } catch (error) {
      console.error("Get partnership applications error:", error);
      res.status(500).json({ message: "Bir hata oluştu" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
