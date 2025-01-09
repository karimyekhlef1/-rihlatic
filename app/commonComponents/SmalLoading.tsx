import React from "react";
const SmalLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full ">
      <style jsx>{`
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(-5%);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
          50% {
            transform: translateY(0);
            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
          }
        }

        @keyframes ping {
          75%,
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        @keyframes loading {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }

        .logo-bounce {
          animation: bounce 1s infinite;
        }

        .background-ping {
          animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .loading-bar {
          animation: loading 2s ease-in-out infinite;
        }

        .shimmer {
          animation: shimmer 2s linear infinite;
        }

        .text-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
      <div className="relative mt-2 w-36 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className="loading-bar absolute top-0 left-0 h-full w-full bg-gradient-to-r from-orange-400 to-orange-600"></div>
        <div className="shimmer absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      </div>
    </div>
  );
};

export default SmalLoading;
