import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addDoctors,
  addReviews,
  useGetDoctorReviewsQuery,
} from "../Store/StoreInterface";
import { FaStarHalfAlt, FaRegStar, FaStar } from "react-icons/fa";
import Button from "../Components/Button";

function DoctorMyReviews() {
  const user = useSelector((state) => state.user);
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  const [doctors] = useSelector((state) => state.doctors);

  console.log(doctors);
  const {
    data: reviewsData,
    error: reviewsError,
    isLoading: reviewsLoading,
    refetch,
  } = useGetDoctorReviewsQuery({ page: page, id: user._id });

  useEffect(() => {
    console.log(reviewsData);
    if (reviewsData) {
      dispatch(addDoctors([{ ...user, reviews: reviewsData }]));
    }
  }, [reviewsData, dispatch]);

  function renderRatingStars(rating) {
    const starStyle = "text-yellow-500 text-xl";
    switch (rating) {
      case 0:
        return <FaRegStar className={starStyle} />;
      case 1:
        return <FaRegStar className={starStyle} />;
      case 2:
      case 3:
        return <FaStarHalfAlt className={starStyle} />;
      case 5:
        return <FaStar className={starStyle} />;
      default:
        return null;
    }
  }

  const handleNextPage = () => {
    setPage(page + 1);
  };

  return (
    <div className="w-screen h-screen bg-gray-100 p-6 flex flex-col items-center justify-center pt-64">
      <div className="w-full max-w-screen-md bg-white rounded-md shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">My Reviews</h2>
        <div className="max-h-full overflow-y-auto overflow-x-hidden mb-4">
          {doctors && doctors.reviews.length > 0 ? (
            doctors.reviews.map((review) => (
              <div
                key={review._id}
                className="mb-4 border p-4 rounded-md w-full"
              >
                <div className="flex justify-between mb-2">
                  <p className="text-orange-600 font-bold">
                    {`Anonymous${review.patient_id.substring(0, 8)}`}
                  </p>
                  <p className="text-orange-600 font-bold">
                    {`
                    ${
                      new Date(review.time).toLocaleTimeString().split(":")[0]
                    }:${
                      new Date(review.time).toLocaleTimeString().split(":")[1]
                    }
                    ${
                      new Date(review.time)
                        .toLocaleTimeString()
                        .split(":")[2]
                        .split(" ")[1]
                    } - ${new Date(review.time).toDateString()}`}
                  </p>
                  {renderRatingStars(review.rate)}
                </div>
                <div className="flex flex-start">
                  <p className="text-gray-700 break-all">{`${
                    review.comment || "No comment"
                  }`}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No reviews available</p>
          )}
        </div>
        <Button
          onChange={handleNextPage}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          text={"Next Reviews"}
        />
      </div>
    </div>
  );
}

export default DoctorMyReviews;
