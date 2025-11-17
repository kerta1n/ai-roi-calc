import { Card } from "@/components/ui/card";

interface MetricCardProps {
  label: string;
  value: string;
  testId?: string;
  className?: string;
}

export default function MetricCard({ label, value, testId, className = "" }: MetricCardProps) {
  return (
    <Card className={`p-6 ${className}`}>
      <div className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <p className="text-3xl font-semibold tabular-nums font-mono" data-testid={testId}>
          {value}
        </p>
      </div>
    </Card>
  );
}
