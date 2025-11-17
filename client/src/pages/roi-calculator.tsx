import { useState } from "react";
import MissedRevenueSection from "@/components/MissedRevenueSection";
import ROISection from "@/components/ROISection";

export default function ROICalculator() {
  const [recoveryPotential, setRecoveryPotential] = useState(0);
  const [missedRevenueData, setMissedRevenueData] = useState({
    industry: "",
    missedCalls: "20",
    customerValue: "250",
    conversionRate: "50",
  });

  const handleMissedRevenueChange = (data: typeof missedRevenueData) => {
    setMissedRevenueData(data);
  };

  return (
    <div className="min-h-screen">
      <MissedRevenueSection 
        onRecoveryPotentialChange={setRecoveryPotential}
        onDataChange={handleMissedRevenueChange}
      />
      <ROISection 
        initialAdditionalRevenue={recoveryPotential}
        industry={missedRevenueData.industry}
        missedCalls={missedRevenueData.missedCalls}
        customerValue={missedRevenueData.customerValue}
        conversionRate={missedRevenueData.conversionRate}
      />
    </div>
  );
}
