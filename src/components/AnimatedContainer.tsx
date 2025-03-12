
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedContainerProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fade-in" | "slide-up" | "scale-in" | "slide-down" | "blur-in";
  delay?: 0 | 100 | 200 | 300 | 400 | 500 | 600;
  threshold?: number;
}

export const AnimatedContainer = ({
  children,
  className,
  animation = "fade-in",
  delay = 0,
  threshold = 0.2,
}: AnimatedContainerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={cn(
        isVisible ? `animate-${animation} animate-delay-${delay}` : "opacity-0",
        className
      )}
    >
      {children}
    </div>
  );
};
