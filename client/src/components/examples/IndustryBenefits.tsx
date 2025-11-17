import IndustryBenefits from "../IndustryBenefits";

export default function IndustryBenefitsExample() {
  const benefits = [
    "24/7/365 emergency call handling for issues like frozen pipes or AC failures",
    "Smart triage to prioritize emergency calls over routine maintenance",
    "Automated scheduling integrated with dispatch tools",
    "Service request triage and routing",
    "Remote estimation and pricing",
  ];

  return (
    <div className="p-8 max-w-2xl">
      <IndustryBenefits 
        industry="Home Services (HVAC, Plumbing, Electrical)" 
        benefits={benefits}
      />
    </div>
  );
}
