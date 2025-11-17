import { useEffect, useState } from "react";

interface AnimatedNumberProps {
  value: number;
  formatValue?: (value: number) => string;
  className?: string;
  testId?: string;
}

export default function AnimatedNumber({ 
  value, 
  formatValue = (v) => v.toString(), 
  className = "",
  testId
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (displayValue === value) return;

    setIsAnimating(true);
    setDisplayValue(value);

    const timeout = setTimeout(() => {
      setIsAnimating(false);
    }, 600);

    return () => clearTimeout(timeout);
  }, [value]);

  const formattedValue = formatValue(displayValue);
  const chars = formattedValue.split('');

  return (
    <span className={`inline-flex ${className}`} data-testid={testId}>
      {chars.map((char, index) => (
        <span
          key={`${index}-${char}`}
          className={`inline-block ${isAnimating && char !== '$' && char !== ',' && char !== '%' ? 'animate-roll-digit' : ''}`}
          style={{
            minWidth: char === ',' || char === '.' ? '0.3em' : char === '$' || char === '%' ? '0.6em' : '0.6em'
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}
