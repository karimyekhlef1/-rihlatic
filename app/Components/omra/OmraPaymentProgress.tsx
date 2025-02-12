import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { ClipboardListIcon, CircleCheck, BedDouble, ShieldCheck } from "lucide-react";

export default function OmraPaymentProgressComponent() {
  const { rooms } = useSelector((state: RootState) => state.omreaReservationInfos);
  const currentStep = useSelector((state: RootState) => state.paymentOmra.currentStep);
  
  // Generate steps based on number of rooms plus verification
  const steps = rooms.map((room, index) => `Room ${index + 1} (${room.type})`);
  steps.push("Verify & Complete");

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <div className="flex items-center justify-between relative">
        {steps.map((step, index) => {
          const isActive = index + 1 === currentStep;
          const isCompleted = index + 1 < currentStep;
          const isVerificationStep = index === steps.length - 1;

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
                ) : isVerificationStep ? (
                  <ShieldCheck className="w-6 h-6" />
                ) : (
                  <BedDouble className="w-6 h-6" />
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
