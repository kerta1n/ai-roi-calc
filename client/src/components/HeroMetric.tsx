import AnimatedNumber from "./AnimatedNumber";

interface HeroMetricProps {
  label: string;
  value: string;
  numericValue?: number;
  testId?: string;
  variant?: "default" | "success" | "warning";
  icon?: React.ReactNode;
}

export default function HeroMetric({ 
  label, 
  value, 
  numericValue,
  testId,
  variant = "default",
  icon
}: HeroMetricProps) {
  const colorClass = {
    default: "text-foreground",
    success: "text-green-600 dark:text-green-500",
    warning: "text-amber-600 dark:text-amber-500",
  }[variant];

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(val);
  };

  const formatPercent = (val: number) => {
    return `${val.toLocaleString("en-US", { 
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}%`;
  };

  const isPercentage = value.includes('%');
  const formatValue = isPercentage ? formatPercent : formatCurrency;

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <div className="flex items-center gap-4">
        {icon}
        <p 
          className={`text-6xl md:text-7xl font-bold tabular-nums font-mono ${colorClass}`}
        >
          {numericValue !== undefined ? (
            <AnimatedNumber 
              value={numericValue} 
              formatValue={formatValue}
              testId={testId}
            />
          ) : (
            <span data-testid={testId}>{value}</span>
          )}
        </p>
      </div>
    </div>
  );
}
