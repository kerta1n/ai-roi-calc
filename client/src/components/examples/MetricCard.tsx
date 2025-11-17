import MetricCard from "../MetricCard";

export default function MetricCardExample() {
  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
      <MetricCard label="Weekly Loss" value="$3,450" testId="metric-weekly-loss" />
      <MetricCard label="Monthly Loss" value="$14,950" testId="metric-monthly-loss" />
      <MetricCard label="Annual Loss" value="$179,400" testId="metric-annual-loss" />
    </div>
  );
}
