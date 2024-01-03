import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  usePostAvailableTimesMutation,
  useGetAvailableTimesQuery,
} from "../Store/StoreInterface";
import { addAvailableTimes } from "../Store/StoreInterface";
import { useDispatch, useSelector } from "react-redux";

function AvailableTimes() {
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [validationError, setValidationError] = useState(null);
  const [selectedIndexToModify, setSelectedIndexToModify] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const availableSlots = useSelector((state) => state.availableTimes);

  const [postAvailableTimes, postAvailableTimesResponse] =
    usePostAvailableTimesMutation();

  const {
    data: availableTimesData,
    isLoading: isFetching,
    isError: fetchError,
    refetch: refetchAvailableSlots,
    isUninitialized: isUninitialized,
  } = useGetAvailableTimesQuery({
    page: currentPage,
    id: user._id, // Replace with actual user ID
  });

  useEffect(() => {
    if (!isFetching && !isUninitialized) {
      if (fetchError) {
        setValidationError("Error fetching times");
      } else {
        dispatch(addAvailableTimes([...availableTimesData]));
        if (availableTimesData.length !== 0) setCurrentPage(currentPage + 1);
      }
    }
  }, [availableTimesData]);
  useEffect(() => {
    // Fetch available slots based on the current page
    refetchAvailableSlots({ page: currentPage, id: user._id });
  }, [currentPage]);

  useEffect(() => {
    if (
      !postAvailableTimesResponse.isLoading &&
      !postAvailableTimesResponse.isUninitialized
    ) {
      if (postAvailableTimesResponse.isError) {
        setValidationError("error adding time");
      } else {
        const newSlot = {
          startTime: startTime.getTime(),
          endTime: endTime.getTime(),
        };
        clearForm();
        dispatch(addAvailableTimes([newSlot]));
      }
    }
  }, [postAvailableTimesResponse]);

  const handleAddSlot = () => {
    if (validateTimeRange() && selectedDate) {
      const startTimestamp = new Date(selectedDate);
      startTimestamp.setHours(startTime.getHours(), startTime.getMinutes());

      const endTimestamp = new Date(selectedDate);
      endTimestamp.setHours(endTime.getHours(), endTime.getMinutes());

      postAvailableTimes({
        id: user._id,
        startTime: startTimestamp.getTime(),
        endTime: endTimestamp.getTime(),
      });
    }
  };

  const validateTimeRange = () => {
    const currentDateTime = new Date();

    const startTimestamp = new Date(selectedDate);
    startTimestamp.setHours(startTime.getHours(), startTime.getMinutes());

    const endTimestamp = new Date(selectedDate);
    endTimestamp.setHours(endTime.getHours(), endTime.getMinutes());

    if (startTimestamp < currentDateTime || endTimestamp < currentDateTime) {
      setValidationError("Invalid date or time. Please check and try again.");
      return false;
    }

    if (startTimestamp >= endTimestamp) {
      setValidationError("Start time must be before end time.");
      return false;
    }

    for (const slot of availableSlots) {
      if (
        (startTimestamp >= slot.startTime && startTimestamp <= slot.endTime) ||
        (endTimestamp >= slot.startTime && endTimestamp <= slot.endTime) ||
        (startTimestamp <= slot.startTime && endTimestamp >= slot.endTime)
      ) {
        if (
          selectedIndexToModify !== null &&
          selectedIndexToModify === slot._id
        ) {
          continue; // Skip validation for the modified slot itself
        }

        setValidationError(
          "Time range conflicts with an existing slot. Please choose a different time range."
        );
        return false;
      }
    }

    setValidationError(null);
    return true;
  };

  const clearForm = () => {
    setSelectedIndexToModify(null);
    setSelectedDate(null);
    setStartTime(new Date());
    setEndTime(new Date());
    setValidationError(null);
  };

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);

  const formatDate = (timestamp) => {
    const dateTime = new Date(timestamp);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return dateTime.toLocaleDateString("en-US", options);
  };

  const formatTime = (timestamp) => {
    const dateTime = new Date(timestamp);
    const options = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };
    return dateTime.toLocaleTimeString("en-US", options);
  };

  return (
    <div className="w-screen h-screen bg-gray-100 p-6 flex flex-col items-center justify-center pt-24">
      <div className="w-screen  bg-white rounded-md shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-4">Available Times</h1>
        <div className="mb-4">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="MMMM d, yyyy"
            placeholderText="Select Date"
            minDate={minDate}
            className="p-2 border rounded focus:outline-none w-18"
          />
        </div>
        <div className="flex space-x-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Time:
            </label>
            <div className="flex items-center">
              <input
                type="number"
                placeholder="HH"
                value={startTime.getHours()}
                onChange={(e) =>
                  setStartTime(
                    new Date(
                      startTime.setHours(parseInt(e.target.value, 10) || 0)
                    )
                  )
                }
                className="p-2 border rounded focus:outline-none w-18"
                min="0"
                max="23"
              />
              <span className="mx-2 text-gray-500">:</span>
              <input
                type="number"
                placeholder="MM"
                value={startTime.getMinutes()}
                onChange={(e) =>
                  setStartTime(
                    new Date(
                      startTime.setMinutes(parseInt(e.target.value, 10) || 0)
                    )
                  )
                }
                className="p-2 border rounded focus:outline-none w-18"
                min="0"
                max="59"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Time:
            </label>
            <div className="flex items-center">
              <input
                type="number"
                placeholder="HH"
                value={endTime.getHours()}
                onChange={(e) =>
                  setEndTime(
                    new Date(
                      endTime.setHours(parseInt(e.target.value, 10) || 0)
                    )
                  )
                }
                className="p-2 border rounded focus:outline-none w-18"
                min="0"
                max="23"
              />
              <span className="mx-2 text-gray-500">:</span>
              <input
                type="number"
                placeholder="MM"
                value={endTime.getMinutes()}
                onChange={(e) =>
                  setEndTime(
                    new Date(
                      endTime.setMinutes(parseInt(e.target.value, 10) || 0)
                    )
                  )
                }
                className="p-2 border rounded focus:outline-none w-18"
                min="0"
                max="59"
              />
            </div>
          </div>
        </div>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={handleAddSlot}
        >
          Add Slot
        </button>
        {validationError && (
          <div className="text-red-500 mt-4">{validationError}</div>
        )}
        <div className="grid grid-cols-4 gap-4 mt-4">
          {availableSlots &&
            availableSlots.map((slot) => (
              <div
                key={slot._id}
                className={`border rounded p-4 group ${
                  selectedIndexToModify === slot._id ? "bg-yellow-100" : ""
                } relative ${
                  selectedIndexToModify !== null
                    ? "pointer-events-none"
                    : "hover:shadow-md transition duration-300"
                }`}
              >
                <div className="mb-2">
                  <span className="text-lg">
                    {formatDate(slot.startTime)}
                    <br />
                    {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                  </span>
                </div>
                <div className="mb-2">
                  <span className="text-lg font-semibold">Start:</span>
                  <span className="text-lg">{formatTime(slot.startTime)}</span>
                </div>
                <div className="mb-2">
                  <span className="text-lg font-semibold">End:</span>
                  <span className="text-lg">{formatTime(slot.endTime)}</span>
                </div>
              </div>
            ))}
        </div>
        <div className="mt-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
          >
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
}

export default AvailableTimes;
