import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertEmailSubscriptionSchema, insertContactMessageSchema, insertPartnershipApplicationSchema, insertAdvertisingApplicationSchema, registerUserSchema, loginUserSchema, updateProfileSchema } from "@shared/schema";
import { z } from "zod";
import bcrypt from "bcrypt";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import { pool } from "./db";
import "./types";
import { registerChatRoutes } from "./replit_integrations/chat";

// Extend Express session type
declare module 'express-session' {
  interface SessionData {
    userId?: string;
  }
}

// Auth middleware to check if user is logged in
function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.session?.userId) {
    return res.status(401).json({ message: "Giriş yapmanız gerekiyor" });
  }
  next();
}

// Initialize business user on startup
async function initializeBusinessUser() {
  try {
    const businessEmail = "berkay.gulcin@icloud.com";
    const existingUser = await storage.getUserByEmail(businessEmail);
    
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash("Berkay34", 10);
      await storage.createUser({
        email: businessEmail,
        password: hashedPassword,
        firstName: "Berkay",
        lastName: "Gülçin",
      });
      console.log("Business user initialized successfully");
    }
  } catch (error) {
    console.log("Business user initialization skipped (may already exist)");
  }

  try {
    const testEmail = "berkay.gulcin@etkinium.com";
    const existingTestUser = await storage.getUserByEmail(testEmail);
    
    if (!existingTestUser) {
      const hashedPassword = await bcrypt.hash("Etkinium2026", 10);
      await storage.createUser({
        email: testEmail,
        password: hashedPassword,
        firstName: "Berkay",
        lastName: "Gülçin",
      });
      console.log("Test user (etkinium.com) initialized successfully");
    }
  } catch (error) {
    console.log("Test user initialization skipped (may already exist)");
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize business user
  await initializeBusinessUser();
  
  // Trust proxy for production (Replit runs behind a proxy)
  app.set('trust proxy', 1);
  
  // Setup PostgreSQL session store
  const PgSession = connectPgSimple(session);
  
  // Setup session middleware with PostgreSQL store
  app.use(session({
    store: new PgSession({
      pool: pool,
      tableName: 'sessions',
      createTableIfMissing: false,
    }),
    secret: process.env.SESSION_SECRET || 'etkinium-secret-key-change-in-production',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    }
  }));

  // Register endpoint
  app.post('/api/register', async (req, res) => {
    try {
      const validatedData = registerUserSchema.parse(req.body);
      
      // Check if email already exists
      const existingUser = await storage.getUserByEmail(validatedData.email);
      if (existingUser) {
        return res.status(409).json({ message: "Bu e-posta adresi zaten kullanılıyor" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(validatedData.password, 10);
      
      // Create user
      const user = await storage.createUser({
        ...validatedData,
        password: hashedPassword,
      });

      // Auto-login after registration
      req.session.userId = user.id;
      
      // Return user without password
      const { password, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: error.errors[0].message,
          field: error.errors[0].path[0]
        });
      }
      
      console.error("Register error:", error);
      res.status(500).json({ message: "Kayıt sırasında bir hata oluştu" });
    }
  });

  // Login endpoint
  app.post('/api/login', async (req, res) => {
    try {
      const validatedData = loginUserSchema.parse(req.body);
      
      // Find user by email
      const user = await storage.getUserByEmail(validatedData.email);
      if (!user) {
        return res.status(401).json({ message: "E-posta veya şifre hatalı" });
      }

      // Check password
      const isPasswordValid = await bcrypt.compare(validatedData.password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "E-posta veya şifre hatalı" });
      }

      // Set session
      req.session.userId = user.id;
      
      // Set cookie maxAge based on rememberMe
      if (validatedData.rememberMe) {
        req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days
      }
      
      // Return user without password
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: error.errors[0].message,
          field: error.errors[0].path[0]
        });
      }
      
      console.error("Login error:", error);
      res.status(500).json({ message: "Giriş sırasında bir hata oluştu" });
    }
  });

  // Logout endpoint
  app.post('/api/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Logout error:", err);
        return res.status(500).json({ message: "Çıkış yapılırken hata oluştu" });
      }
      res.json({ message: "Başarıyla çıkış yapıldı" });
    });
  });

  // Get current user endpoint (public, returns null if not authenticated)
  app.get('/api/user', async (req, res) => {
    if (!req.session?.userId) {
      return res.json(null);
    }

    try {
      const user = await storage.getUser(req.session.userId);
      if (!user) {
        return res.json(null);
      }
      
      // Return user without password
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Kullanıcı bilgileri alınırken hata oluştu" });
    }
  });

  // Update profile endpoint
  app.patch('/api/user/profile', requireAuth, async (req, res) => {
    try {
      const validatedData = updateProfileSchema.parse(req.body);
      const userId = req.session.userId!;
      
      // If updating email, check if it's already taken
      if (validatedData.email) {
        const existingUser = await storage.getUserByEmail(validatedData.email);
        if (existingUser && existingUser.id !== userId) {
          return res.status(409).json({ message: "Bu e-posta adresi zaten kullanılıyor" });
        }
      }
      
      const updatedUser = await storage.updateUser(userId, validatedData);
      
      // Return user without password
      const { password, ...userWithoutPassword } = updatedUser;
      res.json(userWithoutPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: error.errors[0].message,
          field: error.errors[0].path[0]
        });
      }
      
      console.error("Update profile error:", error);
      res.status(500).json({ message: "Profil güncellenirken hata oluştu" });
    }
  });

  // Change password endpoint
  app.post('/api/user/change-password', requireAuth, async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
      const userId = req.session.userId!;

      if (!currentPassword || !newPassword) {
        return res.status(400).json({ message: "Mevcut şifre ve yeni şifre gerekli" });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({ message: "Yeni şifre en az 6 karakter olmalı" });
      }

      // Get current user
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "Kullanıcı bulunamadı" });
      }

      // Verify current password
      const isValidPassword = await bcrypt.compare(currentPassword, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Mevcut şifre yanlış" });
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update password
      await storage.updateUserPassword(userId, hashedPassword);

      res.json({ message: "Şifre başarıyla değiştirildi" });
    } catch (error) {
      console.error("Change password error:", error);
      res.status(500).json({ message: "Şifre değiştirilirken hata oluştu" });
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

  // Register AI Chat routes
  registerChatRoutes(app);

  const httpServer = createServer(app);
  return httpServer;
}
