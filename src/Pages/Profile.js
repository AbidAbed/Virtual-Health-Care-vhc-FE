import { useEffect, useState } from "react";
import Form from "../Components/Form";
import { FaRegSave } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { usePutProfilePatientMutation } from "../Store/APIS/PatientAPI";
import { usePutProfileDoctorMutation } from "../Store/APIS/DoctorAPI";
import { fetchUser } from "../Store/StoreInterface";
function Profile({ config }) {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.config);
  const [putProfilePatient, putProfilePatientResponse] =
    usePutProfilePatientMutation();
  const [putProfileDoctor, putProfileDoctorResponse] =
    usePutProfileDoctorMutation();

  const [reset, setReset] = useState(false);

  const [responseError, setResponseError] = useState();

  const user = useSelector((state) => state.user);
  function onSubmit(dataEdited) {
    const { errors, resError, ...rest } = dataEdited;
    const validation = Object.entries(rest).reduce(
      (prev, curr) => {
        if (curr[1] === "") {
          prev.valNum = prev.valNum + 1;
        } else {
          prev.feilds = { ...prev.feilds, [curr[0]]: curr[1] };
        }
        return prev;
      },
      { valNum: 0, feilds: {} }
    );
    if (validation.valNum === 0)
      setResponseError("You must edit at least one field inorder to save ");
    else {
      if (role === "doctor")
        putProfileDoctor({ id: user._id, ...validation.feilds });
      else if (role === "patient")
        putProfilePatient({ id: user._id, ...validation.feilds });
    }
  }

  useEffect(() => {
    if (
      !putProfileDoctorResponse.isLoading &&
      !putProfileDoctorResponse.isUninitialized
    ) {
      if (putProfileDoctorResponse.isError) {
        setResponseError("Error occured while updting data");
      } else {
        dispatch(fetchUser(putProfileDoctorResponse.data));
        setReset(true);
      }
    }
  }, [putProfileDoctorResponse]);

  useEffect(() => {
    if (
      !putProfilePatientResponse.isLoading &&
      !putProfilePatientResponse.isUninitialized
    ) {
      if (putProfilePatientResponse.isError) {
        setResponseError("Error occured while updting data");
      } else {
        dispatch(fetchUser(putProfilePatientResponse.data));
        setReset(true);
      }
    }
  }, [putProfilePatientResponse]);

  useEffect(() => {
    if (reset) setReset(false);
  }, [reset]);

  return (
    <div className="login-container flex justify-center items-center h-screen bg-gray-100 w-screen">
      <Form
        config={config(user)}
        responseError={responseError}
        submitButtonText="Save"
        onSubmit={onSubmit}
        submitButtonClassname={
          "flex items-center justify-center bg-green-500 text-white px-4 py-3 rounded "
        }
        submitButtonIcon={<FaRegSave className="mr-2" />}
        setResponseError={setResponseError}
        parentValidate={true}
        reset={reset}
      />
    </div>
  );
}
export default Profile;
