import { useFeedbacks } from "../hooks/useFeedbacks";
import { Swiper, SwiperSlide } from "swiper/react";

const FeedbackSlider = () => {
  const { data: feedbacks, isLoading, isError } = useFeedbacks();

  if (isLoading) return null;
  if (isError || !feedbacks?.length) return null;

  return (
    <div className="mt-12 px-4">
      <h2 className="text-2xl font-bold mb-4">Customer Feedback</h2>

      <Swiper spaceBetween={16} slidesPerView={"auto"}>
        {feedbacks.map((fb) => (
          <SwiperSlide key={fb.id} className="w-[300px]">
            <div className="bg-white border p-4 rounded-lg shadow">
              <p className="text-sm text-gray-700 mb-2">{fb.comment}</p>
              <div className="text-sm font-semibold text-black">
                – {fb.name}
              </div>
              <div className="text-yellow-500 mt-1">
                {"★".repeat(fb.rating)}
                {"☆".repeat(5 - fb.rating)}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeedbackSlider;
