import { useFeedbacks } from "../hooks/useFeedbacks";

const FeedbackList = ({ productId }: { productId?: number }) => {
  const { data: feedbacks, isLoading, isError } = useFeedbacks();

  const stars = (rating: number = 0) =>
    [0, 1, 2, 3, 4].map((i) => <span key={i}>{i < rating ? "★" : "☆"}</span>);

  if (isLoading) return <p className="p-4">Loading feedbacks...</p>;
  if (isError || !feedbacks)
    return <p className="p-4 text-red-600">Failed to load feedbacks.</p>;

  const filtered = productId
    ? feedbacks.filter((f) => f.productId === productId)
    : feedbacks;

  return (
    <div className="space-y-6">
      {filtered.map((f) => (
        <div key={f.id} className="border p-4 rounded shadow-sm">
          <div className="flex justify-between items-center">
            <div className="font-semibold text-lg">{f.name}</div>
            <div className="text-yellow-500 text-lg flex items-center">
              {stars(f.rating)}
            </div>
          </div>
          <p className="text-gray-700 mt-2">{f.comment}</p>
          <p className="text-sm text-gray-400 mt-1">
            Product ID: {f.productId} <br />
            {new Date(f.createdAt).toLocaleDateString("en-GB")}
          </p>
        </div>
      ))}
    </div>
  );
};

export default FeedbackList;
