import useEmailValidator from "./Validators/useEmailValidator";
import usePasswordValidator from "./Validators/usePasswordValidator";
import useFullNameValidator from "./Validators/useFullNameValidator";
function useConfigPatientSignup() {
  return [
    {
      label: "Full name",
      stateName: "name",
      placeHolder: "Full name",
      validator: useFullNameValidator,
      type: "text",
    },
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
export default useConfigPatientSignup;
