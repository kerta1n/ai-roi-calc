import { type Calculation, type InsertCalculation } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  createCalculation(calculation: InsertCalculation): Promise<Calculation>;
  getCalculation(id: string): Promise<Calculation | undefined>;
  getAllCalculations(): Promise<Calculation[]>;
}

export class MemStorage implements IStorage {
  private calculations: Map<string, Calculation>;

  constructor() {
    this.calculations = new Map();
  }

  async createCalculation(insertCalculation: InsertCalculation): Promise<Calculation> {
    const id = randomUUID();
    const calculation: Calculation = {
      id,
      industry: insertCalculation.industry ?? null,
      missedCalls: insertCalculation.missedCalls,
      customerValue: insertCalculation.customerValue,
      conversionRate: insertCalculation.conversionRate,
      annualSavings: insertCalculation.annualSavings,
      additionalRevenue: insertCalculation.additionalRevenue,
      annualCost: insertCalculation.annualCost,
      createdAt: new Date(),
    };
    this.calculations.set(id, calculation);
    return calculation;
  }

  async getCalculation(id: string): Promise<Calculation | undefined> {
    return this.calculations.get(id);
  }

  async getAllCalculations(): Promise<Calculation[]> {
    return Array.from(this.calculations.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
}

export const storage = new MemStorage();
