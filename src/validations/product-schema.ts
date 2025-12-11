import z from "zod";

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const productFormSchema = z.object({
    product_name: z.string().min(2, "Product name is required"),
    product_category: z.string().min(2, "Product category is required"),
    price: z.string()
        .min(1, "Price is required")
        .regex(/^\d+(\.\d{1,2})?$/, "Price must be a valid number"),
    available_stock: z.string()
        .min(1, "Stock is required")
        .regex(/^\d+$/, "Stock must be a valid number"),
    images: z.array(z.instanceof(File))
        .max(3, "Max 3 images allowed")
        .refine((files) => files.length <= 3, "Max 3 images allowed")
        .refine(
            (files) => files.every((file) => file.size <= MAX_FILE_SIZE),
            "Each file must be less than 1MB"
        )
        .refine(
            (files) => files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
            "Only .jpg, .jpeg, .png and .webp formats are supported."
        ),
    size: z.string().optional(),
    color: z.string().optional(),
    video: z.any()
        .transform((file) => (file instanceof FileList && file.length > 0 ? file[0] : null))
        .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
            message: "File must be 5MB or smaller",
        })
        .refine((file) => !file || ["video/mp4"].includes(file.type), {
            message: "Only .mp4 format is supported",
        })
        .optional(),
    full_description: z.string().min(1, "Description is required"),
    seller_name: z.string().optional(),
    delivery_fee: z.string()
        .min(1, "Delivery fee is required")
        .regex(/^\d+(\.\d{1,2})?$/, "Fee must be a valid number"),
});

export type ProductFormData = z.output<typeof productFormSchema>;

export const editProductSchema = z.object({
    product_name: z.string().optional(),
    product_category: z.string().optional(),
    price: z.string().optional(),
    available_stock: z.string()
        .min(1, "Stock is required")
        .regex(/^\d+$/, "Stock must be a valid number").optional(),
    images: z.array(z.instanceof(File))
        .max(3, "Max 3 images allowed")
        .refine((files) => files.length <= 3, "Max 3 images allowed")
        .refine(
            (files) => files.every((file) => file.size <= MAX_FILE_SIZE),
            "Each file must be less than 1MB"
        )
        .refine(
            (files) => files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
            "Only .jpg, .jpeg, .png and .webp formats are supported."
        ).optional(),
    size: z.string().optional(),
    color : z.string().optional(),
    video :  z.any()
        .transform((file) => (file instanceof FileList && file.length > 0 ? file[0] : null))
        .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
            message: "File must be 5MB or smaller",
        })
        .refine((file) => !file || ["video/mp4"].includes(file.type), {
            message: "Only .mp4 format is supported",
        })
        .optional(),
    full_description: z.string().optional(),
    seller_name: z.string().optional(),
    delivery_fee: z.string().optional(),
    status: z.enum(["active", "draft", "inactive", "archived"]).optional()
})

export type EditProductFormData = z.infer<typeof editProductSchema>