import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { productFormSchema, type ProductFormData } from "@/validations/product-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Check, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useImageUpload } from "@/hooks/useImageUpload";
import { useState } from "react";
import ProductPreviewModal from "./ProductPreview";
import { useCreateProduct } from "@/hooks/useProduct";

type AddProductFormProps = {
    isOpen: boolean
    onClose: () => void;
    onSuccess: () => void;
}

const AddProductForm = ({isOpen, onClose, onSuccess}: AddProductFormProps) => {
    const [openPreview, setOpenPreview] = useState(false)
    const [formData, setFormData] = useState<ProductFormData | null>(null)

    const {register, handleSubmit, formState: {errors}, setValue, getValues} = useForm<ProductFormData>({
        resolver: zodResolver(productFormSchema),
        mode: "onChange",
    })

    const {
        // selectedImages,
        imagePreviews,
        replaceInputRef,
        handleImageChange,
        removeImage,
        // handleReplaceClick,
        handleReplaceImage,
        cleanupPreviews,
        canAddMore,
    } = useImageUpload({
        // maxImages: 3,
        setValue,
        fieldName: "images",
    });

    const {mutate, isPending} = useCreateProduct();

    const handleProductSubmit = (data: ProductFormData) => {
        mutate(data, {
            onSuccess: () => {
                console.log("product created successfully");
                // toast.success("Product created successfully!");
                cleanupPreviews();
                onClose(); // Close the dialog
                onSuccess?.();
            }
        }); 
    }
    // const handleProductSubmit = (data: ProductFormData) => {
    //     const submittedForm = {...data, status: "active" as const}
    //     mutate(submittedForm, {
    //         onSuccess: () =>{
    //             console.log("product created successfully");
    //             onSuccess();
    //         },
    //         onError: () => {
    //             toast.error("Failed to creat new product. Try again!")
    //         }
    //     })
    //     console.log(data.images)
    //     console.log("form submitted successfully", submittedForm)
    //     // Clean up preview URLs
    //     cleanupPreviews();
    // }
    
    return (
        <>
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="font-jakarta sm:max-w-xl p-0 pb-8 max-h-[90vh] overflow-y-auto scrollbar-hide" aria-describedby={undefined}
                onInteractOutside={(e) => e.preventDefault()} 
                onEscapeKeyDown={(e) => e.preventDefault()}
            >
                <DialogHeader className="py-4 border-b border-icon/30 bg-megagreen">
                    <DialogTitle className="font-semibold text-white text-center">Add New Product</DialogTitle>
                </DialogHeader>
                <form className="space-y-6 sm:px-10 p-4 px-6 w-full" onSubmit={handleSubmit(handleProductSubmit)} noValidate>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="product_name" className="block mb-2 text-sm font-medium text-gray-700">
                                Product Name <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                {...register("product_name")}
                                type="text" 
                                id="product_name" 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg"
                            />
                            {errors.product_name && <p className="text-xs text-red-500 mt-1">{errors.product_name.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-700">
                                Product Category <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                {...register("product_category")}
                                type="text" 
                                id="category" 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg"
                            />
                            {errors.product_category && <p className="text-xs text-red-500 mt-1">{errors.product_category.message}</p>}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="available_stock" className="block mb-2 text-sm font-medium text-gray-700">
                                Available Stock <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                {...register("available_stock")}
                                type="text" 
                                inputMode="numeric"
                                id="available_stock" 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg"
                            />
                            {errors.available_stock && <p className="text-xs text-red-500 mt-1">{errors.available_stock.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-700">
                                Price (₦) <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                {...register("price")}
                                type="text"
                                inputMode="decimal"
                                id="price" 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg"
                            />
                            {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price.message}</p>}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                        <div className="col-span-2">
                            <Label htmlFor="images" className="block mb-2 text-sm font-medium text-gray-700">
                                Images <span className="text-megagreen text-xs">(Max 1MB / Max 3 uploads)</span>
                            </Label>
                            <Input
                                onChange={handleImageChange}
                                type="file" 
                                id="images"
                                multiple={canAddMore}
                                accept="image/*"
                                // disabled={selectedImages.length >= 3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                            {/* Hidden input for replacing images */}
                            <input
                                ref={replaceInputRef}
                                onChange={handleReplaceImage}
                                type="file"
                                accept="image/*"
                                className="hidden"
                            />
                            {errors.images && <p className="text-xs text-red-500 mt-1">{errors.images.message}</p>}
                            
                            {/* Image Previews */}
                            {imagePreviews.length > 0 && (
                                <div className="flex items-center ml-6 flex-wrap">
                                    {imagePreviews.map((preview, index) => (
                                        <div key={index} className="relative group -ml-2 first:ml-0">
                                            <img 
                                                src={preview} 
                                                alt={`Preview ${index + 1}`}
                                                className="w-8 h-8 rounded-full object-cover border border-gray-300"
                                            />
                                            {/* Action buttons container */}
                                            <div className="absolute -top-2 -right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                {/* Delete button */}
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="bg-red-500 hover:bg-red-600 text-white rounded-full p-1"
                                                    title="Delete image"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="size" className="block mb-2 text-sm font-medium text-gray-700">
                                Size
                            </Label>
                            <Input
                                {...register("size")}
                                type="text" 
                                id="size" 
                                className="w-full sm:w-20 px-3 py-2 border border-gray-300 rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg"
                            />
                            {errors.size && <p className="text-xs text-red-500 mt-1">{errors.size.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="color" className="block mb-2 text-sm font-medium text-gray-700">
                                Color
                            </Label>
                            <Input
                                {...register("color")}
                                type="color" 
                                id="color" 
                                className="w-full sm:w-20 px-3 py-2 border border-gray-300 rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg"
                            />
                            {errors.color && <p className="text-xs text-red-500 mt-1">{errors.color.message}</p>}
                        </div>
                    </div>
                    <div className="">
                        <Label htmlFor="video" className="block mb-2 text-sm font-medium text-gray-700">
                            Video <span className="text-megagreen text-xs">(Max 5MB)</span>
                        </Label>
                        <Input
                            {...register("video")}
                            type="file" 
                            id="video"
                            accept="video/mp4"
                            className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg"
                        />
                        {errors.video && <p className="text-xs text-red-500 mt-1">{errors.video.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-700">
                            Detailed Description <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                            {...register("full_description")}
                            id="full_description" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg"
                            placeholder="Add product description..."
                        />
                        {errors.full_description && <p className="text-xs text-red-500 mt-1">{errors.full_description.message}</p>}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="seller_name" className="block mb-2 text-sm font-medium text-gray-700">
                                Seller Name
                            </Label>
                            <Input
                                {...register("seller_name")}
                                type="text" 
                                id="seller_name" 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg"
                            />
                            {errors.seller_name && <p className="text-xs text-red-500 mt-1">{errors.seller_name.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="delivery_fee" className="block mb-2 text-sm font-medium text-gray-700">
                                Delivery Fee (₦) <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                {...register("delivery_fee")}
                                type="text"
                                inputMode="decimal"
                                id="delivery_fee" 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg"
                            />
                            {errors.delivery_fee && <p className="text-xs text-red-500 mt-1">{errors.delivery_fee.message}</p>}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <button type="button" className="text-megagreen hover:bg-transparent text-xs flex gap-2 items-center font-medium cursor-pointer"
                            onClick={() => {
                                const currentFormData = getValues();
                                setFormData(currentFormData);
                                setOpenPreview(true);
                            }}
                        >
                            <ArrowLeft className="w-4 h-4" /> Preview Product Details
                        </button>
                        <Button type="submit" 
                            className="bg-megagreen hover:bg-megagreen/90 text-xs"
                            disabled={isPending}
                        >
                            {isPending ? "Submitting..." : (<><Check/> Submit new product</>)}
                        </Button>
                    </div>
                </form>
            </DialogContent>

        </Dialog>
            {formData && (
                <ProductPreviewModal
                    isOpen = {openPreview}
                    onClose={() => {
                        setOpenPreview(false)
                        setFormData(null)
                    }}
                    formData={formData}

                />
            )}
        </>
    )
}
export default AddProductForm