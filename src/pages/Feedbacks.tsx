import { useFeedbacks } from "../hooks/useFeedbacks";

const Feedbacks = () => {
  const { data: feedbacks, isLoading, isError } = useFeedbacks();

  const stars = (rating: number = 0) => {
    return [0, 1, 2, 3, 4].map((i) => (
      <span key={i}>{i < rating ? "★" : "☆"}</span>
    ));
  };

  if (isLoading) return <div className="p-8 text-lg">Loading feedbacks...</div>;
  if (isError || !feedbacks)
    return <div className="p-8 text-red-600">Failed to load feedbacks.</div>;

  return (
    <div className="py-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Customer Feedbacks</h1>
      <div className="space-y-6">
        {feedbacks.map((f) => (
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
    </div>
  );
};

export default Feedbacks;
