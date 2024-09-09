import { useSelector } from 'react-redux';
import { CircleCheck } from 'lucide-react';
import { RootState } from '@/lib/store/store';

export default function PaymentProgressComponent() {
  const step = useSelector((state: RootState) => state.paymentStep.step);

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          {step === 'details' && (
            <CircleCheck className="w-5 h-5 text-primary" />
          )}
          <span
            className={`font-medium ${step === 'details' ? 'text-primary' : 'text-muted-foreground'}`}
          >
            Details
          </span>
        </div>
        <div className="flex-grow mx-4 h-px bg-border" />
        <div className="flex items-center space-x-2">
          {step === 'payment' && (
            <CircleCheck className="w-5 h-5 text-primary" />
          )}
          <span
            className={`font-medium ${step === 'payment' ? 'text-primary' : 'text-muted-foreground'}`}
          >
            Payment
          </span>
        </div>
      </div>
    </div>
  );
}
