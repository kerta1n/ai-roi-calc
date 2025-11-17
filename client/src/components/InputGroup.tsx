import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LucideIcon } from "lucide-react";

interface InputGroupProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  icon?: LucideIcon;
  type?: "text" | "number" | "currency";
  placeholder?: string;
  helperText?: string;
  testId?: string;
}

export default function InputGroup({
  label,
  value,
  onChange,
  icon: Icon,
  type = "text",
  placeholder,
  helperText,
  testId,
}: InputGroupProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium uppercase tracking-wide">
        {label}
      </Label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Icon className="h-5 w-5" />
          </div>
        )}
        {type === "currency" && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
            $
          </div>
        )}
        <Input
          type={type === "currency" ? "number" : type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={`h-14 text-base ${Icon || type === "currency" ? "pl-12" : ""}`}
          data-testid={testId}
        />
      </div>
      {helperText && (
        <p className="text-sm text-muted-foreground">{helperText}</p>
      )}
    </div>
  );
}
