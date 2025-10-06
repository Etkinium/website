import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertEmailSubscriptionSchema, insertContactMessageSchema, insertUserSchema, loginSchema } from "@shared/schema";
import { z } from "zod";
import "./types";

export async function registerRoutes(app: Express): Promise<Server> {
  // Signup endpoint
  app.post("/api/signup", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      
      // Check if email already exists
      const existingUser = await storage.getUserByEmail(validatedData.email);
      if (existingUser) {
        return res.status(409).json({ 
          message: "Bu e-posta adresi zaten kayıtlı",
          alreadyExists: true 
        });
      }

      // Create user (in production, hash the password!)
      const user = await storage.createUser(validatedData);
      
      // Set session
      req.session.userId = user.id;
      
      res.status(201).json({ 
        message: "Başarıyla üye oldunuz!",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          points: user.points,
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: error.errors[0].message,
          field: error.errors[0].path[0]
        });
      }
      
      console.error("Signup error:", error);
      res.status(500).json({ message: "Bir hata oluştu, lütfen tekrar deneyin" });
    }
  });

  // Login endpoint
  app.post("/api/login", async (req, res) => {
    try {
      const validatedData = loginSchema.parse(req.body);
      
      // Find user by email
      const user = await storage.getUserByEmail(validatedData.email);
      if (!user) {
        return res.status(401).json({ 
          message: "E-posta veya şifre hatalı"
        });
      }

      // Check password (in production, compare hashed password!)
      if (user.password !== validatedData.password) {
        return res.status(401).json({ 
          message: "E-posta veya şifre hatalı"
        });
      }

      // Set session
      req.session.userId = user.id;
      
      res.json({ 
        message: "Başarıyla giriş yaptınız!",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          points: user.points,
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: error.errors[0].message,
          field: error.errors[0].path[0]
        });
      }
      
      console.error("Login error:", error);
      res.status(500).json({ message: "Bir hata oluştu, lütfen tekrar deneyin" });
    }
  });

  // Logout endpoint
  app.post("/api/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Çıkış yapılırken bir hata oluştu" });
      }
      res.json({ message: "Başarıyla çıkış yaptınız" });
    });
  });

  // Get current user endpoint
  app.get("/api/user", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Giriş yapmanız gerekiyor" });
    }

    try {
      const user = await storage.getUser(req.session.userId);
      if (!user) {
        return res.status(404).json({ message: "Kullanıcı bulunamadı" });
      }

      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        points: user.points,
      });
    } catch (error) {
      console.error("Get user error:", error);
      res.status(500).json({ message: "Bir hata oluştu" });
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

  const httpServer = createServer(app);
  return httpServer;
}
