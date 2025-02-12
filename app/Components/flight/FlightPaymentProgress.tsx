import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { CircleCheck, Plane, CreditCard, ShieldCheck } from "lucide-react";

export default function FlightPaymentProgress() {
  const currentStep = useSelector(
    (state: RootState) => state.flightPayment.currentStep
  );

  const steps = ["Rechercher", "Informations relatives au passager", "Confirmation"];
  const icons = [Plane, CreditCard, ShieldCheck];

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <div className="flex items-center justify-between relative">
        {steps.map((step, index) => {
          const isActive = index + 1 === currentStep;
          const isCompleted = index + 1 < currentStep;
          const StepIcon = icons[index];

          return (
            <div
              key={index}
              className="flex items-center relative flex-1 group justify-center mb-4"
            >
              {/* Step Icon */}
              <div
                className={`
                  flex items-center justify-center 
                  w-12 h-12 rounded-full 
                  transition-all duration-300 
                  z-10 relative
                  ${
                    isActive
                      ? "text-white scale-110 shadow-lg bg-[#ff8000]"
                      : isCompleted
                        ? "bg-primary text-white"
                        : "bg-muted text-muted-foreground"
                  }
                `}
              >
                {isCompleted ? (
                  <CircleCheck className="w-6 h-6" />
                ) : (
                  <StepIcon className="w-6 h-6" />
                )}

                {/* Pulse Effect for Active Step */}
                {isActive && (
                  <div className="bg-[#ff8000] absolute inset-0 bg-[#ff8000]/50 rounded-full animate-ping z-[-1]" />
                )}
              </div>

              {/* Step Label */}
              <span
                className={`
                  absolute top-full mt-3 text-center text-sm 
                  transition-all duration-300
                  ${
                    isActive
                      ? "text-primary font-semibold translate-y-0 opacity-100"
                      : "text-muted-foreground translate-y-[-10px] opacity-0"
                  }
                `}
                style={{ minWidth: "max-content" }}
              >
                {step}
              </span>

              {/* Progress Line */}
              {index < steps.length - 1 && (
                <div
                  className={`
                    w-full
                    absolute top-1/2 transform -translate-y-1/2 
                    h-0.5 flex-grow left-1/2 right-0
                    transition-all duration-300
                    ${isCompleted ? "bg-primary" : "bg-muted"}
                  `}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
