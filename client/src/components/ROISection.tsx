import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Save, Check, TrendingUp } from "lucide-react";
import InputGroup from "./InputGroup";
import HeroMetric from "./HeroMetric";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ReferenceLine } from "recharts";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface ROISectionProps {
  initialAdditionalRevenue?: number;
  industry?: string;
  missedCalls?: string;
  customerValue?: string;
  conversionRate?: string;
}

export default function ROISection({ 
  initialAdditionalRevenue = 0,
  industry = "",
  missedCalls = "0",
  customerValue = "0",
  conversionRate = "0"
}: ROISectionProps) {
  const { toast } = useToast();
  const [annualSavings, setAnnualSavings] = useState("25000");
  const [additionalRevenue, setAdditionalRevenue] = useState(
    initialAdditionalRevenue.toString()
  );
  const [annualCost, setAnnualCost] = useState("2000");
  const [isSaving, setIsSaving] = useState(false);
  const [savedId, setSavedId] = useState<string | null>(null);

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
    const element = document.createElement('a');
    const content = `
AI Phone Agent ROI Calculator - Results
========================================

Input Parameters:
- Industry: ${industry || 'Not specified'}
- Missed Calls Per Week: ${missedCalls}
- Average Customer Value: $${customerValue}
- Call Conversion Rate: ${conversionRate}%
- Estimated Annual Savings: ${formatCurrency(annualSavingsNum)}
- Additional Annual Revenue: ${formatCurrency(additionalRevenueNum)}
- Annual AI Solution Cost: ${formatCurrency(annualCostNum)}

Results:
- Net Annual Profit: ${formatCurrency(netProfit)}
- ROI Percentage: ${formatPercent(roiPercentage)}
- Total Benefit: ${formatCurrency(totalBenefit)}
- Payback Period: ${paybackMonths > 0 ? `${paybackMonths.toFixed(1)} months` : 'N/A'}
- 3-Year Projection: ${formatCurrency(threeYearProfit)}

Generated on: ${new Date().toLocaleString()}
    `.trim();
    
    const blob = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(blob);
    element.download = `roi-calculation-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    URL.revokeObjectURL(element.href);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const data = {
        industry: industry || null,
        missedCalls: missedCalls,
        customerValue: customerValue,
        conversionRate: conversionRate,
        annualSavings: annualSavings,
        additionalRevenue: additionalRevenue,
        annualCost: annualCost,
      };

      const response = await fetch("/api/calculations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to save calculation");
      }

      const result = await response.json();
      setSavedId(result.id);
      toast({
        title: "Calculation Saved",
        description: "Your ROI calculation has been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "Failed to save calculation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const pieData = [
    { name: "Additional Revenue", value: additionalRevenueNum, color: "hsl(var(--chart-1))" },
    { name: "AI Solution Cost", value: annualCostNum, color: "hsl(var(--chart-4))" },
  ];

  const barData = [
    { 
      name: "Total Benefits", 
      value: totalBenefit,
      fill: "hsl(var(--chart-2))"
    },
    { 
      name: "AI Solution Cost", 
      value: annualCostNum,
      fill: "hsl(var(--chart-4))"
    },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <Card className="p-3">
          <p className="font-semibold">{formatCurrency(payload[0].value)}</p>
        </Card>
      );
    }
    return null;
  };

  const allROIInputsFilled = annualSavings && additionalRevenue && annualCost;

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-8 h-fit">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-semibold">Calculate Your ROI</h2>
                <p className="text-base text-muted-foreground">
                  Enter your estimated costs and benefits to see your AI phone agent investment return
                </p>
              </div>

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
          </Card>

          <div className="space-y-6 max-h-[800px] overflow-y-auto">
            <div className="flex gap-3 justify-end flex-wrap sticky top-0 bg-muted/30 py-2 z-10">
              <Button
                variant="outline"
                onClick={handleDownload}
                data-testid="button-download-pdf"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </Button>
              <Button
                variant="outline"
                onClick={handleSave}
                disabled={isSaving}
                data-testid="button-save-calculation"
              >
                {savedId ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Saved
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    {isSaving ? "Saving..." : "Save Calculation"}
                  </>
                )}
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
                    icon={allROIInputsFilled && netProfit > 0 ? (
                      <TrendingUp 
                        className="h-12 w-12 text-green-600 dark:text-green-500 animate-in fade-in slide-in-from-bottom-4 duration-700" 
                        data-testid="icon-trending-up"
                      />
                    ) : undefined}
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

            <Card className="p-8">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-1">Cost Breakdown</h3>
                  <p className="text-sm text-muted-foreground">Distribution of savings, revenue, and costs</p>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="p-8">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-1">Benefits vs Costs</h3>
                  <p className="text-sm text-muted-foreground">Comparison of total benefits and AI solution cost</p>
                </div>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart 
                    data={barData} 
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis type="number" tickFormatter={(value) => formatCurrency(value)} />
                    <YAxis dataKey="name" type="category" />
                    <RechartsTooltip content={<CustomTooltip />} />
                    <ReferenceLine x={totalBenefit} stroke="hsl(var(--primary))" strokeWidth={2} strokeDasharray="3 3" />
                    <Bar dataKey="value" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
