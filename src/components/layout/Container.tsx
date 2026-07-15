import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Centers content and applies consistent horizontal padding + max width
 * across the app. Use this instead of repeating max-w/px classes.
 */
export default function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-5xl px-6 md:px-8 ${className}`}>
      {children}
    </div>
  );
}
