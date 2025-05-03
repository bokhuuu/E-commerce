import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { Feedback } from "../types/feedback";

const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const useFeedbacksByProduct = (productId: number) => {
  return useQuery<Feedback[]>({
    queryKey: ["feedbacks", productId],
    queryFn: async () => {
      const response = await api.get<Feedback[]>(
        `/feedbacks?productId=${productId}`
      );

      return response.data.map((f) => ({
        ...f,
        rating: f.rating ?? getRandomInt(1, 5),
      }));
    },
    enabled: !!productId,
  });
};
