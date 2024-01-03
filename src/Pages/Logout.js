import Popup from "../Components/Popup";
import { MdCancel } from "react-icons/md";
import { RiLogoutBoxFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  changeIsLoggedIn,
  changeLogOutState,
  changePath,
  changeRole,
  fetchUser,
  usePostLogoutMutation,
} from "../Store/StoreInterface";
import { useEffect } from "react";

function Logout() {
  const dispatch = useDispatch();
  const { logoutState } = useSelector((state) => state.config);

  const [postLogout, postLogoutResponse] = usePostLogoutMutation();

  useEffect(() => {
    if (!postLogoutResponse.isLoading && !postLogoutResponse.isUninitialized) {
      dispatch(changeIsLoggedIn(false));
      dispatch(changePath("/login"));
      window.location.reload();
    }
  }, [postLogoutResponse]);
  function onRequestClose() {}

  function onSave() {
    postLogout();
  }

  function onCancel() {
    dispatch(changeLogOutState(!logoutState));
    dispatch(changeRole(""));
    dispatch(fetchUser({}));
  }
  return (
    <Popup
      isOpen={true}
      onRequestClose={onRequestClose}
      onSave={onSave}
      onCancel={onCancel}
      text={"Are you sure ?"}
      cancelIcon={<MdCancel />}
      saveIcon={<RiLogoutBoxFill />}
      saveText="Logout"
      cancelText="Cancel"
    />
  );
}
export default Logout;
