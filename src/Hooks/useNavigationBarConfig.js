import { useSelector } from "react-redux";

function useNavigationBarConfig() {
  const { isLoggedIn } = useSelector((state) => state.config);
  const { role } = useSelector((state) => state.config);

  const alwaysConfigBarOptions = [
    {
      label: "Home",
      path: "/home",
    },
    {
      label: "About",
      path: "/about",
    },
  ];

  const navigationOptions = [
    {
      label: "Profile",
      path: "/profile",
    },
    {
      label: role === "doctor" ? "Available Times" : "Doctors",
      path: role === "doctor" ? "/availabletimes" : "/doctors",
    },
    ...(role === "doctor"
      ? [
          {
            label: "My Reviews",
            path: "/myreviews",
          },
        ]
      : []),
    {
      label: "Appointments",
      path: "/appointments",
    },
    ...alwaysConfigBarOptions,
    {
      label: "Logout",
      path: "/logout",
    },
  ];

  if (!isLoggedIn) {
    return [
      ...alwaysConfigBarOptions,
      {
        label: "Login",
        path: "/login",
      },
      {
        label: "Signup Doctor",
        path: "/doctor/signup",
      },
      {
        label: "Signup Patient",
        path: "/patient/signup",
      },
    ];
  }

  return navigationOptions;
}

export default useNavigationBarConfig;
