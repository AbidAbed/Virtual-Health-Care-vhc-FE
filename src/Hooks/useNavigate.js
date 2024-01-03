import { useSelector } from "react-redux";
import Home from "../Pages/Home";
import About from "../Pages/About";
import Login from "../Pages/Login";
import SignupDoctor from "../Pages/SignupDoctor";
import SignupPatient from "../Pages/SignupPatient";
import Profile from "../Pages/Profile";
import useConfigDoctorProfilePage from "./useConfigDoctorProfilePage";
import useConfigPatientProfilePage from "./useConfigPatientProfilePage";
import Doctors from "../Pages/Doctors";
import Doctor from "../Pages/Doctor";
import DoctorMyReviews from "../Pages/DoctorMyReviews";
import AvailableTimes from "../Pages/AvailableTimes";

function useNavigate() {
  const { path, role, isLoggedIn } = useSelector((state) => state.config);

  const condition = isLoggedIn && role !== "";

  switch (path) {
    case "/home":
      return <Home />;
    case "/about":
      return <About />;
    case "/login":
      return <Login />;
    case "/doctor/signup":
      return <SignupDoctor />;
    case "/patient/signup":
      return <SignupPatient />;
    case "/profile":
      if (condition)
        return (
          <Profile
            config={
              role === "doctor"
                ? useConfigDoctorProfilePage
                : useConfigPatientProfilePage
            }
          />
        );
      else return <Login />;
    case "/doctor":
      return <Doctor />;
    case "/doctors":
      return <Doctors />;
    case "/myreviews":
      return <DoctorMyReviews />;
    case "/availabletimes":
      return <AvailableTimes />;
  }
}
export default useNavigate;
