import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { feedbackSchema, FeedbackFormData } from "../schemas/feedbackSchema";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";

const FeedbackForm = ({ productId }: { productId: number }) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      name: "",
      comment: "",
      rating: 0,
      productId,
    },
  });

  const onSubmit = async (data: FeedbackFormData) => {
    try {
      await api.post("/feedbacks", data);
      alert("Feedback submitted");
      reset();
      navigate(-1);
    } catch {
      alert("Submission failed");
    }
  };

  const rating = watch("rating");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 border p-4 rounded"
    >
      <div>
        <label className="block mb-1">Your Name</label>
        <input
          {...register("name")}
          className="w-full border px-3 py-2 rounded"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1">Comment</label>
        <textarea
          {...register("comment")}
          className="w-full border px-3 py-2 rounded"
        />
        {errors.comment && (
          <p className="text-red-500 text-sm">{errors.comment.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1">Rating</label>
        <div className="flex space-x-1 text-2xl text-yellow-500 cursor-pointer">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setValue("rating", star)}
              className={star <= rating ? "text-yellow-500" : "text-gray-300"}
            >
              ★
            </span>
          ))}
        </div>
        {errors.rating && (
          <p className="text-red-500 text-sm">{errors.rating.message}</p>
        )}
      </div>

      <div className="flex gap-4 mt-4">
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default FeedbackForm;
