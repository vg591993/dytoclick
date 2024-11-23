// src/components/new-client/steps/StepIndicator.tsx
interface StepIndicatorProps {
  currentStep: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      {[1, 2, 3, 4, 5].map((step) => (
        <div
          key={step}
          className={`w-2.5 h-2.5 rounded-full ${
            step === currentStep
              ? 'bg-teal-500'
              : step < currentStep
              ? 'bg-teal-200'
              : 'bg-gray-200'
          }`}
        />
      ))}
    </div>
  );
};