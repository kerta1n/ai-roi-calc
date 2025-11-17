import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { AlertCircle, Building2 } from "lucide-react";
import InputGroup from "./InputGroup";
import MetricCard from "./MetricCard";
import IndustryBenefits from "./IndustryBenefits";
import { Phone, DollarSign } from "lucide-react";

const INDUSTRY_DATA: Record<string, { name: string; benefits: string[] }> = {
  healthcare: {
    name: "Healthcare & Medical",
    benefits: [
      "24/7 patient support and call answering",
      "Automated appointment scheduling, rescheduling, and reminders",
      "New patient intake and health history collection",
      "Handling insurance verification and billing inquiries",
      "HIPAA-compliant communication",
    ],
  },
  legal: {
    name: "Legal Services",
    benefits: [
      "24/7 client lead capture to never miss an inquiry",
      "Automated client intake and pre-qualification screening",
      "Automated appointment booking and confirmations",
      "Integration with legal CRM software",
      "Reduction of administrative tasks to free up staff",
    ],
  },
  realestate: {
    name: "Real Estate",
    benefits: [
      "24/7 lead capture and instant response to inquiries",
      "Automated lead qualification with screening questions",
      "Directly schedule property viewings and appointments",
      "Provide instant property information and answer FAQs",
      "Integration with CRM and property databases",
    ],
  },
  homeservices: {
    name: "Home Services (HVAC, Plumbing, Electrical)",
    benefits: [
      "24/7/365 emergency call handling for frozen pipes or AC failures",
      "Smart triage to prioritize emergency calls over routine maintenance",
      "Automated scheduling integrated with dispatch tools",
      "Service request triage and routing",
      "Remote estimation and pricing",
    ],
  },
  restaurant: {
    name: "Restaurants & Food Service",
    benefits: [
      "Handle phone and drive-thru orders, reducing errors",
      "Automate reservations and manage waitlists",
      "Intelligent upselling (suggesting specials or desserts)",
      "24/7 availability for pre-ordering or after-hours inquiries",
      "Free up staff to focus on in-person customers",
    ],
  },
  ecommerce: {
    name: "E-commerce & Online Retail",
    benefits: [
      "Provide 24/7 customer support via phone, SMS, and chat",
      "Answer common questions about product availability and returns",
      "Handle order status inquiries and take messages",
      "Filter spam calls while capturing lead information",
      "Offer multilingual support to serve diverse customers",
    ],
  },
  financial: {
    name: "Financial Services & Insurance",
    benefits: [
      "Provide 24/7/365 policyholder support for emergencies",
      "Automate initial claim intake process",
      "Handle outbound calls for renewal reminders and payments",
      "Answer common policy questions, freeing up agents",
      "Offer multilingual support",
    ],
  },
  automotive: {
    name: "Automotive Sales & Service",
    benefits: [
      "24/7 lead capture for sales inquiries",
      "Service appointment scheduling and reminders",
      "Parts availability checks and ordering",
      "Follow-up on service recommendations",
      "Integration with dealership management systems",
    ],
  },
  professional: {
    name: "Professional Services (Consulting, Accounting)",
    benefits: [
      "Client inquiry capture and qualification",
      "Automated appointment scheduling",
      "FAQ handling for common service questions",
      "Lead nurturing and follow-up automation",
      "Integration with CRM systems",
    ],
  },
};

interface MissedRevenueSectionProps {
  onRecoveryPotentialChange?: (value: number) => void;
  onDataChange?: (data: {
    industry: string;
    missedCalls: string;
    customerValue: string;
    conversionRate: string;
  }) => void;
}

export default function MissedRevenueSection({ 
  onRecoveryPotentialChange,
  onDataChange 
}: MissedRevenueSectionProps) {
  const [industry, setIndustry] = useState("");
  const [missedCalls, setMissedCalls] = useState("20");
  const [customerValue, setCustomerValue] = useState("250");
  const [conversionRate, setConversionRate] = useState("50");

  const recoveryRate = 0.8;

  const missedCallsNum = parseFloat(missedCalls) || 0;
  const customerValueNum = parseFloat(customerValue) || 0;
  const callConversionRate = (parseFloat(conversionRate) || 0) / 100;

  const weeklyLoss = missedCallsNum * callConversionRate * customerValueNum;
  const monthlyLoss = weeklyLoss * 4.33;
  const annualLoss = monthlyLoss * 12;
  const recoveryPotential = annualLoss * recoveryRate;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  useEffect(() => {
    if (onRecoveryPotentialChange) {
      onRecoveryPotentialChange(recoveryPotential);
    }
  }, [recoveryPotential, onRecoveryPotentialChange]);

  useEffect(() => {
    if (onDataChange) {
      onDataChange({
        industry,
        missedCalls,
        customerValue,
        conversionRate,
      });
    }
  }, [industry, missedCalls, customerValue, conversionRate, onDataChange]);

  const selectedIndustry = industry ? INDUSTRY_DATA[industry] : null;

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-3xl md:text-4xl font-semibold">
            Calculate Your AI Phone Agent ROI
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Understand the financial impact of implementing an AI phone agent solution for your business
          </p>
        </div>

        <Card className="p-6 mb-8 bg-primary/5 border-primary/20">
          <div className="flex gap-4 items-start">
            <AlertCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-2">
                Are You Losing Revenue From Missed Calls?
              </h2>
              <p className="text-base text-muted-foreground">
                Calculate how much revenue you're leaving on the table when calls go unanswered
              </p>
            </div>
          </div>
        </Card>

        <div className="space-y-8">
          <div>
            <Label className="text-sm font-medium uppercase tracking-wide mb-2 block">
              Select Your Industry
            </Label>
            <div className="relative">
              <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5 z-10" />
              <Select value={industry} onValueChange={setIndustry}>
                <SelectTrigger className="h-14 text-base pl-12" data-testid="select-industry">
                  <SelectValue placeholder="Choose your business type for accurate estimates" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(INDUSTRY_DATA).map(([key, data]) => (
                    <SelectItem key={key} value={key}>
                      {data.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {selectedIndustry && (
            <IndustryBenefits 
              industry={selectedIndustry.name} 
              benefits={selectedIndustry.benefits}
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InputGroup
              label="Missed Calls Per Week"
              value={missedCalls}
              onChange={setMissedCalls}
              type="number"
              icon={Phone}
              placeholder="e.g., 20"
              testId="input-missed-calls"
            />
            <InputGroup
              label="Average Customer Value"
              value={customerValue}
              onChange={setCustomerValue}
              type="currency"
              placeholder="e.g., 500"
              testId="input-customer-value"
            />
            <InputGroup
              label="Call Conversion Rate (%)"
              value={conversionRate}
              onChange={setConversionRate}
              type="number"
              placeholder="e.g., 50"
              testId="input-conversion-rate"
            />
          </div>

          <div className="space-y-6 pt-8">
            <h3 className="text-2xl font-semibold">Your Missed Revenue</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard
                label="Weekly Loss"
                value={formatCurrency(weeklyLoss)}
                testId="metric-weekly-loss"
              />
              <MetricCard
                label="Monthly Loss"
                value={formatCurrency(monthlyLoss)}
                testId="metric-monthly-loss"
              />
              <MetricCard
                label="Annual Loss"
                value={formatCurrency(annualLoss)}
                testId="metric-annual-loss"
              />
              <MetricCard
                label="Recovery Potential (80%)"
                value={formatCurrency(recoveryPotential)}
                testId="metric-recovery-potential"
                className="bg-primary/5 border-primary/20"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
