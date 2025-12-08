import { productAPI } from "@/services/productApi";
import { useQuery } from "@tanstack/react-query";

export function useProductList(page: number) {
    return useQuery({
        queryKey: ["products", page],
        queryFn: () => productAPI.getProductList()
        // queryFn: () => productAPI.getProductList(page)
    })
}
