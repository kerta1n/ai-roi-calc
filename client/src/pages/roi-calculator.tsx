import { useState } from "react";
import MissedRevenueSection from "@/components/MissedRevenueSection";
import ROISection from "@/components/ROISection";

export default function ROICalculator() {
  const [recoveryPotential, setRecoveryPotential] = useState(0);

  return (
    <div className="min-h-screen">
      <MissedRevenueSection onRecoveryPotentialChange={setRecoveryPotential} />
      <ROISection initialAdditionalRevenue={recoveryPotential} />
    </div>
  );
}
