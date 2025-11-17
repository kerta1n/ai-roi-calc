import { Card } from "@/components/ui/card";
import AnimatedNumber from "./AnimatedNumber";

interface MetricCardProps {
  label: string;
  value: string;
  numericValue?: number;
  testId?: string;
  className?: string;
  valueColor?: string;
}

export default function MetricCard({ label, value, numericValue, testId, className = "", valueColor }: MetricCardProps) {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <Card className={`p-6 ${className}`}>
      <div className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <p className={`text-3xl font-semibold tabular-nums font-mono ${valueColor || ""}`}>
          {numericValue !== undefined ? (
            <AnimatedNumber 
              value={numericValue} 
              formatValue={formatCurrency}
              testId={testId}
            />
          ) : (
            <span data-testid={testId}>{value}</span>
          )}
        </p>
      </div>
    </Card>
  );
}
