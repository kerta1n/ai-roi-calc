interface HeroMetricProps {
  label: string;
  value: string;
  testId?: string;
  variant?: "default" | "success" | "warning";
  icon?: React.ReactNode;
}

export default function HeroMetric({ 
  label, 
  value, 
  testId,
  variant = "default",
  icon
}: HeroMetricProps) {
  const colorClass = {
    default: "text-foreground",
    success: "text-green-600 dark:text-green-500",
    warning: "text-amber-600 dark:text-amber-500",
  }[variant];

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <div className="flex items-center gap-4">
        {icon}
        <p 
          className={`text-6xl md:text-7xl font-bold tabular-nums font-mono ${colorClass}`}
          data-testid={testId}
        >
          {value}
        </p>
      </div>
    </div>
  );
}
