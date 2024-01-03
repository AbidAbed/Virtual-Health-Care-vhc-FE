import { useEffect, useState } from "react";
import Form from "../Components/Form";
import useConfigDoctorSignup from "../Hooks/useConfigDoctorSignup";
import { useDispatch } from "react-redux";
import { RiLoginBoxFill } from "react-icons/ri";
import {
  changePath,
  usePostSignupDoctorMutation,
} from "../Store/StoreInterface";

function SignupDoctor() {
  const [responseError, setResponseError] = useState();

  const [postSignup, postSignupResponse] = usePostSignupDoctorMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!postSignupResponse.isLoading && !postSignupResponse.isUninitialized) {
      if (postSignupResponse.isError) {
        setResponseError("Error occured, Check your info !!");
      } else {
        dispatch(changePath("/login"));
      }
    }
  }, [postSignupResponse]);

  function onSubmit(signupData) {
    postSignup({
      name: signupData.name,
      email: signupData.email,
      bio: signupData.bio,
      password: signupData.password,
      proficiency: signupData.proficiency,
    });
  }

  return (
    <div className="signup-container flex justify-center items-center h-screen bg-gray-100 w-screen">
      <Form
        config={useConfigDoctorSignup()}
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

export default SignupDoctor;
