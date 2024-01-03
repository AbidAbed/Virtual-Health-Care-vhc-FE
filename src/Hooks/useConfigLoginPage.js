import useEmailValidator from "./Validators/useEmailValidator";
import usePasswordValidator from "./Validators/usePasswordValidator";
function useConfigLoginPage() {
  return [
    {
      label: "Email",
      stateName: "email",
      placeHolder: "email@email.com",
      validator: useEmailValidator,
      type: "email",
    },
    {
      label: "Password",
      stateName: "password",
      placeHolder: "**********",
      validator: usePasswordValidator,
      type: "password",
    },
  ];
}

export default useConfigLoginPage;
