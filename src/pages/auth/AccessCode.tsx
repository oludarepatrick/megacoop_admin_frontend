import { useForm } from "react-hook-form"
import { useState } from "react"
import {zodResolver} from "@hookform/resolvers/zod"
import { Label } from "@/components/ui/label"
import elips from "../../assets/elips-bcg.svg"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { accessCodeSchema, type accessCodeFormData } from "@/validations/access-code-schema"
import { useAcessCode } from "@/hooks/useAcessCode"
import type { AppError } from "@/types"
import { getErrorMessage } from "@/utils/errorUtils"
import { useAccessCodeModal, useSuccessModal, useErrorModal } from "@/hooks/useAccessCodeModal"
import { AccessCodeConfirmationModal } from "@/features/accessCodeModals/access-code-confirmation-modal"
import { SuccessModal } from "@/features/accessCodeModals/success-modal"
import { ErrorModal } from "@/features/accessCodeModals/error-modal"
import { useNavigate } from "react-router-dom"


const AccessCode = () => {
    const {mutate, isPending, error} = useAcessCode();
    const {isOpen, formData, openModal, closeModal} = useAccessCodeModal();
    const {isSuccessOpen, openSuccessModal, closeSuccessModal} = useSuccessModal();
    const {isErrorOpen, errorMessage, openErrorModal, closeErrorModal} = useErrorModal();
    const navigate = useNavigate();
    
    // Separate state to preserve form data for success modal
    const [successFormData, setSuccessFormData] = useState<accessCodeFormData | null>(null);

    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors}
    } = useForm<accessCodeFormData>({
        resolver: zodResolver(accessCodeSchema)
    });

    const onFormSubmit = (data: accessCodeFormData) => {
        openModal(data);
    }

    const handleConfirmSubmit = () => {
        if(formData){
            mutate(formData, {
                onSuccess: () => {
                    // Preserve form data for success modal before closing confirmation modal
                    setSuccessFormData(formData);
                    closeModal();
                    openSuccessModal();
                },
                onError: (error: AppError) => {
                    closeModal();
                    const errorMsg = getErrorMessage(error, 'Failed to generate access code. Please try again.');
                    openErrorModal(errorMsg);
                }
            });
        }
    }

    const handleSuccessClose = () => {
        closeSuccessModal();
        setSuccessFormData(null); // Clear the preserved form data
        navigate("/");
    }

    const handleTryAgain = () => {
        closeErrorModal();
        openModal(formData!);
    }

    const handleErrorClose = () => {
        closeErrorModal();
    }

    return (
        <section className="min-h-screen flex font-poppins relative">
            <div className="flex-1 flex flex-col justify-between gap-6 items-center px-8 pt-10 pb-10 relative z-10">
                <header className="md:self-start">
                    <img src="/Logo.svg" alt="megacoop-logo" className="h-16" />
                </header>

                {/* Login form */}
                <form className="w-full max-w-md" onSubmit={handleSubmit(onFormSubmit)}>
                    <h1 className="text-3xl font-medium text-center">User <span className="text-megagreen">Access Code</span> Generator</h1>
                    <p className=" max-w-[337px] mx-auto text-xs font-medium text-megagreen py-4 text-center">
                        Please Make sure you provide Information that correspond with the one in your NIN
                    </p>
                    <div className="bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-lg space-y-6">
                        <div>
                            <Label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-700">
                                First name
                            </Label>
                            <Input
                                {...register("first_name")}
                                type="text" 
                                id="firstName" 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg"
                                placeholder="enter your first name"
                                disabled={isPending}
                            />
                            {errors.first_name && <p className="text-sm text-red-500 mt-1">{errors.first_name.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="middleName" className="block mb-2 text-sm font-medium text-gray-700">
                                Middle name
                            </Label>
                            <Input
                                {...register("middle_name")}
                                type="text" 
                                id="middleName" 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg"
                                placeholder="enter your middle name"
                                disabled={isPending}
                            />
                            {errors.middle_name && <p className="text-sm text-red-500 mt-1">{errors.middle_name.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-700">
                                Last name
                            </Label>
                            <Input
                                {...register("last_name")}
                                type="text" 
                                id="lastName" 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg"
                                placeholder="enter your last name"
                                disabled={isPending}
                            />
                            {errors.last_name && <p className="text-sm text-red-500 mt-1">{errors.last_name.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                                Email <span className="text-megagreen">(Valid email)</span>
                            </Label>
                            <Input
                                {...register("email")}
                                type="email" 
                                id="email" 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg"
                                placeholder="enter your email"
                                disabled={isPending}
                            />
                            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-700">
                                Phone <span className="text-megagreen">(Valid phone number)</span>
                            </Label>
                            <Input
                                {...register("phone")}
                                type="text" 
                                id="phone" 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg"
                                placeholder="enter your phone number"
                                disabled={isPending}
                            />
                            {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="userType" className="block mb-2 text-sm font-medium text-gray-700">
                                User <span className="text-megagreen">(New/old)</span>
                            </Label>
                            <Select
                                disabled={isPending}
                                onValueChange={(value) => {
                                    setValue("user_type", value as "new" | "old");
                                }}
                            >
                                <SelectTrigger className="w-full px-3 py-2 border border-gray-300 rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg">
                                    <SelectValue placeholder="Select user type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="new">new</SelectItem>
                                    <SelectItem value="old">old</SelectItem>
                                </SelectContent>
                            </Select>
                               
                            {errors.user_type && <p className="text-sm text-red-500 mt-1">{errors.user_type.message}</p>}
                        </div>
                        <Button 
                            type="submit" 
                            className="w-full bg-megagreen hover:bg-megagreen/90 text-white font-semibold py-2 px-4 rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg"
                            disabled={isPending}
                        >
                            {isPending ? "Generating code..." : "Confirm"}
                        </Button>
                        
                    </div>
                    {error && <p className="text-sm text-red-500 mt-4 text-center">{getErrorMessage(error, 'Access code generation failed. Please try again.')}</p>}
                </form>

                <footer>
                    <p>
                        Secured by <span className="text-megagreen font-semibold">
                            Mega<span className="text-black">Coop</span>
                        </span>
                    </p>
                </footer>
            </div>

            <div 
                className="absolute bottom-0 right-0 w-80 h-80 z-[-1]"
                style={{
                    backgroundImage: `url("${elips}")`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'bottom right',
                }}
            />

            {formData && (
                <AccessCodeConfirmationModal
                    isOpen={isOpen}
                    onClose={closeModal}
                    formData={formData}
                    onConfirm={handleConfirmSubmit}
                    isLoading={isPending}
                />
            )}

            {isSuccessOpen && successFormData && (
                <SuccessModal
                    isOpen={isSuccessOpen}
                    onClose={closeSuccessModal}
                    onConfirm={handleSuccessClose}
                    formData={successFormData}
                />
            )}

            <ErrorModal
                isOpen={isErrorOpen}
                onClose={handleErrorClose}
                onTryAgain={handleTryAgain}
                errorMessage={errorMessage}
            />
        </section>
    )
}

export default AccessCode;
