export interface Feedback {
  id: string;
  name: string;
  comment: string;
  createdAt: string;
  productId?: number;
  rating?: number;
}
