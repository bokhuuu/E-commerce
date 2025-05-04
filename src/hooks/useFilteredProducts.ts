import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { Filters } from "../types/filters";
import { Product } from "../types/product";

const buildQuery = (filters: Filters) => {
  const url = new URL("/products", "https://dummy.com");

  if (filters.name) url.searchParams.append("name", filters.name);
  if (filters.color) url.searchParams.append("color", filters.color);
  if (filters.sortBy) url.searchParams.append("sortBy", filters.sortBy);
  if (filters.order) url.searchParams.append("order", filters.order);
  if (filters.page) url.searchParams.append("page", filters.page.toString());
  if (filters.limit) url.searchParams.append("limit", filters.limit.toString());

  return url.pathname + "?" + url.searchParams.toString();
};

export const useFilteredProducts = (filters: Filters) => {
  const path = buildQuery(filters);

  return useQuery<Product[]>({
    queryKey: ["products", filters],
    queryFn: async () => {
      const res = await api.get(path);
      return res.data;
    },
  });
};
