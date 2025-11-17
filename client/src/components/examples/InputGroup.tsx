import { useState } from "react";
import InputGroup from "../InputGroup";
import { DollarSign, Phone } from "lucide-react";

export default function InputGroupExample() {
  const [value1, setValue1] = useState("250");
  const [value2, setValue2] = useState("15");

  return (
    <div className="p-8 space-y-6 max-w-md">
      <InputGroup
        label="Average Customer Value"
        value={value1}
        onChange={setValue1}
        type="currency"
        placeholder="e.g., 500"
        helperText="Average transaction value per customer"
        testId="input-customer-value"
      />
      <InputGroup
        label="Missed Calls Per Week"
        value={value2}
        onChange={setValue2}
        type="number"
        icon={Phone}
        placeholder="e.g., 20"
        testId="input-missed-calls"
      />
    </div>
  );
}
