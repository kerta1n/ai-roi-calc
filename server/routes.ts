import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCalculationSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/calculations", async (req, res) => {
    try {
      const validatedData = insertCalculationSchema.parse(req.body);
      const calculation = await storage.createCalculation(validatedData);
      res.json(calculation);
    } catch (error) {
      res.status(400).json({ error: "Invalid calculation data" });
    }
  });

  app.get("/api/calculations/:id", async (req, res) => {
    try {
      const calculation = await storage.getCalculation(req.params.id);
      if (!calculation) {
        res.status(404).json({ error: "Calculation not found" });
        return;
      }
      res.json(calculation);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch calculation" });
    }
  });

  app.get("/api/calculations", async (req, res) => {
    try {
      const calculations = await storage.getAllCalculations();
      res.json(calculations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch calculations" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
