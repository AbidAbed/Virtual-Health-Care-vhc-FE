import { useDispatch, useSelector } from "react-redux";
import useNavigationBarConfig from "../Hooks/useNavigationBarConfig";
import Button from "./Button";
import { useState, useEffect } from "react";
import { changeLogOutState, changePath } from "../Store/StoreInterface";

function NavigationBar() {
  const { path, logoutState, role } = useSelector((state) => state.config);
  const dispatch = useDispatch();
  const [renderedNavigationBar, setRenderedNavigationBar] = useState();

  const config = useNavigationBarConfig();

  const clickedStyle = "border-b-2 border-gray-500 bg-transparent p-2 m-2";
  const notClickedStyle = "bg-transparent";

  useEffect(() => {
    setRenderedNavigationBar(
      config.map((navEl) => (
        <Button
          key={navEl.path}
          text={navEl.label}
          onChange={() => {
            if (navEl.path === "/logout")
              dispatch(changeLogOutState(!logoutState));
            else dispatch(changePath(navEl.path));
          }}
          className={`${
            path === navEl.path ? clickedStyle : notClickedStyle
          } hover:bg-gray-100 cursor-pointer transition-all duration-300`}
        />
      ))
    );
  }, [path, role]);

  return (
    <div className="sticky top-0 bg-white border-b-2 border-gray-400 space-x-5 z-50">
      {renderedNavigationBar}
    </div>
  );
}

export default NavigationBar;
