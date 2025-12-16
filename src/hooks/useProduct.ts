import { productAPI } from "@/services/productApi";
import type { EditProductFormData, ProductFormData } from "@/validations/product-schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

export function useProductList(page: number) {
    return useQuery({
        queryKey: ["products", page],
        // queryFn: () => productAPI.getProductList()
        queryFn: () => productAPI.getProductList(page)
    })
}
export function useCreateProduct(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: ProductFormData) => productAPI.createProduct(data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:["products"]})
        },
        onError: (error: AxiosError )=> {
            console.log("product creation failed", error)
            console.log("Error:", error.response?.data);
            toast.error("Failed to create new product. Try again!");
        }
    })
}

export function useUpdateProduct(onSuccess:()=>void){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: EditProductFormData }) => productAPI.updateProduct(id, data),
        onSuccess: () => {
            console.log("product updated successfully");
            queryClient.invalidateQueries({queryKey: ["products"]});
            onSuccess();
        },
        onError: (error)=> {
            toast.error("product update failed. Try again");
            console.log("product creation failed", error)
        }
    })
}
export function useDeleteProduct(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => productAPI.deleteProduct(id),
        onSuccess: () => {
            console.log("product deleted successfully");
            queryClient.invalidateQueries({queryKey: ["products"]});
        },
        onError: (error)=> {
            toast.error("failed to delete product. Try again");
            console.log("failed", error)
        }
    })
}
export function useProductNotification(){
    return useMutation({
        mutationFn: (id: number) => productAPI.notifyUser(id),
        onSuccess: () => {
            toast.success("Notifications sent successfully")
        },
        onError: (error)=> {
            toast.error("failed to send notification product. Try again");
            console.log("failed", error)
        }
    })
}
