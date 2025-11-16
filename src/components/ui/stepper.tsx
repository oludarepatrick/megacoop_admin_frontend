import React from "react";
import { cn } from "@/lib/utils"; 

type Step = {
  label?: string;
  icon?: React.ReactNode;
};

interface StepperProps {
  steps: Step[];
  currentStep: number;
  className: string
}

export const Stepper: React.FC<StepperProps> = ({ steps, currentStep, className}) => {
  return (
    <ol className="flex items-center w-full [&>li:last-child]:w-auto">
      {steps.map((step, index) => {
        const isCompleted = index + 1 < currentStep;
        const isActive = index + 1 === currentStep;

        return (
          <li
            key={index}
            className={cn(
              "flex w-full items-center relative",
              index < steps.length - 1 &&
                "after:content-[''] after:w-full after:h-1 after:border-b after:inline-block",
              isCompleted
                ? "after:border-megagreen "
                : "after:border-gray-200 dark:after:border-gray-700"
            )}
          >
            <span
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full shrink-0",
                isCompleted
                  ? "bg-megagreen text-white"
                  : isActive
                  ? "bg-megagreen text-white"
                  : "border-megagreen border "
              )}
            >
              {isCompleted ? (
                // ✅ checkmark
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 16 12"
                >
                  <path d="M1 5.917 5.724 10.5 15 1.5" />
                </svg>
              ) : step.icon ? (
                step.icon
              ) : (
                index + 1
              )}
            </span>
            <span
                className={cn(
                    "absolute top-10 text-center text-megagreen text-xs max-w-[60px] hidden sm:block",
                    index === 2 && "-left-3", 
                    index === 4 && "-left-3",
                    className
                )}
            >
                {step.label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}