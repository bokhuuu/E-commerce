import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { Product } from "../types/product";

export const useProduct = (id: string) => {
  return useQuery<Product>({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await api.get(`/products/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};
