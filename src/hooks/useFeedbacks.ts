import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { Feedback } from "../types/feedback";

const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const useFeedbacks = () => {
  return useQuery<Feedback[]>({
    queryKey: ["feedbacks"],
    queryFn: async () => {
      const response = await api.get<Feedback[]>("/feedbacks");

      return response.data.map((f) => ({
        ...f,
        rating: f.rating ?? getRandomInt(1, 5),
        productId:
          typeof f.productId === "number" &&
          f.productId >= 1 &&
          f.productId <= 20
            ? f.productId
            : getRandomInt(1, 20),
      })) as Feedback[];
    },
  });
};
