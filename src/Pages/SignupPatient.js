import { useEffect, useState } from "react";
import Form from "../Components/Form";
import useConfigPatientSignup from "../Hooks/useConfigPatientSignup";

import { RiLoginBoxFill } from "react-icons/ri";
import {
  changePath,
  usePostSignupPatientMutation,
} from "../Store/StoreInterface";
import { useDispatch } from "react-redux";

function SignupPatient() {
  const [responseError, setResponseError] = useState();

  const dispatch = useDispatch();
  function onSubmit(signupData) {
    postSignup({
      name: signupData.name,
      password: signupData.password,
      email: signupData.email,
    });
  }

  const [postSignup, postSignupResponse] = usePostSignupPatientMutation();

  useEffect(() => {
    if (!postSignupResponse.isLoading && !postSignupResponse.isUninitialized) {
      if (postSignupResponse.isError) {
        setResponseError("Error occured, Check your info !!");
      } else {
        dispatch(changePath("/login"));
      }
    }
  }, [postSignupResponse]);

  return (
    <div className="signup-container flex justify-center items-center h-screen bg-gray-100 w-screen">
      <Form
        config={useConfigPatientSignup()}
        responseError={responseError}
        submitButtonText="Signup"
        onSubmit={onSubmit}
        submitButtonClassname={
          "flex items-center justify-center bg-green-500 text-white px-4 py-3 rounded "
        }
        submitButtonIcon={<RiLoginBoxFill className="mr-2" />}
        setResponseError={setResponseError}
      />
    </div>
  );
}

export default SignupPatient;
