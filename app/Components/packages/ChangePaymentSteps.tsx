import React from 'react'
import { Button } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { nextStep , previousStep } from '@/lib/store/custom/packagesSlices/paymentPachageSlices';

export default function ChangePaymentSteps() {
const dispatch = useDispatch()

    const handleNext = () => {
        dispatch(nextStep());
      };
    
      const handleBack = () => {
        dispatch(previousStep());
      };
    
  return (
    <div className="flex justify-between max-w-[840px] mx-auto">
    <Button variant="outline" onClick={handleBack} className="px-16">
      Back
    </Button>
   
      <Button variant={'active'} onClick={handleNext} className="px-16">
        Next
      </Button>
   
  </div>
  )
}
