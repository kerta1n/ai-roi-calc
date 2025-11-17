import HeroMetric from "../HeroMetric";

export default function HeroMetricExample() {
  return (
    <div className="p-8 space-y-12 max-w-2xl">
      <HeroMetric 
        label="Net Annual Profit" 
        value="$141,520" 
        testId="hero-net-profit"
        variant="success"
      />
      <HeroMetric 
        label="ROI Percentage" 
        value="7,076%" 
        testId="hero-roi-percentage"
        variant="success"
      />
    </div>
  );
}
