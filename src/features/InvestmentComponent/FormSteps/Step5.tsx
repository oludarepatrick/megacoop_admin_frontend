import { Label } from "@/components/ui/label"
import type { InvestmentFormData } from "@/validations/investment-schema";
import { useState, useRef } from "react"
import type { UseFormReturn } from "react-hook-form";
import { FileUp, X } from 'lucide-react';

type Step5Props = {
    formData: UseFormReturn<InvestmentFormData>
}

const Step5 = ({formData}: Step5Props) => {
    const { setValue, formState: {errors}, watch } = formData;

    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    // Watch the document field to keep UI in sync
    const selectedFile = watch("document") as File | undefined;

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type === "application/pdf") {
            setValue("document", file, { shouldValidate: true });
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setValue("document", file, { shouldValidate: true });
        }
    };

    const handleRemoveFile = () => {
        setValue("document", undefined, { shouldValidate: true });
        // Reset the file input using ref
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="space-y-3">
            <h2 className="text-megagreen font-semibold text-sm">Upload Documents</h2>
            <div>
                <Label className="block mb-2 text-sm font-medium text-gray-700">
                    Upload All Document in One Pdf File
                </Label>
                
                {/* Upload Area */}
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-2xl p-8 mb-2 transition-all cursor-pointer ${
                        isDragging
                            ? 'border-green-500 bg-green-50'
                            : errors.document
                            ? 'border-red-300 bg-red-50/30'
                            : 'border-purple-200 bg-purple-50/30'
                    }`}
                    onClick={!selectedFile ? triggerFileInput : undefined}
                >
                    <div className="flex flex-col items-center justify-center text-center">
                        {selectedFile ? (
                            <div className="w-full">
                                <div className="flex items-center gap-3 mb-4">
                                    <FileUp className="text-green-600" size={40} />
                                    <div className="text-left flex-1">
                                        <p className="font-medium text-gray-900 text-sm">{selectedFile.name}</p>
                                        <p className="text-xs text-gray-500">
                                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleRemoveFile}
                                        className="text-red-500 hover:text-red-700 transition-colors"
                                        title="Remove file"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                                <button
                                    type="button"
                                    onClick={triggerFileInput}
                                    className="text-green-600 font-medium hover:underline text-center text-sm"
                                >
                                    Click here to change file
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="mb-4 bg-[#EEF2FF] rounded-full w-12 h-12 flex items-center justify-center">
                                    <FileUp className="text-green-600" />
                                </div>
                                <div className="mb-2 text-sm">
                                    <span className="text-green-600 font-medium">
                                        Click here
                                    </span>
                                    <span className="text-gray-600"> to upload your file or drag.</span>
                                </div>
                                <p className="text-xs font-semibold text-gray-500">
                                    Supported Format: PDF (10mb)
                                </p>
                            </>
                        )}
                    </div>
                </div>

                {/* Hidden File Input with ref */}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/pdf,.pdf"
                    className="hidden"
                    onChange={handleFileSelect}
                    aria-label="Upload document"
                />

                {/* Error Message */}
                {errors.document && (
                    <p className="text-xs text-red-500 mt-1">
                        {errors.document.message as string}
                    </p>
                )}

                {/* Info Message */}
                <p className="text-sm text-green-600 mt-3 font-semibold">
                    Please Ensure all Information Are Correct before submitting
                </p>
            </div>
        </div>
    );
};

export default Step5;