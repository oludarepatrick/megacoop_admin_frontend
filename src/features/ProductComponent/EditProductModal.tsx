import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import type { ProductList } from "@/types/product";
import { editProductSchema, type EditProductFormData, } from "@/validations/product-schema";
import { useImageUpload } from "@/hooks/useImageUpload";
import { Textarea } from "@/components/ui/textarea";

interface EditProductModalProps {
    isOpen: boolean
    onClose: () => void
    product: ProductList
    isPending: boolean
    onSubmit: (data: EditProductFormData) => void
}

const EditProductModal = ({isOpen, onClose, product, onSubmit, isPending }: EditProductModalProps) => {
    const {register, handleSubmit, setValue, watch, formState:{errors}} = useForm<EditProductFormData>({
        resolver: zodResolver(editProductSchema),
        defaultValues: product ? { 
            ...product, 
            available_stock: product.available_stock.toString(),
            images: [], // Initialize images as an empty array or map to the expected type
            video: product.video ? null : undefined, // Ensure video is null or undefined
            status: ["active", "draft", "inactive", "archived"].includes(product.status as string) ? product.status as "active" | "draft" | "inactive" | "archived" : "active" // Map status to a valid value
        } : {
            product_name: "",
            product_category: "",
            price: "",
            available_stock: "",
            images: [],
            video: undefined, // Set default video to undefined
            size: "",
            color: "",
            full_description: "",
            seller_name: "",
            delivery_fee: "",
            status: "active", // default
        }
    })

    const status = watch("status");

    const {
            // selectedImages,
            imagePreviews,
            replaceInputRef,
            handleImageChange,
            removeImage,
            // handleReplaceClick,
            handleReplaceImage,
            // cleanupPreviews,
            canAddMore,
        } = useImageUpload({
            // maxImages: 3,
            setValue,
            fieldName: "images",
            initialImages: product.images || []
        });

    const handleFormSubmit= (data:EditProductFormData) => {
        onSubmit(data);
    }

    return (
         <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent 
                className="font-jakarta pt-4 pb-18 px-12 sm:max-w-xl max-h-[90vh] overflow-y-auto scrollbar-hide"
                aria-describedby={undefined}
            >
                <DialogHeader className="py-2 border-b border-icon/30">
                    <DialogTitle className="text-lg font-semibold text-megagreen text-center">Update Product</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <div className="space-y-3">
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
                                Product Category
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
                            

                        <div className="flex flex-col gap-4">
                            <Label className="block mb-2 text-sm font-medium text-gray-700">Status</Label>
                            <Select value={status} onValueChange={value => setValue("status", value as "active" |"draft" |"inactive" | "archived")}>
                                <SelectTrigger className="w-full border py-5 border-gray-300 rounded-md focus:!outline-none focus:!ring focus:!ring-megagreen focus:!shadow-md">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                    <SelectItem value="draft">Draft</SelectItem>
                                    <SelectItem value="archived">Archived</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button 
                            type="submit"
                            className="bg-megagreen hover:bg-megagreen/80 w-full"
                            disabled={isPending}
                        >
                            {isPending ? "Submitting..." : (
                                <>
                                    <Check />
                                    Update Product
                                </>
                            )}
                        </Button>
                        
                    </div>
                </form>

            </DialogContent>
        </Dialog>

    )
}
export default EditProductModal;