import { z } from "zod";

export const feedbackSchema = z.object({
  name: z.string().min(1, "Name is required"),
  comment: z.string().min(5, "Comment must be at least 5 characters"),
  rating: z.number().min(1).max(5),
  productId: z.number(),
});

export type FeedbackFormData = z.infer<typeof feedbackSchema>;
