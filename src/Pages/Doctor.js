import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addReviews,
  useGetDoctorReviewsQuery,
  usePostReviewMutation,
} from "../Store/StoreInterface";
import { FaStarHalfAlt, FaRegStar, FaStar } from "react-icons/fa";
import Button from "../Components/Button";
import Rating from "react-rating-stars-component";

function Doctor() {
  const dispatch = useDispatch();
  const { selectedDoctorId } = useSelector((state) => state.config);
  const user = useSelector((state) => state.user);

  const [page, setPage] = useState(1);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [commentError, setCommentError] = useState("");
  const [ratingError, setRatingError] = useState("");

  const doctor = useSelector((state) =>
    state.doctors.find((doc) => doc._id === selectedDoctorId)
  );

  const reviews = doctor.reviews;

  const [postReview, postReviewResponse] = usePostReviewMutation();

  const {
    data: reviewsData,
    error: reviewsError,
    isLoading: reviewsLoading,
    refetch,
  } = useGetDoctorReviewsQuery({ page: page, id: selectedDoctorId });

  useEffect(() => {
    if (!postReviewResponse.isLoading && !postReviewResponse.isUninitialized) {
      if (postReviewResponse.isError) {
        // Handle error, if needed
      } else {
        console.log(postReviewResponse.data);
        dispatch(
          addReviews({
            doctorId: selectedDoctorId,
            reviews: [...postReviewResponse.data],
          })
        );
      }
    }
  }, [postReviewResponse]);

  const handleNextReviewPage = () => {
    setPage(page + 1);
  };

  const formatDateTime = (timeObject) => {
    const startDateTime = new Date(timeObject.startTime);
    const endDateTime = new Date(timeObject.endTime);

    return {
      startDate: startDateTime.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      startTime: startDateTime.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
      endTime: endDateTime.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
    };
  };

  const handleBookAppointment = (time) => {
    // Implement booking logic if needed
  };

  const handleLeaveComment = () => {
    if (commentError !== "") setCommentError("Comment should not be empty");
    else
      postReview({
        id: user._id,
        rate: rating,
        doctor_id: selectedDoctorId,
        comment: comment,
        time: Date.now(),
      });
    setComment("");
    setRating(0);
  };

  useEffect(() => {
    if (reviewsData) {
      dispatch(
        addReviews({
          doctorId: selectedDoctorId,
          reviews: [...reviewsData],
        })
      );
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

  return (
    <div className="w-screen h-screen bg-gray-100 p-6 flex flex-col items-center justify-center pt-64">
      <div className="w-full max-w-screen-lg bg-white rounded-md shadow-lg p-6">
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h1 className="text-4xl font-bold mb-4">
              {doctor.name} {renderRatingStars(doctor.rate)}
            </h1>
            <p className="text-gray-600 text-lg mb-4">{doctor.bio}</p>
            <p className="text-gray-600 text-md">
              <span className="font-bold">Proficiency:</span>{" "}
              {doctor.proficiency}
            </p>
            <p className="text-gray-600 text-md mt-2">
              <span className="font-bold">Email:</span> {doctor.email}
            </p>
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-bold mb-4">Book an Appointment</h2>
            {doctor.availableTimes.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 text-sm overflow-y-auto max-h-64">
                {doctor.availableTimes.map((time) => (
                  <div
                    key={`${time.startTime}-${time.endTime}`}
                    className="mb-4 border p-4 rounded-md"
                  >
                    <span className="block mb-2">
                      {formatDateTime(time).startDate}
                      <br />
                      {formatDateTime(time).startTime} - {formatDateTime(time).endTime}
                    </span>
                    <Button
                      onChange={() => handleBookAppointment(time)}
                      className="bg-orange-500 text-white px-3 py-1 rounded-md hover:bg-orange-600"
                      text={"Book Now"}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No available times</p>
            )}
          </div>
        </div>
        <div className="mt-8 w-full">
          <h2 className="text-2xl font-bold mb-4">Reviews</h2>
          <div className="max-h-64 overflow-y-auto overflow-x-hidden mb-4">
            {reviews && reviews.length > 0 ? (
              reviews.map((review) => (
                <div
                  key={review._id}
                  className="mb-4 border p-4 rounded-md w-full"
                >
                  <div className="flex justify-between mb-2">
                    <p className="text-orange-600 font-bold">
                      {`Anonymous${review.patient_id.substring(0, 8)}`}
                    </p>
                    <p className="text-orange-600 font-bold">
                      {new Date(review.time).toLocaleString({
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
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

          <div className="mb-4">
            <textarea
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
                setCommentError("");
              }}
              placeholder="Leave a comment..."
              className="w-full p-2 border rounded-md text-base comment"
              style={{ resize: "none" }}
            />
            {commentError && (
              <p className="text-red-500 text-sm">{commentError}</p>
            )}
          </div>

          <Rating
            count={5}
            value={rating}
            onChange={(newRating) => setRating(newRating)}
            size={30}
            activeColor="#ffd700"
          />
          {ratingError && <p className="text-red-500 text-sm">{ratingError}</p>}

          <div className="flex gap-4">
            <Button
              onChange={handleLeaveComment}
              className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
              text={"Leave a Comment"}
            />

            <Button
              onChange={handleNextReviewPage}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              text={"Next Review"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Doctor;
