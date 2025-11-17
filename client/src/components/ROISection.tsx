import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Save } from "lucide-react";
import InputGroup from "./InputGroup";
import HeroMetric from "./HeroMetric";

interface ROISectionProps {
  initialAdditionalRevenue?: number;
}

export default function ROISection({ initialAdditionalRevenue = 0 }: ROISectionProps) {
  const [annualSavings, setAnnualSavings] = useState("25000");
  const [additionalRevenue, setAdditionalRevenue] = useState(
    initialAdditionalRevenue.toString()
  );
  const [annualCost, setAnnualCost] = useState("2000");

  useEffect(() => {
    if (initialAdditionalRevenue > 0) {
      setAdditionalRevenue(initialAdditionalRevenue.toString());
    }
  }, [initialAdditionalRevenue]);

  const annualSavingsNum = parseFloat(annualSavings) || 0;
  const additionalRevenueNum = parseFloat(additionalRevenue) || 0;
  const annualCostNum = parseFloat(annualCost) || 0;

  const totalBenefit = annualSavingsNum + additionalRevenueNum;
  const netProfit = totalBenefit - annualCostNum;
  const roiPercentage = annualCostNum > 0 ? (netProfit / annualCostNum) * 100 : 0;
  const paybackMonths = annualCostNum > 0 && totalBenefit > 0 
    ? (annualCostNum / (totalBenefit / 12)) 
    : 0;
  const threeYearProfit = netProfit * 3;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return `${value.toLocaleString("en-US", { 
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}%`;
  };

  const handleDownload = () => {
    console.log("Download PDF triggered");
  };

  const handleSave = () => {
    console.log("Save calculation triggered");
  };

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-semibold">Calculate Your ROI</h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Enter your estimated costs and benefits to see your AI phone agent investment return
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <InputGroup
              label="Estimated Annual Savings ($)"
              value={annualSavings}
              onChange={setAnnualSavings}
              type="currency"
              placeholder="e.g., 50000"
              helperText="Cost reductions from labor, fewer missed leads, time saved, reduced errors"
              testId="input-annual-savings"
            />
            <InputGroup
              label="Additional Annual Revenue ($)"
              value={additionalRevenue}
              onChange={setAdditionalRevenue}
              type="currency"
              placeholder="Auto-populated from recovery potential"
              helperText="New leads captured, upsells, conversion improvements"
              testId="input-additional-revenue"
            />
            <InputGroup
              label="Annual Cost of AI Solution ($)"
              value={annualCost}
              onChange={setAnnualCost}
              type="currency"
              placeholder="e.g., 2000"
              helperText="Subscription, implementation, maintenance"
              testId="input-annual-cost"
            />
          </div>

          <div className="space-y-8 lg:sticky lg:top-8 lg:self-start">
            <div className="flex gap-3 justify-end flex-wrap">
              <Button
                variant="outline"
                onClick={handleDownload}
                data-testid="button-download-pdf"
              >
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              <Button
                variant="outline"
                onClick={handleSave}
                data-testid="button-save-calculation"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Calculation
              </Button>
            </div>

            <Card className="p-8">
              <div className="space-y-8">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <HeroMetric
                    label="Net Annual Profit"
                    value={formatCurrency(netProfit)}
                    testId="hero-net-profit"
                    variant={netProfit > 0 ? "success" : netProfit < 0 ? "warning" : "default"}
                  />
                </div>

                <div className="pt-6 border-t">
                  <HeroMetric
                    label="ROI Percentage"
                    value={formatPercent(roiPercentage)}
                    testId="hero-roi-percentage"
                    variant={roiPercentage > 0 ? "success" : "default"}
                  />
                </div>

                {netProfit > 0 && (
                  <Badge variant="default" className="text-sm px-4 py-2" data-testid="badge-positive-roi">
                    Positive ROI
                  </Badge>
                )}

                <div className="space-y-4 pt-6 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                      Total Benefit:
                    </span>
                    <span className="text-xl font-semibold font-mono" data-testid="text-total-benefit">
                      {formatCurrency(totalBenefit)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                      AI Solution Cost:
                    </span>
                    <span className="text-xl font-semibold font-mono" data-testid="text-ai-cost">
                      {formatCurrency(annualCostNum)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                      Net Profit:
                    </span>
                    <span className="text-xl font-semibold font-mono" data-testid="text-net-profit">
                      {formatCurrency(netProfit)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                      Payback Period:
                    </span>
                    <span className="text-xl font-semibold font-mono" data-testid="text-payback-period">
                      {paybackMonths > 0 ? `${paybackMonths.toFixed(1)} months` : "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t">
                    <span className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                      3-Year Projection:
                    </span>
                    <span className="text-2xl font-semibold font-mono text-green-600 dark:text-green-500" data-testid="text-three-year-projection">
                      {formatCurrency(threeYearProfit)}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
