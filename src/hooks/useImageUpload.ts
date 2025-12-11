// import type { ProductFormData } from "@/validations/product-schema";
import { useState, useRef, useCallback } from "react";
import { type UseFormSetValue } from "react-hook-form";

interface UseImageUploadProps {
    maxImages?: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setValue: UseFormSetValue<any>;
    fieldName: "images";
}

export const useImageUpload = ({ 
    maxImages = 3, 
    setValue, 
    fieldName 
}: UseImageUploadProps) => {
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [replacingIndex, setReplacingIndex] = useState<number | null>(null);
    const replaceInputRef = useRef<HTMLInputElement>(null);

    const updateFormValue = useCallback((images: File[]) => {
        const dataTransfer = new DataTransfer();
        images.forEach(file => dataTransfer.items.add(file));
        setValue(fieldName, Array.from(dataTransfer.files), { shouldValidate: true });
    }, [setValue, fieldName]);

    const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        const newFiles = Array.from(files);
        const updatedImages = [...selectedImages, ...newFiles].slice(0, maxImages);
        
        setSelectedImages(updatedImages);

        // Create preview URLs
        const newPreviews = updatedImages.map(file => URL.createObjectURL(file));
        setImagePreviews(newPreviews);

        // Update form value for validation
        updateFormValue(updatedImages);

        // Reset input
        e.target.value = '';
    }, [selectedImages, maxImages, updateFormValue]);

    const removeImage = useCallback((index: number) => {
        const updatedImages = selectedImages.filter((_, i) => i !== index);
        const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
        
        // Revoke the URL to free memory
        URL.revokeObjectURL(imagePreviews[index]);
        
        setSelectedImages(updatedImages);
        setImagePreviews(updatedPreviews);

        // Update form value
        updateFormValue(updatedImages);
    }, [selectedImages, imagePreviews, updateFormValue]);

    const handleReplaceClick = useCallback((index: number) => {
        setReplacingIndex(index);
        replaceInputRef.current?.click();
    }, []);

    const handleReplaceImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0 || replacingIndex === null) return;

        const newFile = files[0];
        
        // Revoke old preview URL
        URL.revokeObjectURL(imagePreviews[replacingIndex]);

        // Update arrays
        const updatedImages = [...selectedImages];
        updatedImages[replacingIndex] = newFile;

        const updatedPreviews = [...imagePreviews];
        updatedPreviews[replacingIndex] = URL.createObjectURL(newFile);

        setSelectedImages(updatedImages);
        setImagePreviews(updatedPreviews);

        // Update form value
        updateFormValue(updatedImages);

        // Reset
        setReplacingIndex(null);
        e.target.value = '';
    }, [replacingIndex, selectedImages, imagePreviews, updateFormValue]);

    const cleanupPreviews = useCallback(() => {
        imagePreviews.forEach(url => URL.revokeObjectURL(url));
    }, [imagePreviews]);

    return {
        selectedImages,
        imagePreviews,
        replaceInputRef,
        handleImageChange,
        removeImage,
        handleReplaceClick,
        handleReplaceImage,
        cleanupPreviews,
        canAddMore: selectedImages.length < maxImages,
    };
};