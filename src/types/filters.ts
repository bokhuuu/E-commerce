export type Filters = {
  name?: string;
  color?: string;
  sortBy?: "price" | "rating";
  order?: "asc" | "desc";
  page?: number;
  limit?: number;
};
