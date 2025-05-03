import { useParams } from "react-router-dom";
import FeedbackForm from "../components/FeedbackForm";

const SubmitFeedbackPage = () => {
  const { productId } = useParams();

  if (!productId) return <div>Invalid product</div>;

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Write a Review</h1>
      <FeedbackForm productId={Number(productId)} />
    </div>
  );
};

export default SubmitFeedbackPage;
