/**
 * FADE CONTENT COMPONENT
 * 
 * Purpose:
 * Animation wrapper that fades content into view when it enters the viewport.
 * Uses Intersection Observer API for efficient scroll-based animations.
 * 
 * Key Features:
 * - Fade-in animation with customizable duration and easing
 * - Optional blur effect during transition
 * - Configurable delay and intersection threshold
 * - Viewport detection for performance optimization
 * 
 * Usage:
 * <FadeContent blur={true} duration={900} easing="ease-out" initialOpacity={0}>
 *   <YourContent />
 * </FadeContent>
 */

"use client"

import { useRef, useEffect, useState, ReactNode } from 'react';

interface FadeContentProps {
  children: ReactNode;
  blur?: boolean;
  duration?: number;
  easing?: string;
  delay?: number;
  threshold?: number;
  initialOpacity?: number;
  className?: string;
  fromRight?: boolean;
}

const FadeContent: React.FC<FadeContentProps> = ({
  children,
  blur = false,
  duration = 1000,
  easing = 'ease-out',
  delay = 0,
  threshold = 0.1,
  initialOpacity = 0,
  className = '',
  fromRight = false,
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.unobserve(element);
          setTimeout(() => {
            setInView(true);
          }, delay);
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, delay]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : initialOpacity,
        transform: fromRight ? (inView ? 'translateX(0)' : 'translateX(50px)') : 'none',
        transition: `opacity ${duration}ms ${easing}, filter ${duration}ms ${easing}, transform ${duration}ms ${easing}`,
        filter: blur ? (inView ? 'blur(0px)' : 'blur(10px)') : 'none'
      }}
    >
      {children}
    </div>
  );
};

export default FadeContent;

