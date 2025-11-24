import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Stepper } from "@/components/ui/stepper";
import { Button } from "@/components/ui/button";
import bcgImg from "@/assets/golden-coins-3d.png"
import Step1 from "./FormSteps/Step1";
import { ArrowLeft, Check } from "lucide-react";
import Step2 from "./FormSteps/Step2";
import Step3 from "./FormSteps/Step3";
import Step4 from "./FormSteps/Step4";
import Step5 from "./FormSteps/Step5";
import { useForm } from "react-hook-form";
import { 
  investmentFormSchema, 
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  step5Schema,
  type InvestmentFormData 
} from "@/validations/investment-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateInvestment } from "@/hooks/useInvestment";


const steps = [
  { id: 1, label: "Personal Info" },
  { id: 2, label: "Investment Details" },
  { id: 3, label: "Company Funds" },
  { id: 4, label: "Bank Details" },
  { id: 5, label: "Documents" },
];

type InvestmentWizardProps = {
    isOpen: boolean
    onClose: () => void;
    onSuccess: () => void;
}

const InvestmentWizard = ({isOpen, onClose, onSuccess}: InvestmentWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);

  const {mutate, isPending } = useCreateInvestment(() => {
      onClose()
      onSuccess()
    })

  
  const form = useForm<InvestmentFormData>({
    resolver: zodResolver(investmentFormSchema),
    mode: "onChange",
  });

  const { handleSubmit, getValues } = form;

  // Map each step to its schema
  const stepSchemas = {
    1: step1Schema,
    2: step2Schema,
    3: step3Schema,
    4: step4Schema,
    5: step5Schema,
  };

  const onSubmitForm = (data: InvestmentFormData) => {
        mutate({
            ...data, 
            status: "pending" as const
        })
        console.log("Final submission", data);
  };

  const goNext = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Get current form values
    const formData = getValues();
    
    // Validate current step using its schema
    const currentSchema = stepSchemas[currentStep as keyof typeof stepSchemas];
    const result = currentSchema.safeParse(formData);
    
    if (result.success && currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    } else if (!result.success) {
      // Manually trigger validation to show errors
      const fieldNames = Object.keys(currentSchema.shape);
      await form.trigger(fieldNames as (keyof InvestmentFormData)[]);
    }
  };

  const goBack = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const renderSteps = () => {
    switch (currentStep) {
      case 1:
        return <Step1 formData={form} />;
      case 2:
        return <Step2 formData={form} />;
      case 3:
        return <Step3 formData={form} />;
      case 4:
        return <Step4 formData={form} />;
      case 5:
        return <Step5 formData={form} />;
      default:
        return null;
    }
  };

  return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent 
                className="font-jakarta py-10 pb-18 px-16 max-h-[90vh] overflow-y-auto scrollbar-hide"
                aria-describedby={undefined}
                style={{
                backgroundImage: `url(${bcgImg})`,
                backgroundPosition: "bottom right",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100px",
                }}
            >
                <DialogHeader>
                <DialogTitle className="text-xl font-semibold text-center">
                    Investment Form Wizard
                </DialogTitle>
                </DialogHeader>

                {/* Stepper */}
                <Stepper steps={steps} currentStep={currentStep} className="sm:hidden" />

                {/* Step Content */}
                <form className="space-y-6 pt-4" onSubmit={handleSubmit(onSubmitForm)}>
                {renderSteps()}

                {/* Navigation Buttons */}
                <div className="flex flex-col justify-center items-center w-full mx-auto">
                    {currentStep < steps.length ? (
                        <Button 
                            type="button"
                            onClick={goNext}
                            className="bg-megagreen hover:bg-megagreen/80 w-full"
                            disabled={isPending}
                        >
                            Proceed
                        </Button>
                    ) : (
                        <Button 
                            type="submit"
                            className="bg-megagreen hover:bg-megagreen/80 w-full"
                            disabled={isPending}
                        >
                            {isPending ? "Submitting..." : (
                                <>
                                    <Check />
                                    Submit Investment
                                </>
                            )}
                        </Button>

                    )}
                    <Button 
                    type="button"
                    variant="ghost" 
                    onClick={goBack} 
                    disabled={currentStep === 1 || isPending} 
                    className={`${currentStep === 1 ? "hidden" : ""} text-megagreen hover:bg-transparent w-full`}
                    >
                    <ArrowLeft /> Previous
                    </Button>
                </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default InvestmentWizard;