import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

interface IndustryBenefitsProps {
  industry: string;
  benefits: string[];
}

export default function IndustryBenefits({ industry, benefits }: IndustryBenefitsProps) {
  if (!industry || benefits.length === 0) return null;

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">Benefits for {industry}</h3>
      <ul className="space-y-3">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex gap-3">
            <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <span className="text-base">{benefit}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
