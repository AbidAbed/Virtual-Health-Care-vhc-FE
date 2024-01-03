import { useEffect, useState } from "react";
import Form from "../Components/Form";
import useConfigLoginPage from "../Hooks/useConfigLoginPage";
import { RiLoginBoxFill } from "react-icons/ri";
import {
  changeIsLoggedIn,
  changePath,
  usePostLoginMutation,
} from "../Store/StoreInterface";
import { useDispatch } from "react-redux";

function Login() {
  const [responseError, setResponseError] = useState();

  const [postLogin, postLoginResponse] = usePostLoginMutation();

  const dispatch = useDispatch();

  function onSubmit(loginData) {
    postLogin({ email: loginData.email, password: loginData.password });
  }

  useEffect(() => {
    if (!postLoginResponse.isLoading && !postLoginResponse.isUninitialized) {
      if (postLoginResponse.isError) {
        setResponseError("Invalid email or password");
      } else {
        dispatch(changeIsLoggedIn(true));
        dispatch(changePath("/profile"));
      }
    }
  }, [postLoginResponse]);

  return (
    <div className="login-container flex justify-center items-center h-screen bg-gray-100 w-screen">
      <Form
        config={useConfigLoginPage()}
        responseError={responseError}
        submitButtonText="Login"
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

export default Login;
