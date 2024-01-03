import { useDispatch, useSelector } from "react-redux";
import NavigationBar from "./Components/NavigationBar";
import useNavigate from "./Hooks/useNavigate";
import { useEffect } from "react";
import {
  changeIsLoggedIn,
  changePath,
  changeRole,
  fetchUser,
  usePostAuthMutation,
} from "./Store/StoreInterface";
import Logout from "./Pages/Logout";
function App() {
  const { path, isLoggedIn, role,logoutState } = useSelector((state) => state.config);
  const [postAuth, postAuthResponse] = usePostAuthMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    window.history.pushState({}, "", path);
    const handlePopState = () => {
      dispatch(changePath(window.location.pathname));
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [path]);

  useEffect(() => {
    postAuth();
  }, [path]);

  useEffect(() => {
    if (!postAuthResponse.isLoading && !postAuthResponse.isUninitialized) {
      if (postAuthResponse.isError) {
        dispatch(changeIsLoggedIn(false));
      } else {
        if (!isLoggedIn) dispatch(changePath("/profile"));
        dispatch(changeIsLoggedIn(true));
        dispatch(changeRole(postAuthResponse.data.role));
        dispatch(fetchUser(postAuthResponse.data.user));
      }
    }
  }, [postAuthResponse]);

  return (
    <div>
      <NavigationBar />
      {useNavigate()}
      {isLoggedIn && role !== "" && logoutState ? <Logout /> : ""}
    </div>
  );
}

export default App;
