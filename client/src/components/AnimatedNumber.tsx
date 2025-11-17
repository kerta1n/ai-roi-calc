import { useEffect, useRef, useState } from "react";

interface AnimatedNumberProps {
  value: number;
  formatValue?: (value: number) => string;
  className?: string;
  testId?: string;
  duration?: number;
}

export default function AnimatedNumber({ 
  value, 
  formatValue = (v) => v.toString(), 
  className = "",
  testId,
  duration = 800
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>();
  const startValueRef = useRef(value);

  useEffect(() => {
    if (displayValue === value) return;

    startValueRef.current = displayValue;
    startTimeRef.current = undefined;

    const animate = (currentTime: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime;
      }

      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      const currentValue = startValueRef.current + (value - startValueRef.current) * easeOutQuart;
      
      setDisplayValue(currentValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [value, duration, displayValue]);

  return (
    <span className={className} data-testid={testId}>
      {formatValue(displayValue)}
    </span>
  );
}
